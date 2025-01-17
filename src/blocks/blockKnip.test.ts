import { testBlock } from "create-testers";
import { describe, expect, test, vi } from "vitest";

import { blockKnip } from "./blockKnip.js";
import { optionsBase } from "./options.fakes.js";

vi.mock("../utils/resolveBin.js", () => ({
	resolveBin: (bin: string) => `path/to/${bin}`,
}));

describe("blockKnip", () => {
	test("without addons", () => {
		const creation = testBlock(blockKnip, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "knip": "5.42.2",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.json": "{"$schema":"https://unpkg.com/knip@5.42.2/schema.json","entry":["src/index.ts","src/**/*.test.*"],"ignoreExportsUsedInFile":{"interface":true,"type":true},"project":["src/**/*.ts"]}",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockKnip, {
			addons: {
				ignoreDependencies: ["abc", "def"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "sections": {
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports",
			              ],
			            },
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint Knip",
			            "steps": [
			              {
			                "run": "pnpm lint:knip",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "knip": "5.42.2",
			          },
			          "scripts": {
			            "lint:knip": "knip",
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    "knip.json": "{"$schema":"https://unpkg.com/knip@5.42.2/schema.json","entry":["src/index.ts","src/**/*.test.*"],"ignoreDependencies":["abc","def"],"ignoreExportsUsedInFile":{"interface":true,"type":true},"project":["src/**/*.ts"]}",
			  },
			}
		`);
	});
});
