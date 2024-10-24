import FastifyPlugin from "fastify-plugin";

import type { FastifyInstance } from "fastify";

const plugin = FastifyPlugin(
  async (
    fastify: FastifyInstance,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: Record<never, never>,
  ) => {
    fastify.log.info("Registering <%= name %> plugin");
  },
);

export default plugin;
