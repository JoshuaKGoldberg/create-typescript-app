import { describe, expect, it, vi } from "vitest";
import { greet } from "./greet.js";

const message = "Yay, testing!";

describe("greet", () => {
  it("logs once when times is not provided", () => {
    const logger = vi.fn();

    greet({ logger, message });

    expect(logger).toHaveBeenCalledWith(message);
    expect(logger).toHaveBeenCalledTimes(1);
  });

  it("logs a specified number of times when times is provided", () => {
    const logger = vi.fn();
    const times = 7;

    greet({ logger, message, times });

    expect(logger).toHaveBeenCalledWith(message);
    expect(logger).toHaveBeenCalledTimes(7);
  });
});
