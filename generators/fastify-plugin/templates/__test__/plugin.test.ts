import Fastify from "fastify";
import { describe, it, expect } from "vitest";

import plugin from "../src/index";

describe("plugin", () => {
  it("should be exported as default and register without issues", async () => {
    const fastify = Fastify();

    await expect(fastify.register(plugin)).resolves.not.toThrow();
  });
});
