import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockPrettier } from "./blockPrettier.js";
import { optionsBase } from "./options.fakes.js";

describe("blockPrettier", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockPrettier, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Prettier",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
			              },
			            ],
			          },
			        ],
			        "removedWorkflows": [
			          "format",
			          "prettier",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "husky": "9.1.7",
			            "lint-staged": "15.5.0",
			            "prettier": "3.5.3",
			          },
			          "lint-staged": {
			            "*": "prettier --ignore-unknown --write",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx lint-staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/lib
			/pnpm-lock.yaml
			",
			    ".prettierrc.json": "{"$schema":"http://json.schemastore.org/prettierrc","useTabs":true}",
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
			        "ignores": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Prettier",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
			              },
			            ],
			          },
			        ],
			        "removedWorkflows": [
			          "format",
			          "prettier",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "husky": "9.1.7",
			            "lint-staged": "15.5.0",
			            "prettier": "3.5.3",
			          },
			          "lint-staged": {
			            "*": "prettier --ignore-unknown --write",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": [
			          ".prettierrc.{c*,js,m*,t*}",
			          "prettier.config*",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx lint-staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/lib
			/pnpm-lock.yaml
			",
			    ".prettierrc.json": "{"$schema":"http://json.schemastore.org/prettierrc","useTabs":true}",
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

	test("with addons", () => {
		const creation = testBlock(blockPrettier, {
			addons: {
				ignores: ["generated"],
				overrides: [{ files: ".nvmrc", options: { parser: "yaml" } }],
				plugins: [
					"prettier-plugin-curly",
					"prettier-plugin-packagejson",
					"prettier-plugin-sh",
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          ".all-contributorsrc",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Prettier",
			            "steps": [
			              {
			                "run": "pnpm format --list-different",
			              },
			            ],
			          },
			        ],
			        "removedWorkflows": [
			          "format",
			          "prettier",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "husky": "9.1.7",
			            "lint-staged": "15.5.0",
			            "prettier": "3.5.3",
			            "prettier-plugin-curly": "0.3.1",
			            "prettier-plugin-packagejson": "2.5.10",
			            "prettier-plugin-sh": "0.15.0",
			          },
			          "lint-staged": {
			            "*": "prettier --ignore-unknown --write",
			          },
			          "scripts": {
			            "format": "prettier .",
			            "prepare": "husky",
			          },
			        },
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".husky": {
			      ".gitignore": "_
			",
			      "pre-commit": [
			        "npx lint-staged
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			    ".prettierignore": "/.husky
			/lib
			/pnpm-lock.yaml
			generated
			",
			    ".prettierrc.json": "{"$schema":"http://json.schemastore.org/prettierrc","overrides":[{"files":".nvmrc","options":{"parser":"yaml"}}],"plugins":["prettier-plugin-curly","prettier-plugin-packagejson","prettier-plugin-sh"],"useTabs":true}",
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
});
