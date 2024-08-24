import Generator from "yeoman-generator";

import FastifyPluginGenerator from "../fastify-plugin/index.js";

export default class LibraryGenerator extends Generator {
  async prompting() {
    this.props = await this.prompt([
      {
        message: "Package scope",
        name: "scope",
        type: "input",
      },
      {
        message: "Package name",
        name: "name",
        type: "input",
      },
      {
        default: "0.1.0",
        message: "Initial version",
        name: "version",
        type: "input",
      },
      {
        default: true,
        message: "Include fastify plugin?",
        name: "fastifyPlugin",
        type: "confirm",
      }
    ]);
  };

  async writing() {
    await this.fs.copyTplAsync(
      this.templatePath(),
      this.destinationPath(this.props.name),
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

    if (this.props.fastifyPlugin) {
      await this.composeWith(
        { 
          Generator: FastifyPluginGenerator, 
          path: "../fastify-plugin/index.js"
        },
        {
          baseName: this.props.name,
          description: `A fastify plugin for the ${this.props.name} library`,
          destinationPath: "packages/fastify",
          installationType: "library",
          scope: this.props.scope,
          version: this.props.version,
        }
      );
    }
  }
};
