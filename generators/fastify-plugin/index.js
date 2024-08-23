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
        message: "Choose the type of installation",
        name: "installationType",
        type: "list",
        choices: [
          {
            name: "Generate this fastify plugin in monorepo",
            value: "monorepo"
          },
          {
            name: "Generate this fastify plugin in apps",
            value: "apps"
          },
          {
            name: "Standalone",
            value: "standalone"
          },
        ],
      });
    }

    this.props = await this.prompt(prompts);

    if (!this.options.destinationPath) {
      const { destinationPath } = await this.prompt({
        default: ".",
        message: "Destination path",
        name: "destinationPath",
        type: "input",
      });

      this.props["destinationPath"] = destinationPath;
    }

    if (!this.options.baseName) {
      this.props["baseName"] = false;
    }

    if (this.props.monorepo) {
      const { baseName } = await this.prompt({
        default: "",
        message: "Enter the monorepo name",
        name: "baseName",
        type: "confirm",
      });

      this.props["baseName"] = baseName; 
    }

    if (!this.props["destinationPath"]) {
      this.props["destinationPath"] = this.options.destinationPath? path.join(baseName, this.options.destinationPath) : ".";
    }

    const { description } = await this.prompt({
      default: capitalizeFirstLetter(`${this.props.name ?? "A"} plugin for fastify`),
      message: "Enter description",
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

  };

  async writing() {
    await this.fs.copyTplAsync(
      this.templatePath(),
      this.destinationPath(this.options.destinationPath || this.props.destinationPath),
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

const capitalizeFirstLetter = (sentence) => {
  return sentence ? sentence.charAt(0).toUpperCase() + sentence.slice(1) : sentence;
};
