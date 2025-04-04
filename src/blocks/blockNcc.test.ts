import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockNcc } from "./blockNcc.js";
import { optionsBase } from "./options.fakes.js";

describe("blockNcc", () => {
	test("production", () => {
		const creation = testBlock(blockNcc, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			        ],
			      },
			      "block": [Function],
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
			      "block": [Function],
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "dist",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
