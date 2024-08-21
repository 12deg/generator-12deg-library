import Fastify from "fastify";
import { describe, it, expect } from "vitest";

import <%= scope %>Plugin from "../src/index";

describe("<%= scope %> plugin", () => {
  it("should be exported as default and register without issues", async () => {
    const fastify = Fastify();

    await expect(fastify.register(<%= scope %>Plugin)).resolves.not.toThrow();
  });
});
