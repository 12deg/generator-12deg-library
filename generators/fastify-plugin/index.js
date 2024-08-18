import chalk from "chalk";
import Generator from "yeoman-generator";

export default class FastifyPluginGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("scope", {
      type: String,
      required: false,
      defaults: "",
      desc: "Package scope"
    });

    this.option("baseName", {
      type: String,
      defaults: false,
      desc: "Package base name"
    });

    this.option("version", {
      type: String,
      defaults: "0.1.0",
      desc: "Package initial version"
    });
  }

  async prompting() {
    this.props = await this.prompt([
      {
        default: this.options.scope,
        message: "Fastify plugin scope",
        name: "scope",
        type: "input",
      },
      {
        default: `${this.options.baseName}-fastify`,
        message: "Fastify plugin name",
        name: "name",
        type: "input",
      },
      {
        default: this.options.version,
        message: "Fastify plugin version",
        name: "version",
        type: "input",
      },
    ]);

    this.props["displayName"] = 
      [this.props.scope, this.props.name]
        .join("-")
        .split("-")
        .map(token => token.charAt(0).toUpperCase() + token.slice(1))
        .join("");
  };

  writing() {
    this.fs.copyTplAsync(
      this.templatePath(),
      this.destinationPath(`${this.options.baseName}/packages/fastify`),
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
