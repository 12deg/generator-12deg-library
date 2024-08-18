# @12deg/billing-fastify

A [Fastify](https://github.com/fastify/fastify) plugin that provides an easy integration of billing.

## Installation

Install with npm:

```bash
npm install @12deg/billing-fastify
```

Install with pnpm:

```bash
pnpm add --filter "@scope/project" @12deg/billing-fastify
```

## Usage
Register the plugin with your fastify instance in `src/index.ts`:

```typescript
import billingPlugin from "@12deg/billing-fastify";
import Fastify from "fastify";

const start = async () => {
  const fastify = await Fastify();

  // Register billing-fastify plugin
  await fastify.register(billingPlugin);

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
