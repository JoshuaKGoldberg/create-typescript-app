import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockExports } from "./blockExports.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockExports, () => {
	it("without addons", () => {
		const creation = testBlock(blockExports, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./lib/index.mjs",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node ./lib/index.mjs",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	it("with addons", () => {
		const creation = testBlock(blockExports, {
			addons: {
				filePath: "other.js",
				runArgs: ["--version"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./other.js",
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node other.js --version",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when package.json does not exist", () => {
			const actual = testIntake(blockExports, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when package.json does not contain exports or main", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [JSON.stringify({ name: "test" })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns filePath from main when package.json does not contain exports", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [JSON.stringify({ main: "lib/index.js" })],
				},
			});

			expect(actual).toEqual({ filePath: "lib/index.js" });
		});

		it("ignores main when package.json contains exports", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: { ".": "./lib/index.mjs" },
							main: "lib/index.js",
						}),
					],
				},
			});

			expect(actual).toEqual({ filePath: "./lib/index.mjs" });
		});

		it("returns undefined when package.json exports does not contain a string '.' entry", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({ exports: { ".": { import: "./lib/index.js" } } }),
					],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns filePath when package.json exports is a string", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [JSON.stringify({ exports: "./lib/index.js" })],
				},
			});

			expect(actual).toEqual({ filePath: "./lib/index.js" });
		});

		it("returns filePath when package.json exports contains a string '.' entry", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({ exports: { ".": "./lib/index.js" } }),
					],
				},
			});

			expect(actual).toEqual({ filePath: "./lib/index.js" });
		});
	});
});
