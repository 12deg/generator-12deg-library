import FastifyPlugin from "fastify-plugin";

import type { FastifyInstance } from "fastify";

const plugin = FastifyPlugin(
  async (
    fastify: FastifyInstance,
    options: Record<never, never>,
  ) => {
    fastify.log.info("Registering <%= name %> plugin");
  }
);

export default plugin;
