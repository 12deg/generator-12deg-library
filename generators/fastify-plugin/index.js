import Generator from "yeoman-generator";

export default class FastifyPluginGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.props = {};
  }

  async prompting() {
    const prompts= [
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
    
    if (!this.options.destinationPath && !this.args[0]) {
      prompts.push({
        default: this.args[0] || ".",
        message: "Destination path",
        name: "destinationPath",
        type: "input",
      });
    }
    
    if (!this.options.monorepo) {
      prompts.push({
        default: false,
        message: "Is this fastify plugin part of a monorepo?",
        name: "monorepo",
        type: "confirm",
      });
    }

    this.props = await this.prompt(prompts);
    
    if (!this.options.baseName) {
      this.props["baseName"] = false;
    }
    
    if (!this.props["destinationPath"]) {
      this.props["destinationPath"] = this.options.destinationPath || this.args[0] || ".";
    }

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
