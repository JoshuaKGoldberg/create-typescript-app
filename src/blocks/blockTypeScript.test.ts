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
	test("without props or options", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Example Files]",
			      "props": {
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
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Knip]",
			      "props": {
			        "project": [
			          "src/**/*.ts!",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
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

	test("with props", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				compilerOptions: {
					strictBindCallApply: false,
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Example Files]",
			      "props": {
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
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Knip]",
			      "props": {
			        "project": [
			          "src/**/*.ts!",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
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

	test("with an include addon", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				include: ["scripts", "src"],
			},
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
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
				"include": ["scripts", "src"]
			}
			"
		`);
	});

	test("with an outDir addon", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				outDir: "lib",
			},
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

	test("with an exclude addon", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				exclude: ["node_modules", ".next", "node_modules"],
			},
		});

		expect(creation.files?.["tsconfig.json"]).toContain(
			'"exclude": [".next", "node_modules"]',
		);
	});

	test("with include, exclude, and plugins props", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				compilerOptions: {
					plugins: [{ name: "next" }],
				},
				exclude: ["node_modules"],
				include: ["next-env.d.ts"],
			},
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
				"include": ["next-env.d.ts", "src"],
				"exclude": ["node_modules"]
			}
			"
		`);
	});

	test("with existingCompilerOptions overridden by compilerOptions", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				compilerOptions: {
					moduleResolution: "bundler",
				},
				existingCompilerOptions: {
					jsx: "preserve",
					moduleResolution: "node",
				},
			},
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

	test("with existingCompilerOptions arrays merged with compilerOptions arrays", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				compilerOptions: {
					lib: ["dom", "esnext"],
					plugins: [{ name: "next" }],
				},
				existingCompilerOptions: {
					lib: ["esnext", "webworker"],
					plugins: [
						{ name: "next" },
						{ name: "typescript-plugin-css-modules" },
					],
				},
			},
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"lib": ["esnext", "webworker", "dom"],
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"plugins": [
						{ "name": "next" },
						{ "name": "typescript-plugin-css-modules" }
					],
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

	test("with existingCompilerOptions objects merged with compilerOptions objects", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				compilerOptions: {
					jsx: undefined,
					paths: { "b/*": ["./b/*"] },
				},
				existingCompilerOptions: {
					jsx: "preserve",
					paths: { "a/*": ["./a/*"] },
				},
			},
		});

		expect(creation.files?.["tsconfig.json"]).toMatchInlineSnapshot(`
			"{
				"compilerOptions": {
					"declaration": true,
					"esModuleInterop": true,
					"jsx": "preserve",
					"module": "nodenext",
					"moduleResolution": "nodenext",
					"noEmit": true,
					"paths": { "a/*": ["./a/*"], "b/*": ["./b/*"] },
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
			options: optionsBase,
			props: {
				beforeTypeCheckSteps: [{ run: "pnpm generate" }],
			},
		});

		expect(creation.extensions).toContainEqual(
			blockGitHubActionsCI({
				jobs: [
					{
						name: "Type Check",
						steps: [{ run: "pnpm generate" }, { run: "pnpm tsc" }],
					},
				],
			}),
		);
	});

	test("with an outDir addon and noEmit in compilerOptions", () => {
		const creation = testBlock(blockTypeScript, {
			options: optionsBase,
			props: {
				compilerOptions: {
					noEmit: true,
					outDir: "lib",
				},
				outDir: "lib",
			},
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
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Example Files]",
			      "props": {
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
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Knip]",
			      "props": {
			        "project": [
			          "src/**/*.ts!",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
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
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Example Files]",
			      "props": {
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
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Knip]",
			      "props": {
			        "project": [
			          "src/**/*.ts!",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "0.0.0-mock",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "dist",
			        ],
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
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
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "tsc",
			        ],
			      },
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

		it("removes source and declaration map options from existingCompilerOptions", () => {
			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [
						JSON.stringify({
							compilerOptions: {
								declarationMap: true,
								inlineSourceMap: true,
								inlineSources: true,
								module: "ESNext",
								sourceMap: true,
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				existingCompilerOptions: { module: "ESNext" },
			});
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

		it("returns exclude when tsconfig.json contains exclude", () => {
			const exclude = ["node_modules", "scripts"];

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ exclude })],
				},
			});

			expect(actual).toEqual({ exclude });
		});

		it("returns include when tsconfig.json contains include", () => {
			const include = ["scripts", "src"];

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ include })],
				},
			});

			expect(actual).toEqual({ include });
		});

		it("returns compilerOptions and include when tsconfig.json contains both", () => {
			const compilerOptions = { module: "ESNext" };
			const include = ["scripts", "src"];

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ compilerOptions, include })],
				},
			});

			expect(actual).toEqual({
				existingCompilerOptions: compilerOptions,
				include,
			});
		});
	});
});
