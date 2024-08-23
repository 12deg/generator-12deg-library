import path from "node:path";
import Generator from "yeoman-generator";

export default class FastifyPluginGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.props = {};
  }

  async prompting() {
    const prompts = [
      {
        default: this.options.scope,
        message: "Fastify plugin scope",
        name: "scope",
        type: "input",
      },
      {
        default: this.options.baseName? `${this.options.baseName}-fastify`: "fastify",
        message: "Fastify plugin name",
        name: "name",
        type: "input",
      },
      {
        default: this.options.version || "0.1.0",
        message: "Fastify plugin version",
        name: "version",
        type: "input",
      },
    ];

    if (!this.options.monorepo) {
      prompts.push({
        message: "Choose the type of installation:",
        name: "installationType",
        type: "list",
        choices: [
          {
            name: "Generate this fastify plugin in library monorepo",
            value: "library"
          },
          {
            name: "Generate this fastify plugin in app monorepo",
            value: "app"
          },
          {
            name: "Standalone",
            value: "standalone"
          },
        ],
      });
    }

    this.props = await this.prompt(prompts);

    if (!this.options.baseName && this.props.installationType != "standalone") {
      const { baseName } = await this.prompt({
        default: this.props.scope,
        message: `Enter the ${this.props.installationType} project name`,
        name: "baseName",
        type: "input",
      });

      this.props["baseName"] = baseName; 
    } else {
      this.props["baseName"] = this.options.baseName;
    }

    if (!this.options.destinationPath && this.props.installationType != "standalone") {
      const defaultPath = this.props.installationType === "library"
        ? "packages/fastify"
        : this.props.installationType === "app"
        ? "libs"
        : ".";

      const { destinationPath } = await this.prompt({
        default: defaultPath,
        message: "Destination path",
        name: "destinationPath",
        type: "input",
      });

      this.props["destinationPath"] = destinationPath;
    } else {
      this.props["destinationPath"] = this.options.destinationPath || ".";
    }

    const { description } = await this.prompt({
      default: capitalize(`${this.options.name || this.props.name || "A"} plugin for fastify.`),
      message: "Enter fastify plugin description",
      name: "description",
      type: "input"
    }) 

    this.props["description"] = description;

    this.props["displayName"] = 
      [this.props.scope, this.props.name]
      .join("-")
      .split("-")
      .map(token => token.charAt(0).toUpperCase() + token.slice(1))
      .join("");

    if (this.options.monorepo) {
      this.props["installationType"] = "library";
    }
  };

  async writing() {
    await this.fs.copyTplAsync(
      this.templatePath(),
      this.destinationPath(path.join(this.options.baseName || "", this.props.destinationPath )),
      {
        ...this.props,
        ...this.options,
      },
      {},
      {
        globOptions: { 
          dot: true,
        }
      },
    );
  }
};

const capitalize = (word) => {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
};
