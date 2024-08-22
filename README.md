# Yeoman 12deg-library generator

This yeoman generator helps set up a library. The library is designed as a monorepo that is expected to contain several independent but related packages. 

The generator includes a child generator that helps generate a Fastify plugin as one such package in the library.

## Generators
- **app**: sets up a new library as a monorepo
- **fastify-plugin**:  sets up a fastify plugin within the monorepo

## Requirements
- [yo](https://github.com/yeoman/yo)

To install `yo` globally, run:

```bash
npm install -g yo
```

## Usage

### Generate the monorepo
Run the following command and follow the prompts to generate your monorepo setup:

```bash
yo 12deg-library
```

This command will create a directory with the name you provide as `Package name`.

### Generate a fastify plugin only (experimental)
To generate only the fastify plugin, use:

```bash
yo 12deg-library:fastify-plugin <path>
```
**Note**: `<path>` is the relative path where the fastify plugin will be generated (e.g. `packages/fastify-plugin`). If not provided, the generator will prompt you to input the path. If no path is provided, the fastify plugin will be generated in the current directory.

This will create the fastify plugin setup without the rest of the monorepo structure.
