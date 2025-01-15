import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockExampleFiles } from "./blockExampleFiles.js";
import { optionsBase } from "./options.fakes.js";

describe("blockExampleFiles", () => {
	test("without addons", () => {
		const creation = testBlock(blockExampleFiles, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons and without mode", () => {
		const creation = testBlock(blockExampleFiles, {
			addons: {
				files: {
					"index.ts": "console.log('Hello, world!');",
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons and mode", () => {
		const creation = testBlock(blockExampleFiles, {
			addons: {
				files: {
					"index.ts": "console.log('Hello, world!');",
				},
			},
			mode: "initialize",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "src": {
			      "index.ts": "console.log('Hello, world!');",
			    },
			  },
			}
		`);
	});
});
