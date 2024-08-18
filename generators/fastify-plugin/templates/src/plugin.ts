import FastifyPlugin from "fastify-plugin";

import type { FastifyInstance } from "fastify";

const plugin = FastifyPlugin(
  async (
    fastify: FastifyInstance,
    options: Record<never, never>,
    done: () => void
  ) => {
    done();
  }
);

export default plugin;
