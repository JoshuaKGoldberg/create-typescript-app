import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockPnpmDedupe } from "./blockPnpmDedupe.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockPnpmDedupe, () => {
	test("without mode", () => {
		const creation = testBlock(blockPnpmDedupe, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "cleanupCommands": [
			          "pnpm dedupe --prefer-offline",
			        ],
			      },
			    },
			    {
			      "block": "[Block Prettier]",
			      "props": {
			        "ignores": [
			          "/_tmp_*",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockPnpmDedupe, {
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
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "cleanupCommands": [
			          "pnpm dedupe --prefer-offline",
			        ],
			      },
			    },
			    {
			      "block": "[Block Prettier]",
			      "props": {
			        "ignores": [
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-packages",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	test("transition mode with a custom lint:packages script", () => {
		const creation = testBlock(blockPnpmDedupe, {
			mode: "transition",
			options: {
				...optionsBase,
				packageData: {
					scripts: {
						"lint:packages": "pnpm dedupe --check && my-other-check",
					},
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "cleanupCommands": [
			          "pnpm dedupe --prefer-offline",
			        ],
			      },
			    },
			    {
			      "block": "[Block Prettier]",
			      "props": {
			        "ignores": [
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-packages",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	test("transition mode with the old lint:packages script", () => {
		const creation = testBlock(blockPnpmDedupe, {
			mode: "transition",
			options: {
				...optionsBase,
				packageData: {
					scripts: {
						"lint:packages": "pnpm dedupe --check",
					},
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "ignorePaths": [
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Dedupe Check",
			            "steps": [
			              {
			                "run": "pnpm dedupe --check",
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "cleanupCommands": [
			          "pnpm dedupe --prefer-offline",
			        ],
			        "properties": {
			          "scripts": {
			            "lint:packages": undefined,
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Prettier]",
			      "props": {
			        "ignores": [
			          "/_tmp_*",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Workflows]",
			      "props": {
			        "workflows": [
			          "lint-packages",
			        ],
			      },
			    },
			  ],
			}
		`);
	});
});
