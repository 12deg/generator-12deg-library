import Fastify from "fastify";
import { describe, it, expect } from "vitest";

import <%= baseName %>Plugin from "../src/index";

describe("<%= baseName %> plugin", () => {
  it("should be exported as default and register without issues", async () => {
    const fastify = Fastify();

    await expect(fastify.register(<%= baseName %>Plugin)).resolves.not.toThrow();
  });
});
