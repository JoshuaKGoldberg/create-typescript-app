import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test, vi } from "vitest";

import { blockPrettier } from "./blockPrettier.ts";
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

describe(blockPrettier, () => {
	test("without props or mode", () => {
		const creation = testBlock(blockPrettier, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			    },
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Formatting": {
			            "contents": "
			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format --write
			\`\`\`
			",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Format Check",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
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
			            "husky": "0.0.0-mock",
			            "prettier": "0.0.0-mock",
			            "pretty-quick": "0.0.0-mock",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx pretty-quick --staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/dist
			/pnpm-lock.yaml
			",
			    "prettier.config.ts": [
			      "import type { Config } from "prettier";

			export default { useTabs: true } satisfies Config;
			",
			      {
			        "previously": [
			          ".prettierrc.json",
			        ],
			      },
			    ],
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm format --write",
			      ],
			      "phase": 4,
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockPrettier, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			    },
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Formatting": {
			            "contents": "
			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format --write
			\`\`\`
			",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Format Check",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
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
			            "husky": "0.0.0-mock",
			            "prettier": "0.0.0-mock",
			            "pretty-quick": "0.0.0-mock",
			          },
			          "lint-staged": undefined,
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			    },
			    {
			      "block": "[Block Remove Dependencies]",
			      "props": {
			        "dependencies": [
			          "eslint-config-prettier",
			          "eslint-plugin-prettier",
			          "lint-staged",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".lintstagedrc*",
			          ".prettierrc*",
			          "lint-staged.config.*",
			          "prettier.config.{c,j,m}*",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "format",
			          "prettier",
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx pretty-quick --staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/dist
			/pnpm-lock.yaml
			",
			    "prettier.config.ts": [
			      "import type { Config } from "prettier";

			export default { useTabs: true } satisfies Config;
			",
			      {
			        "previously": [
			          ".prettierrc.json",
			        ],
			      },
			    ],
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm format --write",
			      ],
			      "phase": 4,
			    },
			  ],
			}
		`);
	});

	test("with options.type set to commonjs", () => {
		const creation = testBlock(blockPrettier, {
			options: { ...optionsBase, type: "commonjs" },
		});

		expect(creation.files?.["prettier.config.mts"]).toEqual([
			`import type { Config } from "prettier";

export default { useTabs: true } satisfies Config;
`,
			{ previously: [".prettierrc.json", "prettier.config.ts"] },
		]);
		expect(creation.files).not.toHaveProperty(["prettier.config.ts"]);
	});

	test("transition mode with options.type set to commonjs", () => {
		const creation = testBlock(blockPrettier, {
			mode: "transition",
			options: { ...optionsBase, type: "commonjs" },
		});

		expect(creation.extensions).toContainEqual(
			expect.objectContaining({
				props: {
					files: [
						".lintstagedrc*",
						".prettierrc*",
						"lint-staged.config.*",
						"prettier.config.{c,j,mj}*",
					],
				},
			}),
		);
	});

	test("with props", () => {
		const creation = testBlock(blockPrettier, {
			options: optionsBase,
			props: {
				ignores: ["generated"],
				overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				plugins: [
					"./lib/index.js",
					"prettier-plugin-curly",
					"prettier-plugin-packagejson",
					"prettier-plugin-sh",
				],
				runBefore: ["pnpm build || exit 0"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			    },
			    {
			      "block": "[Block Development Docs]",
			      "props": {
			        "sections": {
			          "Formatting": {
			            "contents": "
			[Prettier](https://prettier.io) is used to format code.
			It should be applied automatically when you save files in VS Code or make a Git commit.

			To manually reformat all files, you can run:

			\`\`\`shell
			pnpm format --write
			\`\`\`
			",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Format Check",
			            "steps": [
			              {
			                "run": "pnpm build || exit 0",
			              },
			              {
			                "run": "pnpm format --list-different",
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
			            "husky": "0.0.0-mock",
			            "prettier": "0.0.0-mock",
			            "prettier-plugin-curly": "0.0.0-mock",
			            "prettier-plugin-packagejson": "0.0.0-mock",
			            "prettier-plugin-sh": "0.0.0-mock",
			            "pretty-quick": "0.0.0-mock",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block VS Code]",
			      "props": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx pretty-quick --staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/dist
			/pnpm-lock.yaml
			generated
			",
			    "prettier.config.ts": [
			      "import type { Config } from "prettier";

			export default {
				overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				plugins: [
					"./lib/index.js",
					"prettier-plugin-curly",
					"prettier-plugin-packagejson",
					"prettier-plugin-sh",
				],
				useTabs: true,
			} satisfies Config;
			",
			      {
			        "previously": [
			          ".prettierrc.json",
			        ],
			      },
			    ],
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm build || exit 0",
			        "pnpm format --write",
			      ],
			      "phase": 4,
			    },
			  ],
			}
		`);
	});
});
