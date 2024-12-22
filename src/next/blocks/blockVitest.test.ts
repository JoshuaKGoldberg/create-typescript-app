import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockVitest } from "./blockVitest.js";
import { optionsBase } from "./options.fakes.js";

describe("blockVitest", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockVitest, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "coverage",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          {
			            "extends": [
			              "vitest.configs.recommended",
			            ],
			            "files": [
			              "**/*.test.*",
			            ],
			            "rules": [
			              {
			                "entries": {
			                  "@typescript-eslint/no-unsafe-assignment": "off",
			                },
			              },
			            ],
			          },
			        ],
			        "ignores": [
			          "coverage",
			          "**/*.snap",
			        ],
			        "imports": [
			          {
			            "source": "@vitest/eslint-plugin",
			            "specifier": "vitest",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Testing": {
			            "contents": "
			[Vitest](https://vitest.dev) is used for tests.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run test
			\`\`\`

			Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

			\`\`\`shell
			pnpm run test --coverage
			\`\`\`

			Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
			Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.


					",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.test.ts": "import { describe, expect, it, vi } from "vitest";

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
			",
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/coverage",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Test",
			            "steps": [
			              {
			                "run": "pnpm run test --coverage",
			              },
			              {
			                "if": "always()",
			                "uses": "codecov/codecov-action@v3",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vitest/coverage-v8": "2.1.8",
			            "@vitest/eslint-plugin": "1.1.20",
			            "console-fail-test": "0.5.0",
			            "vitest": "2.1.8",
			          },
			          "scripts": {
			            "test": "vitest",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/coverage",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "entry": [
			          "!src/**/*.test.*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "debuggers": [
			          {
			            "args": [
			              "run",
			              "\${relativeFile}",
			            ],
			            "autoAttachChildProcesses": true,
			            "console": "integratedTerminal",
			            "name": "Debug Current Test File",
			            "program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
			            "request": "launch",
			            "skipFiles": [
			              "<node_internals>/**",
			              "**/node_modules/**",
			            ],
			            "smartStep": true,
			            "type": "node",
			          },
			        ],
			        "extensions": [
			          "vitest.explorer",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "vitest.config.ts": "import { defineConfig } from "vitest/config";

			export default defineConfig({
				test: {
					clearMocks: true,
					coverage: {
						all: true,
						exclude: [],
						include: [],
						reporter: ["html", "lcov"],
					},
					exclude: [, "node_modules"],
					setupFiles: ["console-fail-test/setup"],
				},
			});
				",
			  },
			}
		`);
	});

	test("migration mode", () => {
		const creation = testBlock(blockVitest, {
			mode: "migrate",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "coverage",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          {
			            "extends": [
			              "vitest.configs.recommended",
			            ],
			            "files": [
			              "**/*.test.*",
			            ],
			            "rules": [
			              {
			                "entries": {
			                  "@typescript-eslint/no-unsafe-assignment": "off",
			                },
			              },
			            ],
			          },
			        ],
			        "ignores": [
			          "coverage",
			          "**/*.snap",
			        ],
			        "imports": [
			          {
			            "source": "@vitest/eslint-plugin",
			            "specifier": "vitest",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Testing": {
			            "contents": "
			[Vitest](https://vitest.dev) is used for tests.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run test
			\`\`\`

			Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

			\`\`\`shell
			pnpm run test --coverage
			\`\`\`

			Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
			Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.


					",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.test.ts": "import { describe, expect, it, vi } from "vitest";

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
			",
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/coverage",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Test",
			            "steps": [
			              {
			                "run": "pnpm run test --coverage",
			              },
			              {
			                "if": "always()",
			                "uses": "codecov/codecov-action@v3",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vitest/coverage-v8": "2.1.8",
			            "@vitest/eslint-plugin": "1.1.20",
			            "console-fail-test": "0.5.0",
			            "vitest": "2.1.8",
			          },
			          "scripts": {
			            "test": "vitest",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/coverage",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "entry": [
			          "!src/**/*.test.*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "debuggers": [
			          {
			            "args": [
			              "run",
			              "\${relativeFile}",
			            ],
			            "autoAttachChildProcesses": true,
			            "console": "integratedTerminal",
			            "name": "Debug Current Test File",
			            "program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
			            "request": "launch",
			            "skipFiles": [
			              "<node_internals>/**",
			              "**/node_modules/**",
			            ],
			            "smartStep": true,
			            "type": "node",
			          },
			        ],
			        "extensions": [
			          "vitest.explorer",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "vitest.config.ts": "import { defineConfig } from "vitest/config";

			export default defineConfig({
				test: {
					clearMocks: true,
					coverage: {
						all: true,
						exclude: [],
						include: [],
						reporter: ["html", "lcov"],
					},
					exclude: [, "node_modules"],
					setupFiles: ["console-fail-test/setup"],
				},
			});
				",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "rm .github/codecov.yml .mocha* codecov.yml jest.config.*",
			      ],
			      "phase": 0,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockVitest, {
			addons: {
				coverage: {
					directory: "coverage*",
					flags: "unit",
				},
				exclude: ["lib/"],
				include: ["src/"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "coverage*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "extensions": [
			          {
			            "extends": [
			              "vitest.configs.recommended",
			            ],
			            "files": [
			              "**/*.test.*",
			            ],
			            "rules": [
			              {
			                "entries": {
			                  "@typescript-eslint/no-unsafe-assignment": "off",
			                },
			              },
			            ],
			          },
			        ],
			        "ignores": [
			          "coverage*",
			          "**/*.snap",
			        ],
			        "imports": [
			          {
			            "source": "@vitest/eslint-plugin",
			            "specifier": "vitest",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Testing": {
			            "contents": "
			[Vitest](https://vitest.dev) is used for tests.
			You can run it locally on the command-line:

			\`\`\`shell
			pnpm run test
			\`\`\`

			Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

			\`\`\`shell
			pnpm run test --coverage
			\`\`\`

			Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
			Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.


					",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.test.ts": "import { describe, expect, it, vi } from "vitest";

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
			",
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/coverage*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Test",
			            "steps": [
			              {
			                "run": "pnpm run test --coverage",
			              },
			              {
			                "if": "always()",
			                "uses": "codecov/codecov-action@v3",
			                "with": {
			                  "flags": "unit",
			                },
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vitest/coverage-v8": "2.1.8",
			            "@vitest/eslint-plugin": "1.1.20",
			            "console-fail-test": "0.5.0",
			            "vitest": "2.1.8",
			          },
			          "scripts": {
			            "test": "vitest",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/coverage*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "entry": [
			          "!src/**/*.test.*",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "debuggers": [
			          {
			            "args": [
			              "run",
			              "\${relativeFile}",
			            ],
			            "autoAttachChildProcesses": true,
			            "console": "integratedTerminal",
			            "name": "Debug Current Test File",
			            "program": "\${workspaceRoot}/node_modules/vitest/vitest.mjs",
			            "request": "launch",
			            "skipFiles": [
			              "<node_internals>/**",
			              "**/node_modules/**",
			            ],
			            "smartStep": true,
			            "type": "node",
			          },
			        ],
			        "extensions": [
			          "vitest.explorer",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "vitest.config.ts": "import { defineConfig } from "vitest/config";

			export default defineConfig({
				test: {
					clearMocks: true,
					coverage: {
						all: true,
						exclude: ["lib/"],
						include: ["src/"],
						reporter: ["html", "lcov"],
					},
					exclude: ["lib/", "node_modules"],
					setupFiles: ["console-fail-test/setup"],
				},
			});
				",
			  },
			}
		`);
	});
});
