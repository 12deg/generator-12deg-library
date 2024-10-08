# @<%= scope %>/<%= name %>

<%= description %>

## Installation

Install with npm:

```bash
npm install @<%= scope %>/<%= name %>
```

Install with pnpm:

```bash
pnpm add --filter "@scope/project" @<%= scope %>/<%= name %>
```

## Usage
Register the plugin with your fastify instance in `src/index.ts`:

```typescript
import plugin from "@<%= scope %>/<%= name %>";
import Fastify from "fastify";

const start = async () => {
  const fastify = await Fastify();

  // Register <%= name %> plugin
  await fastify.register(plugin);

  try {
    await fastify.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
```
