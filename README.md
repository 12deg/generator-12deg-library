# Yeoman 12deg-library generator

This yeoman generator helps set up a library. The library is designed as a monorepo that is expected to contain several independent but related packages. 

The generator includes a child generator that helps generate a Fastify plugin as one such package in the library.

## Generators
  - **app**: sets up a new library as a monorepo
  - **fastify-plugin**:  sets up a fastify plugin within the monorepo

## Requirements
  - [yo](https://github.com/yeoman/yo)
  - [shipjs](https://github.com/algolia/shipjs) (optional, for deployment purposes)

To install `shipjs` and `yo` globally, run:

```bash
npm install -g shipjs yo
```

## Installation
1. Clone this repo locally and navigate to the project directory and install dependencies:

```bash
make install
```

2. Link this generator locally so that the `yo` command can recognize it:

```bash
npm link
```

## Usage

### Generate the monorepo
Run the following command and follow the prompts to generate your monorepo setup:

```bash
yo library
```

This command will create a directory with the name you provide as `Package name`. Navigate to this directory:

```bash
cd <Package name>
```

This command install the required dependencies and create a `pnpm-lock.yaml` file:

```bash
make install
```

### Initialize git repository

Initialize a Git repository in your new project directory:

```bash
git init
```

### Generate a fastify plugin only (experimental)
To generate only the fastify plugin, use:

```bash
yo library:fastify-plugin
```

This will create the fastify plugin setup without the rest of the monorepo structure.
