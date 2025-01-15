import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockTypeScript } from "./blockTypeScript.js";
import { optionsBase } from "./options.fakes.js";

describe("blockTypeScript", () => {
	test("without options.bin", () => {
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
			            "typescript": "5.7.2",
			          },
			          "files": [
			            "lib/",
			          ],
			          "main": "lib/index.js",
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
			    "tsconfig.json": "{"compilerOptions":{"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"resolveJsonModule":true,"skipLibCheck":true,"sourceMap":true,"strict":true,"target":"ES2022"},"include":["src"]}",
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
			            "typescript": "5.7.2",
			          },
			          "files": [
			            "lib/",
			          ],
			          "main": "lib/index.js",
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
			    "tsconfig.json": "{"compilerOptions":{"declaration":true,"declarationMap":true,"esModuleInterop":true,"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"resolveJsonModule":true,"skipLibCheck":true,"sourceMap":true,"strict":true,"target":"ES2022"},"include":["src"]}",
			  },
			}
		`);
	});
});
