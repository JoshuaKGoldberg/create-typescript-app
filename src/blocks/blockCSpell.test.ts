import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockCSpell } from "./blockCSpell.ts";
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

vi.mock("../utils/resolveBin.ts", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe(blockCSpell, () => {
	test("without props or options", () => {
		const creation = testBlock(blockCSpell, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			    },
			  ],
			  "files": {
			    "cspell.json": "{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": ["CHANGELOG.md", "dist", "node_modules", "pnpm-lock.yaml"]
			}
			",
			  },
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockCSpell, {
			options: optionsBase,
			props: {
				ignorePaths: ["lib/"],
				words: ["joshuakgoldberg"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			    },
			  ],
			  "files": {
			    "cspell.json": "{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": [
					"CHANGELOG.md",
					"dist",
					"lib/",
					"node_modules",
					"pnpm-lock.yaml"
				],
				"words": ["joshuakgoldberg"]
			}
			",
			  },
			}
		`);
	});

	test("with options", () => {
		const creation = testBlock(blockCSpell, {
			options: {
				...optionsBase,
				words: ["joshuakgoldberg"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			    },
			  ],
			  "files": {
			    "cspell.json": "{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": ["CHANGELOG.md", "dist", "node_modules", "pnpm-lock.yaml"],
				"words": ["joshuakgoldberg"]
			}
			",
			  },
			}
		`);
	});

	test("setup mode", () => {
		const creation = testBlock(blockCSpell, {
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			    },
			  ],
			  "files": {
			    "cspell.json": "{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": ["CHANGELOG.md", "dist", "node_modules", "pnpm-lock.yaml"]
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "node path/to/cspell-populate-words/bin/index.mjs --words access --words public --words description --words Test --words directory --words documentation --words readme --words usage --words Usage --words usage. --words email --words github --words github@email.com --words npm@email.com --words emoji --words node --words minimum --words owner --words test-owner --words preset --words minimal --words repository --words test-repository --words title --words Title --words existingLabels",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	test("setup mode with options that contain unsafe text", () => {
		const creation = testBlock(blockCSpell, {
			mode: "setup",
			options: {
				...optionsBase,
				description:
					"A `touch one` $(touch two) \"quoted\" <b>bold</b>; it's the user’s naïve & doesn't\\ O'Café --flag | > % 🦄 1️⃣ quoted",
				directory: "/path/to/directory",
				documentation: {
					readme: {
						usage:
							"## Usage\n\n```shell\nnpx @scope/some_name --yes\n```\n\n[link](https://example.com/path?query=value) me@example.com",
					},
				},
				existingLabels: [
					{ color: "000000", description: "Existing", name: "label" },
				],
			},
		});

		expect(creation.scripts).toMatchInlineSnapshot(`
			[
			  {
			    "commands": [
			      "node path/to/cspell-populate-words/bin/index.mjs --words access --words public --words description --words touch --words quoted --words bold --words user --words naïve --words does --words Café --words flag --words directory --words documentation --words readme --words usage --words Usage --words shell --words scope/some_name --words link --words me@example.com --words email --words github --words github@email.com --words npm@email.com --words emoji --words node --words minimum --words owner --words test-owner --words preset --words minimal --words repository --words test-repository --words title --words Test --words Title --words existingLabels",
			    ],
			    "phase": 3,
			  },
			]
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockCSpell, {
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
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files",
			              ],
			            },
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "streetsidesoftware.code-spell-checker",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint Spelling",
			            "steps": [
			              {
			                "run": "pnpm lint:spelling",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "cspell": "0.0.0-mock",
			          },
			          "scripts": {
			            "lint:spelling": "cspell "**" ".github/**/*"",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-spelling",
			          "spelling",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "cspell.json": "{
				"dictionaries": ["npm", "node", "typescript"],
				"ignorePaths": ["CHANGELOG.md", "dist", "node_modules", "pnpm-lock.yaml"]
			}
			",
			  },
			}
		`);
	});

	test("with dictionaries", () => {
		const creation = testBlock(blockCSpell, {
			options: optionsBase,
			props: {
				dictionaries: ["css", "node", "html"],
			},
		});

		expect(JSON.parse(creation.files?.["cspell.json"] as string)).toEqual(
			expect.objectContaining({
				dictionaries: ["npm", "node", "typescript", "css", "html"],
			}),
		);
	});

	test("with ignorePathRemovals", () => {
		const creation = testBlock(blockCSpell, {
			options: optionsBase,
			props: {
				ignorePathRemovals: ["lib"],
				ignorePaths: ["coverage", "lib"],
			},
		});

		expect(JSON.parse(creation.files?.["cspell.json"] as string)).toEqual(
			expect.objectContaining({
				ignorePaths: [
					"CHANGELOG.md",
					"coverage",
					"dist",
					"node_modules",
					"pnpm-lock.yaml",
				],
			}),
		);
	});

	test("with words that differ only by case", () => {
		const creation = testBlock(blockCSpell, {
			options: {
				...optionsBase,
				words: ["joshuakgoldberg", "OctoGuide", "zizmor"],
			},
			props: {
				words: ["JoshuaKGoldberg", "octoguide", "zizmor"],
			},
		});

		expect(JSON.parse(creation.files?.["cspell.json"] as string)).toEqual(
			expect.objectContaining({
				words: ["JoshuaKGoldberg", "OctoGuide", "zizmor"],
			}),
		);
	});

	test("with wordRemovals", () => {
		const creation = testBlock(blockCSpell, {
			options: {
				...optionsBase,
				words: ["markdownlintignore", "tsup", "zizmor"],
			},
			props: {
				wordRemovals: ["markdownlintignore", "tsup"],
				words: ["octoguide", "tsup"],
			},
		});

		expect(JSON.parse(creation.files?.["cspell.json"] as string)).toEqual(
			expect.objectContaining({
				words: ["octoguide", "zizmor"],
			}),
		);
	});

	describe("intake", () => {
		it("returns undefined when cspell.json does not exist", () => {
			const actual = testIntake(blockCSpell, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when cspell.json does not contain truthy data", () => {
			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify(null)],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when cspell.json contains invalid data", () => {
			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify({ ignorePaths: true })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns the data when cspell.json contains dictionaries, ignorePaths, and words", () => {
			const data = {
				dictionaries: ["css", "npm"],
				ignorePaths: ["other"],
				words: ["abc", "def"],
			};

			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify(data)],
				},
			});

			expect(actual).toEqual(data);
		});

		it("removes .github from ignorePaths when it is the only ignore path", () => {
			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [JSON.stringify({ ignorePaths: [".github"] })],
				},
			});

			expect(actual).toEqual({
				dictionaries: [],
				ignorePaths: [],
				words: [],
			});
		});

		it("removes .github from ignorePaths when cspell.json contains it", () => {
			const actual = testIntake(blockCSpell, {
				files: {
					"cspell.json": [
						JSON.stringify({
							ignorePaths: [".github", "other"],
							words: ["abc"],
						}),
					],
				},
			});

			expect(actual).toEqual({
				dictionaries: [],
				ignorePaths: ["other"],
				words: ["abc"],
			});
		});
	});
});
