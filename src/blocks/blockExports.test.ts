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
			            ".": "./dist/index.mjs",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node ./dist/index.mjs",
			        ],
			      },
			      "block": "[Block TSDown]",
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
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node other.js --version",
			        ],
			      },
			      "block": "[Block TSDown]",
			    },
			  ],
			}
		`);
	});

	it("with a legacy lib/ main in options.packageData", () => {
		const creation = testBlock(blockExports, {
			addons: {
				filePath: "./dist/index.js",
			},
			options: {
				...optionsBase,
				packageData: { main: "lib/index.js" },
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "properties": {
			          "exports": {
			            ".": "./dist/index.js",
			          },
			          "main": "./dist/index.js",
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "runInCI": [
			          "node ./dist/index.js",
			        ],
			      },
			      "block": "[Block TSDown]",
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

			expect(actual).toEqual({ filePath: "./dist/index.js" });
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

			expect(actual).toEqual({ filePath: "./dist/index.mjs" });
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
					"package.json": [JSON.stringify({ exports: "./dist/index.js" })],
				},
			});

			expect(actual).toEqual({ filePath: "./dist/index.js" });
		});

		it("returns filePath when package.json exports contains a string '.' entry", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({ exports: { ".": "./dist/index.js" } }),
					],
				},
			});

			expect(actual).toEqual({ filePath: "./dist/index.js" });
		});

		it("returns a dist/ filePath when package.json exports points into the legacy lib/", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({ exports: { ".": "./lib/index.js" } }),
					],
				},
			});

			expect(actual).toEqual({ filePath: "./dist/index.js" });
		});
	});
});
