import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockNcc } from "./blockNcc.ts";
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

			CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces.
			If that happens, run \`pnpm build:release\` and commit all changes under \`dist/\`.
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
			              {
			                "run": "if git check-ignore --no-index --quiet dist; then
			  echo "::error::dist/ is gitignored, so new files in it can't be detected or committed. Remove dist from .gitignore."
			  exit 1
			fi
			changes=$(git status --porcelain --untracked-files=all -- dist)
			if [ -n "$changes" ]; then
			  echo "$changes"
			  echo "::error::dist/ is out of date. Run 'pnpm build:release', then commit all changes under dist/."
			  exit 1
			fi
			",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "^0.38.3",
			          },
			          "scripts": {
			            "build": "tsc",
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
			        ],
			      },
			      "block": "[Block Prettier]",
			    },
			  ],
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

			CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces.
			If that happens, run \`pnpm build:release\` and commit all changes under \`dist/\`.
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
			              {
			                "run": "if git check-ignore --no-index --quiet dist; then
			  echo "::error::dist/ is gitignored, so new files in it can't be detected or committed. Remove dist from .gitignore."
			  exit 1
			fi
			changes=$(git status --porcelain --untracked-files=all -- dist)
			if [ -n "$changes" ]; then
			  echo "$changes"
			  echo "::error::dist/ is out of date. Run 'pnpm build:release', then commit all changes under dist/."
			  exit 1
			fi
			",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "^0.38.3",
			          },
			          "scripts": {
			            "build": "tsc",
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
			        ],
			      },
			      "block": "[Block Prettier]",
			    },
			  ],
			}
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
	});
});
