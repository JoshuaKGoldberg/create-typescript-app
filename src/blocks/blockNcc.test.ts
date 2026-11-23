import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockNcc } from "./blockNcc.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockNcc, () => {
	test("without props", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          "dist",
			          "lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that rebuilds changed files into \`lib/\` as you save them:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to clear and recreate an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`

			CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces, not counting \`.d.ts\` files.
			If that happens, run \`pnpm build:release\` and commit the changed files under \`dist/\`.
			Renovate PRs that update bundled dependencies need the same: rebuild and commit \`dist/\` on their branch before they can merge.
					",
			                "heading": "Building for Release",
			              },
			            ],
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block ESLint]",
			      "props": {
			        "ignores": [
			          "dist",
			          "lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
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
			                "run": "# Verify dist/ is up to date
			changes=$(git status --porcelain --untracked-files=all --ignored -- dist ':!*.d.ts')
			if [ -n "$changes" ]; then
			  echo "$changes"
			  echo "::error::dist/ is out of date. Run 'pnpm build:release', then commit the files listed above. Files marked !! are gitignored and need 'git add --force'."
			  exit 1
			fi
			",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Issue Templates]",
			      "props": {
			        "checklists": {
			          "bug": [
			            "I have checked the workflow run logs for errors.",
			            "I have tried the [latest release](https://github.com/test-owner/test-repository/releases/latest) of this action and the issue persists.",
			          ],
			          "feature": [
			            "I have looked at the [latest release](https://github.com/test-owner/test-repository/releases/latest) of this action.",
			          ],
			        },
			      },
			    },
			    {
			      "block": "[Block Gitignore]",
			      "props": {
			        "ignores": [
			          "/dist/**/*.d.ts",
			          "/lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "0.45.0",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "build": "tsc --project tsconfig.build.json",
			            "build:release": "rm -rf dist && ncc build src/index.ts -o dist",
			            "tsc": "tsc --noEmit",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Prettier]",
			      "props": {
			        "ignores": [
			          "/dist",
			          "/lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block release-it]",
			      "props": {
			        "builders": [
			          {
			            "order": 0,
			            "run": "pnpm build",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block TypeScript]",
			      "props": {
			        "outDir": "lib",
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "exclude": [
			          "lib",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "tsconfig.build.json": "{ "exclude": ["src/**/*.test.ts"], "extends": "./tsconfig.json" }
			",
			  },
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
			props: {
				entry: "src/action/index.ts",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          "dist",
			          "lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that rebuilds changed files into \`lib/\` as you save them:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to clear and recreate an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`

			CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces, not counting \`.d.ts\` files.
			If that happens, run \`pnpm build:release\` and commit the changed files under \`dist/\`.
			Renovate PRs that update bundled dependencies need the same: rebuild and commit \`dist/\` on their branch before they can merge.
					",
			                "heading": "Building for Release",
			              },
			            ],
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block ESLint]",
			      "props": {
			        "ignores": [
			          "dist",
			          "lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
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
			                "run": "# Verify dist/ is up to date
			changes=$(git status --porcelain --untracked-files=all --ignored -- dist ':!*.d.ts')
			if [ -n "$changes" ]; then
			  echo "$changes"
			  echo "::error::dist/ is out of date. Run 'pnpm build:release', then commit the files listed above. Files marked !! are gitignored and need 'git add --force'."
			  exit 1
			fi
			",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Issue Templates]",
			      "props": {
			        "checklists": {
			          "bug": [
			            "I have checked the workflow run logs for errors.",
			            "I have tried the [latest release](https://github.com/test-owner/test-repository/releases/latest) of this action and the issue persists.",
			          ],
			          "feature": [
			            "I have looked at the [latest release](https://github.com/test-owner/test-repository/releases/latest) of this action.",
			          ],
			        },
			      },
			    },
			    {
			      "block": "[Block Gitignore]",
			      "props": {
			        "ignores": [
			          "/dist/**/*.d.ts",
			          "/lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "@vercel/ncc": "0.45.0",
			          },
			          "files": [
			            "lib/",
			          ],
			          "scripts": {
			            "build": "tsc --project tsconfig.build.json",
			            "build:release": "rm -rf dist && ncc build src/action/index.ts -o dist",
			            "tsc": "tsc --noEmit",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Prettier]",
			      "props": {
			        "ignores": [
			          "/dist",
			          "/lib",
			        ],
			      },
			    },
			    {
			      "block": "[Block release-it]",
			      "props": {
			        "builders": [
			          {
			            "order": 0,
			            "run": "pnpm build",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block TypeScript]",
			      "props": {
			        "outDir": "lib",
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "exclude": [
			          "lib",
			        ],
			      },
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
			options: optionsBase,
			props: {
				build: "tsc --project tsconfig.custom.json",
			},
		});

		expect(creation.files).toBeUndefined();
		expect(creation.extensions?.find(({ block }) => block === blockPackageJson))
			.toMatchInlineSnapshot(`
				{
				  "block": "[Block Package JSON]",
				  "props": {
				    "properties": {
				      "devDependencies": {
				        "@vercel/ncc": "0.45.0",
				      },
				      "files": [
				        "lib/",
				      ],
				      "scripts": {
				        "build": "tsc --project tsconfig.custom.json",
				        "build:release": "rm -rf dist && ncc build src/index.ts -o dist",
				        "tsc": "tsc --noEmit",
				      },
				    },
				  },
				}
			`);
	});

	test("with a tsc addon", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
			props: {
				tsc: "tsc --noEmit --project tsconfig.custom.json",
			},
		});

		expect(
			creation.extensions?.find(({ block }) => block === blockPackageJson),
		).toMatchObject({
			props: {
				properties: {
					scripts: { tsc: "tsc --noEmit --project tsconfig.custom.json" },
				},
			},
		});
	});

	test("with a rebuildDistWorkflow prop", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
			props: {
				rebuildDistWorkflow: "rebuild-dist.yml",
			},
		});

		expect(
			creation.extensions?.find(({ block }) => block === blockDevelopmentDocs),
		).toMatchInlineSnapshot(`
			{
			  "block": "[Block Development Docs]",
			  "props": {
			    "sections": {
			      "Building": {
			        "contents": "
			Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that rebuilds changed files into \`lib/\` as you save them:

			\`\`\`shell
			pnpm build --watch
			\`\`\`
			",
			        "innerSections": [
			          {
			            "contents": "
			Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to clear and recreate an output \`dist/\` to be used in production.

			\`\`\`shell
			pnpm build:release
			\`\`\`

			CI fails if the committed \`dist/\` doesn't match what \`pnpm build:release\` produces, not counting \`.d.ts\` files.
			If that happens, run \`pnpm build:release\` and commit the changed files under \`dist/\`.
			On Renovate branches, the [Rebuild Dist workflow](./workflows/rebuild-dist.yml) runs \`pnpm build:release\` and pushes any \`dist/\` changes so dependency updates can still merge.
					",
			            "heading": "Building for Release",
			          },
			        ],
			      },
			    },
			  },
			}
		`);
	});

	test("setup mode", () => {
		const creation = testBlock(blockNcc, {
			mode: "setup",
			options: optionsBase,
		});

		expect(
			creation.extensions?.filter(({ block }) => block === blockPackageJson),
		).toMatchInlineSnapshot(`
			[
			  {
			    "block": "[Block Package JSON]",
			    "props": {
			      "properties": {
			        "devDependencies": {
			          "@vercel/ncc": "0.45.0",
			        },
			        "exports": {
			          ".": "./lib/index.js",
			        },
			        "files": [
			          "lib/",
			        ],
			        "scripts": {
			          "build": "tsc --project tsconfig.build.json",
			          "build:release": "rm -rf dist && ncc build src/index.ts -o dist",
			          "tsc": "tsc --noEmit",
			        },
			      },
			    },
			  },
			]
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockNcc, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation.extensions?.filter(({ block }) => block === blockGitignore))
			.toMatchInlineSnapshot(`
				[
				  {
				    "block": "[Block Gitignore]",
				    "props": {
				      "ignores": [
				        "/dist/**/*.d.ts",
				        "/lib",
				      ],
				      "removals": [
				        "/dist",
				        "dist",
				        "dist/",
				        "/dist/**/*.d.ts.map",
				      ],
				    },
				  },
				]
			`);
		expect(
			creation.extensions?.filter(({ block }) => block === blockRemoveFiles),
		).toMatchInlineSnapshot(`
			[
			  {
			    "block": "[Block Remove Files]",
			    "props": {
			      "files": [
			        "dist/**/*.d.ts",
			        "dist/**/*.d.ts.map",
			      ],
			    },
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

		it("returns a parsed entry when options.packageData contains a matching build:release script that first clears dist", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							"build:release":
								"rm -rf dist && ncc build src/action/index.ts -o dist",
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

		it("returns a rebuildDistWorkflow when a rebuild-dist workflow exists", () => {
			const actual = testIntake(blockNcc, {
				files: {
					".github": {
						workflows: {
							"rebuild-dist.yml": ["name: Rebuild Dist"],
						},
					},
				},
				options: optionsBase,
			});

			expect(actual).toEqual({ rebuildDistWorkflow: "rebuild-dist.yml" });
		});

		it("returns an undefined rebuildDistWorkflow when no rebuild-dist workflow exists", () => {
			const actual = testIntake(blockNcc, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": ["name: CI"],
						},
					},
				},
				options: optionsBase,
			});

			expect(actual).toEqual({ rebuildDistWorkflow: undefined });
		});

		it("returns an undefined build when options.packageData contains a bare tsc build script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							build: "tsc",
						},
					},
				},
			});

			expect(actual).toEqual({ build: undefined });
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

		it("returns a tsc when options.packageData contains a tsc script with its own settings", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							tsc: "tsc --noEmit --project tsconfig.custom.json",
						},
					},
				},
			});

			expect(actual).toEqual({
				tsc: "tsc --noEmit --project tsconfig.custom.json",
			});
		});

		it("returns an undefined tsc when options.packageData contains a bare tsc script", () => {
			const actual = testIntake(blockNcc, {
				files: {},
				options: {
					...optionsBase,
					packageData: {
						scripts: {
							tsc: "tsc",
						},
					},
				},
			});

			expect(actual).toEqual({ tsc: undefined });
		});
	});
});
