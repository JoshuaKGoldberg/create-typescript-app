import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockTypeScript } from "./blockTypeScript.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../data/packageData.ts", async (importOriginal) => {
	const { getPackageDependencies } =
		await importOriginal<typeof import("../data/packageData.ts")>();
	return {
		getPackageDependencies: (...names: string[]) =>
			Object.fromEntries(
				Object.keys(getPackageDependencies(...names)).map((name) => [
					name,
					"0.0.0-mock",
				]),
			),
	};
});

describe(blockTypeScript, () => {
	test("without addons or options", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Type Checking": {
			            "contents": "
			You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

			However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

			\`\`\`shell
			pnpm tsc
			\`\`\`

			Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

			\`\`\`shell
			pnpm tsc --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.ts";

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
				",
			          "index.ts": "export * from "./greet.ts";
			export * from "./types.ts";
			",
			          "types.ts": "export interface GreetOptions {
					logger?: (message: string) => void;
					message: string;
					times?: number;
				}
				",
			        },
			        "usage": [
			          "\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`",
			        ],
			      },
			      "block": "[Block Example Files]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Type Check",
			            "steps": [
			              {
			                "run": "pnpm tsc",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": "[Block Knip]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			    {
			      "addons": {
			        "debuggers": [],
			        "settings": {
			          "js/ts.tsdk.path": "node_modules/typescript/lib",
			        },
			        "tasks": [
			          {
			            "detail": "Build the project",
			            "label": "build",
			            "script": "build",
			            "type": "npm",
			          },
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockTypeScript, {
			addons: {
				compilerOptions: {
					strictBindCallApply: false,
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Type Checking": {
			            "contents": "
			You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

			However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

			\`\`\`shell
			pnpm tsc
			\`\`\`

			Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

			\`\`\`shell
			pnpm tsc --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.ts";

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
				",
			          "index.ts": "export * from "./greet.ts";
			export * from "./types.ts";
			",
			          "types.ts": "export interface GreetOptions {
					logger?: (message: string) => void;
					message: string;
					times?: number;
				}
				",
			        },
			        "usage": [
			          "\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`",
			        ],
			      },
			      "block": "[Block Example Files]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Type Check",
			            "steps": [
			              {
			                "run": "pnpm tsc",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": "[Block Knip]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			    {
			      "addons": {
			        "debuggers": [],
			        "settings": {
			          "js/ts.tsdk.path": "node_modules/typescript/lib",
			        },
			        "tasks": [
			          {
			            "detail": "Build the project",
			            "label": "build",
			            "script": "build",
			            "type": "npm",
			          },
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"skipLibCheck": true,
					"strict": true,
					"strictBindCallApply": false,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			",
			  },
			}
		`);
	});

	test("with an outDir addon", () => {
		const creation = testBlock(blockTypeScript, {
			addons: {
				outDir: "lib",
			},
			options: optionsBase,
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"outDir": "lib",
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"rootDir": "src",
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			"
		`);
	});

	test("with include, exclude, and plugins addons", () => {
		const creation = testBlock(blockTypeScript, {
			addons: {
				compilerOptions: {
					plugins: [{ name: "next" }],
				},
				exclude: ["node_modules"],
				include: ["next-env.d.ts"],
			},
			options: optionsBase,
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"plugins": [{ "name": "next" }],
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src", "next-env.d.ts"],
				"exclude": ["node_modules"]
			}
			"
		`);
	});

	test("with existingCompilerOptions overridden by compilerOptions", () => {
		const creation = testBlock(blockTypeScript, {
			addons: {
				compilerOptions: {
					moduleResolution: "bundler",
				},
				existingCompilerOptions: {
					jsx: "preserve",
					moduleResolution: "node",
				},
			},
			options: optionsBase,
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"jsx": "preserve",
					"module": "nodenext",
					"moduleResolution": "bundler",
					"noEmit": true,
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			"
		`);
	});

	test("with a beforeTypeCheckSteps addon", () => {
		const creation = testBlock(blockTypeScript, {
			addons: {
				beforeTypeCheckSteps: [{ run: "pnpm generate" }],
			},
			options: optionsBase,
		});

		expect(creation.addons?.find(({ block }) => block === blockGitHubActionsCI))
			.toMatchInlineSnapshot(`
			{
			  "addons": {
			    "jobs": [
			      {
			        "name": "Type Check",
			        "steps": [
			          {
			            "run": "pnpm generate",
			          },
			          {
			            "run": "pnpm tsc",
			          },
			        ],
			      },
			    ],
			  },
			  "block": "[Block GitHub Actions CI]",
			}
		`);
	});

	test("with an outDir addon and noEmit in compilerOptions", () => {
		const creation = testBlock(blockTypeScript, {
			addons: {
				compilerOptions: {
					noEmit: true,
					outDir: "lib",
				},
				outDir: "lib",
			},
			options: optionsBase,
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"outDir": "lib",
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"rootDir": "src",
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			"
		`);
	});

	test("with options.bin", () => {
		const creation = testBlock(blockTypeScript, {
			options: {
				...optionsBase,
				bin: "bin/index.mjs",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Type Checking": {
			            "contents": "
			You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

			However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

			\`\`\`shell
			pnpm tsc
			\`\`\`

			Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

			\`\`\`shell
			pnpm tsc --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.ts";

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
				",
			          "index.ts": "export * from "./greet.ts";
			export * from "./types.ts";
			",
			          "types.ts": "export interface GreetOptions {
					logger?: (message: string) => void;
					message: string;
					times?: number;
				}
				",
			        },
			        "usage": [
			          "\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`",
			        ],
			      },
			      "block": "[Block Example Files]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Type Check",
			            "steps": [
			              {
			                "run": "pnpm tsc",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": "[Block Knip]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			    {
			      "addons": {
			        "debuggers": [
			          {
			            "name": "Debug Program",
			            "preLaunchTask": "build",
			            "program": "bin/index.mjs",
			            "request": "launch",
			            "skipFiles": [
			              "<node_internals>/**",
			            ],
			            "type": "node",
			          },
			        ],
			        "settings": {
			          "js/ts.tsdk.path": "node_modules/typescript/lib",
			        },
			        "tasks": [
			          {
			            "detail": "Build the project",
			            "label": "build",
			            "script": "build",
			            "type": "npm",
			          },
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			",
			  },
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockTypeScript, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Type Checking": {
			            "contents": "
			You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

			However, it can be useful to run the TypeScript command-line (\`tsc\`) to type check all files in \`src/\`:

			\`\`\`shell
			pnpm tsc
			\`\`\`

			Add \`--watch\` to keep the type checker running in a watch mode that updates the display as you save files:

			\`\`\`shell
			pnpm tsc --watch
			\`\`\`
			",
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.ts";

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
				",
			          "index.ts": "export * from "./greet.ts";
			export * from "./types.ts";
			",
			          "types.ts": "export interface GreetOptions {
					logger?: (message: string) => void;
					message: string;
					times?: number;
				}
				",
			        },
			        "usage": [
			          "\`\`\`shell
			npm i test-repository
			\`\`\`
			\`\`\`ts
			import { greet } from "test-repository";

			greet("Hello, world! 💖");
			\`\`\`",
			        ],
			      },
			      "block": "[Block Example Files]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Type Check",
			            "steps": [
			              {
			                "run": "pnpm tsc",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": "[Block Knip]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			    {
			      "addons": {
			        "debuggers": [],
			        "settings": {
			          "js/ts.tsdk.path": "node_modules/typescript/lib",
			        },
			        "tasks": [
			          {
			            "detail": "Build the project",
			            "label": "build",
			            "script": "build",
			            "type": "npm",
			          },
			        ],
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "tsc",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"resolveJsonModule": true,
					"rewriteRelativeImportExtensions": true,
					"skipLibCheck": true,
					"strict": true,
					"target": "ES2023"
				},
				"include": ["src"]
			}
			",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when tsconfig.json does not exist", () => {
			const actual = testIntake(blockTypeScript, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when tsconfig.json does not contain truthy data", () => {
			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify(null)],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when tsconfig.json does not contain compilerOptions", () => {
			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ other: true })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns existingCompilerOptions when tsconfig.json contains compilerOptions", () => {
			const compilerOptions = { module: "ESNext" };

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ compilerOptions })],
				},
			});

			expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
		});

		it("returns existingCompilerOptions when tsconfig.json contains compilerOptions and other data", () => {
			const compilerOptions = { module: "ESNext" };

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [
						JSON.stringify({
							compilerOptions,
							other: true,
						}),
					],
				},
			});

			expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
		});

		it("returns existingCompilerOptions including plugins without names when tsconfig.json contains them", () => {
			const compilerOptions = {
				plugins: [{ transform: "typescript-transform-paths" }],
				strict: true,
			};

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ compilerOptions })],
				},
			});

			expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
		});

		it("returns existingCompilerOptions including paths when tsconfig.json contains compilerOptions with paths", () => {
			const compilerOptions = {
				paths: { "@/*": ["./src/*"] },
				strict: true,
			};

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ compilerOptions })],
				},
			});

			expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
		});

		it("returns existingCompilerOptions including plugins when tsconfig.json contains compilerOptions with plugins", () => {
			const compilerOptions = {
				module: "ESNext",
				plugins: [{ name: "next" }],
			};

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ compilerOptions })],
				},
			});

			expect(actual).toEqual({ existingCompilerOptions: compilerOptions });
		});
	});
});
