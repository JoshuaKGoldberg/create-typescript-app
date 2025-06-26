import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockTypeScript } from "./blockTypeScript.js";
import { optionsBase } from "./options.fakes.js";

describe("blockTypeScript", () => {
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.js";
				
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
			          "index.ts": "export * from "./greet.js";
			export * from "./types.js";
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/lib",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "lib/",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "5.8.3",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "tsc": "tsc",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "lib",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "debuggers": [],
			        "settings": {
			          "typescript.tsdk": "node_modules/typescript/lib",
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{"compilerOptions":{"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"resolveJsonModule":true,"skipLibCheck":true,"strict":true,"target":"ES2022"},"include":["src"]}",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.js";
				
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
			          "index.ts": "export * from "./greet.js";
			export * from "./types.js";
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/lib",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "lib/",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "5.8.3",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "tsc": "tsc",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "lib",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "debuggers": [],
			        "settings": {
			          "typescript.tsdk": "node_modules/typescript/lib",
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{"compilerOptions":{"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"resolveJsonModule":true,"skipLibCheck":true,"strict":true,"strictBindCallApply":false,"target":"ES2022"},"include":["src"]}",
			  },
			}
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.js";
				
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
			          "index.ts": "export * from "./greet.js";
			export * from "./types.js";
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/lib",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "lib/",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "5.8.3",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "tsc": "tsc",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "lib",
			        ],
			      },
			      "block": [Function],
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
			          "typescript.tsdk": "node_modules/typescript/lib",
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{"compilerOptions":{"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"resolveJsonModule":true,"skipLibCheck":true,"strict":true,"target":"ES2022"},"include":["src"]}",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": {
			          "greet.ts": "import { GreetOptions } from "./types.js";
				
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
			          "index.ts": "export * from "./greet.js";
			export * from "./types.js";
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/lib",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.ts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "lib/",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "typescript": "5.8.3",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "tsc": "tsc",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "coverage": {
			          "include": [
			            "src",
			          ],
			        },
			        "exclude": [
			          "lib",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "debuggers": [],
			        "settings": {
			          "typescript.tsdk": "node_modules/typescript/lib",
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "workflows": [
			          "tsc",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "tsconfig.json": "{"compilerOptions":{"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"resolveJsonModule":true,"skipLibCheck":true,"strict":true,"target":"ES2022"},"include":["src"]}",
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

		it("returns compilerOptions when tsconfig.json contains compilerOptions", () => {
			const compilerOptions = { module: "ESNext" };

			const actual = testIntake(blockTypeScript, {
				files: {
					"tsconfig.json": [JSON.stringify({ compilerOptions })],
				},
			});

			expect(actual).toEqual({ compilerOptions });
		});

		it("returns compilerOptions when tsconfig.json contains compilerOptions and other data", () => {
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

			expect(actual).toEqual({ compilerOptions });
		});
	});
});
