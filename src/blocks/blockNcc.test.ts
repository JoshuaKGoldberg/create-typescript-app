import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockGitignore } from "./blockGitignore.ts";
import { blockNcc } from "./blockNcc.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockNcc, () => {
	test("without addons", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          "dist",
			          "lib",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`
					",
			                "heading": "Building for Release",
			              },
			            ],
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			          "lib",
			        ],
			      },
			      "block": "[Block ESLint]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Build",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			            ],
			          },
			          {
			            "name": "Build (Release)",
			            "steps": [
			              {
			                "run": "pnpm build:release",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/lib",
			        ],
			      },
			      "block": "[Block Gitignore]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "^0.38.3",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "build": "tsc --project tsconfig.build.json",
			            "build:release": "ncc build src/index.ts -o dist",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/dist",
			          "/lib",
			        ],
			      },
			      "block": "[Block Prettier]",
			    },
			    {
			      "addons": {
			        "builders": [
			          {
			            "order": 0,
			            "run": "pnpm build",
			          },
			        ],
			      },
			      "block": "[Block release-it]",
			    },
			    {
			      "addons": {
			        "outDir": "lib",
			      },
			      "block": "[Block TypeScript]",
			    },
			    {
			      "addons": {
			        "exclude": [
			          "lib",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			  ],
			  "files": {
			    "tsconfig.build.json": "{ "exclude": ["src/**/*.test.ts"], "extends": "./tsconfig.json" }
			",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockNcc, {
			addons: {
				entry: "src/action/index.ts",
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          "dist",
			          "lib",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`
					",
			                "heading": "Building for Release",
			              },
			            ],
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			          "lib",
			        ],
			      },
			      "block": "[Block ESLint]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Build",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			            ],
			          },
			          {
			            "name": "Build (Release)",
			            "steps": [
			              {
			                "run": "pnpm build:release",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/lib",
			        ],
			      },
			      "block": "[Block Gitignore]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "^0.38.3",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "build": "tsc --project tsconfig.build.json",
			            "build:release": "ncc build src/action/index.ts -o dist",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/dist",
			          "/lib",
			        ],
			      },
			      "block": "[Block Prettier]",
			    },
			    {
			      "addons": {
			        "builders": [
			          {
			            "order": 0,
			            "run": "pnpm build",
			          },
			        ],
			      },
			      "block": "[Block release-it]",
			    },
			    {
			      "addons": {
			        "outDir": "lib",
			      },
			      "block": "[Block TypeScript]",
			    },
			    {
			      "addons": {
			        "exclude": [
			          "lib",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			  ],
			  "files": {
			    "tsconfig.build.json": "{ "exclude": ["src/**/*.test.ts"], "extends": "./tsconfig.json" }
			",
			  },
			}
		`);
	});

	test("with a build addon", () => {
		const creation = testBlock(blockNcc, {
			addons: {
				build: "tsc --project tsconfig.custom.json",
			},
			options: optionsBase,
		});

		expect(creation.files).toBeUndefined();
		expect(creation.addons?.find(({ block }) => block === blockPackageJson))
			.toMatchInlineSnapshot(`
			{
			  "addons": {
			    "properties": {
			      "devDependencies": {
			        "@vercel/ncc": "^0.38.3",
			      },
			      "files": [
			        "lib/",
			      ],
			      "scripts": {
			        "build": "tsc --project tsconfig.custom.json",
			        "build:release": "ncc build src/index.ts -o dist",
			      },
			    },
			  },
			  "block": "[Block Package JSON]",
			}
		`);
	});

	test("setup mode", () => {
		const creation = testBlock(blockNcc, {
			mode: "setup",
			options: optionsBase,
		});

		expect(creation.addons?.filter(({ block }) => block === blockPackageJson))
			.toMatchInlineSnapshot(`
				[
				  {
				    "addons": {
				      "properties": {
				        "devDependencies": {
				          "@vercel/ncc": "^0.38.3",
				        },
				        "exports": {
				          ".": "./lib/index.js",
				        },
				        "files": [
				          "lib/",
				        ],
				        "scripts": {
				          "build": "tsc --project tsconfig.build.json",
				          "build:release": "ncc build src/index.ts -o dist",
				        },
				      },
				    },
				    "block": "[Block Package JSON]",
				  },
				]
			`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockNcc, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation.addons?.filter(({ block }) => block === blockGitignore))
			.toMatchInlineSnapshot(`
			[
			  {
			    "addons": {
			      "ignores": [
			        "/lib",
			      ],
			      "removals": [
			        "/dist",
			        "dist",
			        "dist/",
			      ],
			    },
			    "block": "[Block Gitignore]",
			  },
			]
		`);
	});

	describe("intake", () => {
		it("returns an undefined entry when options.packageData does not exist", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: undefined,
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns an undefined entry when options.packageData does not contain scripts", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {},
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns an undefined entry when options.packageData does not contain a build:release script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {},
					},
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns an undefined entry when options.packageData contains an unrelated build:release script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							"build:release": "tsdown",
						},
					},
				},
			});

			expect(actual).toEqual({ entry: undefined });
		});

		it("returns a parsed entry when options.packageData contains a matching build:release script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							"build:release": "ncc build src/action/index.ts -o dist",
						},
					},
				},
			});

			expect(actual).toEqual({ entry: "src/action/index.ts" });
		});

		it("returns a build when options.packageData contains a tsc build script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							build: "tsc --project tsconfig.build.json",
						},
					},
				},
			});

			expect(actual).toEqual({ build: "tsc --project tsconfig.build.json" });
		});

		it("returns an undefined build when options.packageData contains a non-tsc build script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							build: "tsdown",
						},
					},
				},
			});

			expect(actual).toEqual({ build: undefined });
		});
	});
});
