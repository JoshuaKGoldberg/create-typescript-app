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
	test("without addons or mode", () => {
		const creation = testBlock(blockPrettier, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "prettier": "0.0.0-mock",
			            "pretty-quick": "0.0.0-mock",
			            "simple-git-hooks": "0.0.0-mock",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "simple-git-hooks",
			          },
			          "simple-git-hooks": {
			            "pre-commit": "pnpm pretty-quick --staged",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "allowBuilds": {
			            "simple-git-hooks": false,
			          },
			        },
			      },
			      "block": "[Block pnpm Workspace]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			      "block": "[Block VS Code]",
			    },
			  ],
			  "files": {
			    ".prettierignore": "/dist
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
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "prettier": "0.0.0-mock",
			            "pretty-quick": "0.0.0-mock",
			            "simple-git-hooks": "0.0.0-mock",
			          },
			          "lint-staged": undefined,
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "simple-git-hooks",
			          },
			          "simple-git-hooks": {
			            "pre-commit": "pnpm pretty-quick --staged",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "allowBuilds": {
			            "simple-git-hooks": false,
			          },
			        },
			      },
			      "block": "[Block pnpm Workspace]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			      "block": "[Block VS Code]",
			    },
			    {
			      "addons": {
			        "dependencies": [
			          "eslint-config-prettier",
			          "eslint-plugin-prettier",
			          "husky",
			          "lint-staged",
			        ],
			      },
			      "block": "[Block Remove Dependencies]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".husky",
			          ".lintstagedrc*",
			          ".prettierrc*",
			          "lint-staged.config.*",
			          "prettier.config.{c,j,m}*",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			    {
			      "addons": {
			        "workflows": [
			          "format",
			          "prettier",
			        ],
			      },
			      "block": "[Block Remove Workflows]",
			    },
			  ],
			  "files": {
			    ".prettierignore": "/dist
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
			    {
			      "commands": [
			        "git config --unset core.hooksPath ^\\.husky",
			      ],
			      "phase": 0,
			      "silent": true,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockPrettier, {
			addons: {
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
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
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
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "prettier": "0.0.0-mock",
			            "prettier-plugin-curly": "0.0.0-mock",
			            "prettier-plugin-packagejson": "0.0.0-mock",
			            "prettier-plugin-sh": "0.0.0-mock",
			            "pretty-quick": "0.0.0-mock",
			            "simple-git-hooks": "0.0.0-mock",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "simple-git-hooks",
			          },
			          "simple-git-hooks": {
			            "pre-commit": "pnpm pretty-quick --staged",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "allowBuilds": {
			            "simple-git-hooks": false,
			          },
			        },
			      },
			      "block": "[Block pnpm Workspace]",
			    },
			    {
			      "addons": {
			        "extensions": [
			          "esbenp.prettier-vscode",
			        ],
			        "settings": {
			          "editor.defaultFormatter": "esbenp.prettier-vscode",
			        },
			      },
			      "block": "[Block VS Code]",
			    },
			  ],
			  "files": {
			    ".prettierignore": "/dist
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
