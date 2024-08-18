import Fastify from "fastify";
import { describe, it, expect } from "vitest";

import billingPlugin from "../src/index";

describe("Billing plugin", () => {
  it("should be exported as default and register without issues", async () => {
    const fastify = Fastify();

    await expect(fastify.register(billingPlugin)).resolves.not.toThrow();
  });
});
