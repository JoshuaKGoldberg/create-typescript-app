import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockWebExt } from "./blockWebExt.js";
import { optionsBase } from "./options.fakes.js";

describe("blockWebExt", () => {
	test("production", () => {
		const creation = testBlock(blockWebExt, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          "assets",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [ESBuild](https://esbuild.github.io) locally to build source files:

			\`\`\`shell
			pnpm dev
			\`\`\`

			Add \`--watch\` to run the builder in a watch mode that continuously re-builds as you save files:

			\`\`\`shell
			pnpm dev --watch
			\`\`\`
			",
			            "innerSections": [
			              {
			                "contents": "
			Follow Google Chrome's _[Load an unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)_ guide to load this repository's directory as an extension locally.

			> ♻️ Remember to reload the extension in \`chrome://extensions\` whenever you make changes locally!
			",
			                "heading": "Local Development with Chrome",
			              },
			              {
			                "contents": "
			Follow Firefox's _[Temporary installation in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)_ guide to load this repository's directory as an extension locally.

			You'll then need to authorize the extension to run on <https://github.com>:

			1. Find and select the _Extensions_ icon in the top right of Firefox
			2. Select the _"Manage Extension"_ gear icon next to _Refined Saved Replies_
			3. Select the _"Always Allow on github.com"_ option

			> ♻️ Remember to reload the extension in \`about:debugging#/runtime/this-firefox\` whenever you make changes locally!
			",
			                "heading": "Local Development with Firefox",
			              },
			              {
			                "contents": "
			Run [\`web-ext\`](https://extensionworkshop.com) to build a production-ready \`.zip\` under \`./web-ext-artifacts/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Then upload that \`./web-ext-artifacts/refined_saved_replies-*.zip\` file to:

			- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
			- [Firefox Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/addon/submit/distribution)
			",
			                "heading": "Production Builds",
			              },
			            ],
			          },
			          "Linting": {
			            "contents": {
			              "items": [
			                "- \`pnpm lint:web-ext\` ([web-ext](https://extensionworkshop.com)): Lints browser extension metadata after \`pnpm dev\` creates local files",
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
			            "name": "Build",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			            ],
			          },
			          {
			            "name": "Lint Web-ext",
			            "steps": [
			              {
			                "run": "pnpm dev",
			              },
			              {
			                "run": "pnpm lint:web-ext",
			              },
			            ],
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "*.zip",
			          "web-ext-artifacts",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "assets/",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "esbuild": "^0.25.0",
			            "web-ext": "^8.3.0",
			          },
			          "scripts": {
			            "build": "web-ext build --overwrite-dest",
			            "dev": "esbuild src/content-script.ts --bundle --minify --outfile=lib/content-script.js --sourcemap",
			            "lint:web-ext": "web-ext lint",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "ignores": [
			          "assets/",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});
});
