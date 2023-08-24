import { Options } from "../../../shared/types.js";
import { formatTypeScript } from "./formatters/formatTypeScript.js";

export async function createSrc(options: Options) {
	return {
		...(!options.excludeTests && {
			"greet.test.ts": await formatTypeScript(
				`
					import { describe, expect, it, vi } from "vitest";

					import { greet } from "./greet.js";

					const message = "Yay, testing!";

					describe("greet", () => {
						it("logs to the console once when message is provided as a string", () => {
							const logger = vi.spyOn(console, "log").mockImplementation(() => undefined);

							greet(message);

							expect(logger).toHaveBeenCalledWith(message);
							expect(logger).toHaveBeenCalledTimes(1);
						});

						it("logs to the console once when message is provided as an object", () => {
							const logger = vi.spyOn(console, "log").mockImplementation(() => undefined);

							greet({ message });

							expect(logger).toHaveBeenCalledWith(message);
							expect(logger).toHaveBeenCalledTimes(1);
						});

						it("logs once when times is not provided in an object", () => {
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
				`,
			),
		}),
		"greet.ts": await formatTypeScript(
			`import { GreetOptions } from "./types.js";

				export function greet(options: GreetOptions | string) {
					const {
						logger = console.log.bind(console),
						message,
						times = 1,
					} = typeof options === "string" ? { message: options } : options;
				
					for (let i = 0; i < times; i += 1) {
						logger(message);
					}
				}
			`,
		),
		"index.ts": await formatTypeScript(
			`
				export * from "./greet.js";
				export * from "./types.js";
			`,
		),
		"types.ts": await formatTypeScript(
			`
				export interface GreetOptions {
					logger?: (message: string) => void;
					message: string;
					times?: number;
				}
			`,
		),
	};
}
