import chalk from "chalk";
import Generator from "yeoman-generator";

export default class PackageMonorepoGenerator extends Generator {
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
    ]);
  };

  writing() {
    this.fs.copyTplAsync(
      this.templatePath(),
      this.destinationPath(packages/fastify),
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
