import Generator from "yeoman-generator";

export default class FastifyPluginGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.props = {};
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
    ].concat(
      this.options.destinationPath? [] : [
        {
          default: ".",
          message: "Fastify plugin destination path",
          name: "destinationPath",
          type: "input",
        },
      ]
    ).concat(
      this.options.monorepo? [] : [
        {
          default: false,
          message: "is this fastify plugin part of a monorepo",
          name: "monorepo",
          type: "confirm",
        },
      ]
    ));

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
