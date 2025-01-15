import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockVSCode } from "./blockVSCode.js";
import { optionsBase } from "./options.fakes.js";

describe("blockVSCode", () => {
	test("without addons", () => {
		const creation = testBlock(blockVSCode, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "hints": [
			          "> This repository includes a list of suggested VS Code extensions.",
			          "> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.",
			        ],
			        "sections": {
			          "Building": {
			            "innerSections": [],
			          },
			          "Testing": {
			            "innerSections": [
			              {
			                "contents": "
			This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
			To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
			",
			                "heading": "Debugging Tests",
			              },
			            ],
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".vscode": {
			      "extensions.json": undefined,
			      "launch.json": undefined,
			      "settings.json": "{"editor.formatOnSave":true,"editor.rulers":[80]}",
			      "tasks.json": undefined,
			    },
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockVSCode, {
			addons: {
				debuggers: [
					{
						name: "fake-debugger",
						other: true,
					},
				],
				settings: {
					"editor.formatOnSave": true,
				},
				tasks: [
					{
						detail: "Build the project",
						label: "build",
						script: "build",
						type: "npm",
					},
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "hints": [
			          "> This repository includes a list of suggested VS Code extensions.",
			          "> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.",
			        ],
			        "sections": {
			          "Building": {
			            "innerSections": [],
			          },
			          "Testing": {
			            "innerSections": [
			              {
			                "contents": "
			This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
			To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
			",
			                "heading": "Debugging Tests",
			              },
			            ],
			          },
			        },
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".vscode": {
			      "extensions.json": undefined,
			      "launch.json": "{"configurations":[{"name":"fake-debugger","other":true}],"version":"0.2.0"}",
			      "settings.json": "{"editor.formatOnSave":true,"editor.rulers":[80]}",
			      "tasks.json": "{"tasks":[{"detail":"Build the project","label":"build","script":"build","type":"npm"}],"version":"2.0.0"}",
			    },
			  },
			}
		`);
	});
});
