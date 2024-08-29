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
    ];

    if (!this.options.version) {
      prompts.push({
        default: "0.1.0",
        message: "Fastify plugin version",
        name: "version",
        type: "input",
      });
    } else {
      this.props.version = this.options.version;
    }

    if (!this.options.authorName) {
      prompts.push({
        message: "Author name",
        name: "authorName",
        type: "input",
      });
    } else {
      this.props.authorName = this.options.authorName;
    }
    
    if (!this.options.authorEmail) {
      prompts.push({
        message: "Author email",
        name: "authorEmail",
        type: "input",
      });
    } else {
      this.props.authorEmail = this.options.authorEmail;
    }

    if (!this.options.authorWebsite) {
      prompts.push({
        message: "Author website",
        name: "authorWebsite",
        type: "input",
      });
    } else {
      this.props.authorWebsite = this.options.authorWebsite;
    }

    if (!this.options.installationType) {
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

    if (!this.options.baseName && this.props.installationType == "library") {
      const { baseName } = await this.prompt({
        default: this.props.scope,
        message: "Project name (e.g., github repo name)",
        name: "baseName",
        type: "input",
      });

      this.props["baseName"] = baseName; 
    } else {
      this.props["baseName"] = this.options.baseName;
    }

    if (!this.options.destinationPath) {
      const defaultPath = this.props.installationType === "library"
        ? "./packages/fastify"
        : this.props.installationType === "app"
          ? "./libs/fastify"
          : `./${this.props.name}`;

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
      default: this.options.description 
        ? this.options.description
        : generateDescription(
            this.props.installationType,
            this.options.name || this.props.name,
            this.props.baseName
        ),
      message: "Enter fastify plugin description",
      name: "description",
      type: "input"
    });

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

const generateDescription = (installationType, name, baseName) => {
  let description,
      capitalizedName;

  switch (installationType) {
    case "library":
      capitalizedName = capitalize(baseName);
      description = `A Fastify plugin for the ${capitalizedName} library.`;
      break;

    case "app":
    case "standalone":
      capitalizedName = capitalize(name);
      description = `${capitalizedName} Fastify plugin.`;
      break;
  }

  return description;
}
