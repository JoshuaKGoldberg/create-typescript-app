import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockExports } from "./blockExports.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockExports, () => {
	it("without props", () => {
		const creation = testBlock(blockExports, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block TSDown]",
			      "props": {
			        "exports": "./dist/index.mjs",
			        "runInCI": [
			          "node ./dist/index.mjs",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vite]",
			      "props": {
			        "runInCI": [
			          "node ./dist/index.mjs",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	it("with props", () => {
		const creation = testBlock(blockExports, {
			options: optionsBase,
			props: {
				filePath: "other.js",
				runArgs: ["--version"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block TSDown]",
			      "props": {
			        "exports": "./other.js",
			        "runInCI": [
			          "node other.js --version",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vite]",
			      "props": {
			        "runInCI": [
			          "node ./dist/index.mjs --version",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	it("with a legacy lib/ main in options.packageData", () => {
		const creation = testBlock(blockExports, {
			options: {
				...optionsBase,
				packageData: { main: "lib/index.js" },
			},
			props: {
				filePath: "./dist/index.js",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block TSDown]",
			      "props": {
			        "exports": "./dist/index.js",
			        "main": "./dist/index.js",
			        "runInCI": [
			          "node ./dist/index.js",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vite]",
			      "props": {
			        "runInCI": [
			          "node ./dist/index.mjs",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	it.each([
		["a string", "./lib/browser.js", "./dist/browser.js"],
		["a string without ./", "lib/browser.js", "./dist/browser.js"],
		["a string outside lib/", "./src/browser.js", "./src/browser.js"],
		[
			"an object",
			{
				"./lib/node.js": "./lib/browser.js",
				"./lib/server.js": false,
				fs: "./shims/fs.js",
				path: false,
			},
			{
				"./dist/node.js": "./dist/browser.js",
				"./dist/server.js": false,
				fs: "./shims/fs.js",
				path: false,
			},
		],
	])(
		"with %s browser in options.packageData",
		(_, browser: Record<string, boolean | string> | string, expected) => {
			const creation = testBlock(blockExports, {
				options: { ...optionsBase, packageData: { browser } },
			});

			expect(creation.extensions?.[0].props).toEqual({
				browser: expected,
				exports: "./dist/index.mjs",
				runInCI: ["node ./dist/index.mjs"],
			});
		},
	);

	it("with subpaths", () => {
		const subpaths = { "./bin/index.js": "./bin/index.js" };
		const creation = testBlock(blockExports, {
			options: optionsBase,
			props: { subpaths },
		});

		expect(creation.extensions?.[0].props).toEqual({
			exports: "./dist/index.mjs",
			runInCI: ["node ./dist/index.mjs"],
			subpaths,
		});
	});

	it("with conditions", () => {
		const creation = testBlock(blockExports, {
			options: optionsBase,
			props: {
				conditions: {
					browser: "./dist/browser.js",
					default: "./dist/index.js",
				},
				filePath: "./dist/index.js",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block TSDown]",
			      "props": {
			        "exports": {
			          "browser": "./dist/browser.js",
			          "default": "./dist/index.js",
			        },
			        "runInCI": [
			          "node ./dist/index.js",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vite]",
			      "props": {
			        "runInCI": [
			          "node ./dist/index.mjs",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	test.each([
		[
			"nested import and require conditions",
			{
				conditions: {
					import: { default: "./dist/index.mjs", types: "./dist/index.d.mts" },
					require: { default: "./dist/index.cjs", types: "./dist/index.d.cts" },
				},
				filePath: "./dist/index.mjs",
			},
			["node ./dist/index.mjs", "node ./dist/index.cjs"],
		],
		[
			"require before import conditions",
			{
				conditions: Object.fromEntries([
					["require", "./dist/index.cjs"],
					["import", "./dist/index.mjs"],
				]),
				filePath: "./dist/index.cjs",
			},
			["node ./dist/index.cjs", "node ./dist/index.mjs"],
		],
		[
			"import and require conditions with runArgs",
			{
				conditions: {
					import: "./dist/index.mjs",
					require: "./dist/index.cjs",
				},
				runArgs: ["--version"],
			},
			["node ./dist/index.mjs --version", "node ./dist/index.cjs --version"],
		],
		[
			"import and require conditions sharing a file",
			{
				conditions: {
					import: "./dist/index.js",
					require: "./dist/index.js",
				},
				filePath: "./dist/index.js",
			},
			["node ./dist/index.js"],
		],
		[
			"node and default conditions",
			{
				conditions: Object.fromEntries([
					["node", "./dist/node.js"],
					["default", "./dist/browser.js"],
				]),
				filePath: "./dist/node.js",
			},
			["node ./dist/node.js"],
		],
		[
			"a filePath that is not among the conditions",
			{
				conditions: {
					import: "./dist/index.mjs",
					require: "./dist/index.cjs",
				},
				filePath: "./dist/other.mjs",
			},
			["node ./dist/other.mjs"],
		],
	])("runInCI with %s", (_, props, runInCI) => {
		const creation = testBlock(blockExports, { options: optionsBase, props });

		expect(creation.extensions?.[0].props).toMatchObject({ runInCI });
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

		it("returns dist/ conditions when package.json exports '.' contains browser and default conditions", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: {
								".": {
									browser: "./lib/browser.js",
									default: "./lib/index.js",
								},
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				conditions: {
					browser: "./dist/browser.js",
					default: "./dist/index.js",
				},
				filePath: "./dist/index.js",
			});
		});

		it("returns dist/ conditions when package.json exports '.' contains nested import and require conditions", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: {
								".": {
									import: {
										default: "./lib/index.mjs",
										types: "./lib/index.d.mts",
									},
									require: {
										default: "./lib/index.cjs",
										types: "./lib/index.d.cts",
									},
								},
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				conditions: {
					import: {
						default: "./dist/index.mjs",
						types: "./dist/index.d.mts",
					},
					require: {
						default: "./dist/index.cjs",
						types: "./dist/index.d.cts",
					},
				},
				filePath: "./dist/index.mjs",
			});
		});

		it("returns conditions without a filePath when package.json exports '.' contains no runnable conditions", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: { ".": { browser: "./lib/browser.js" } },
						}),
					],
				},
			});

			expect(actual).toEqual({
				conditions: { browser: "./dist/browser.js" },
			});
		});

		it("keeps non-path condition values when package.json exports '.' contains a null condition", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: {
								".": {
									browser: null,
									default: "./lib/index.js",
								},
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				conditions: {
					browser: null,
					default: "./dist/index.js",
				},
				filePath: "./dist/index.js",
			});
		});

		it("returns filePath when package.json exports is a string", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [JSON.stringify({ exports: "./dist/index.js" })],
				},
			});

			expect(actual).toEqual({ filePath: "./dist/index.js" });
		});

		it("returns dist/ subpaths when package.json exports contains them alongside a string '.' entry", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: {
								".": "./lib/index.js",
								"./bin/index.js": "./bin/index.js",
								"./internal/*": null,
								"./rules": { import: "./lib/rules.js" },
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				filePath: "./dist/index.js",
				subpaths: {
					"./bin/index.js": "./bin/index.js",
					"./internal/*": null,
					"./rules": { import: "./dist/rules.js" },
				},
			});
		});

		it("returns subpaths when package.json exports contains them alongside a conditional '.' entry", () => {
			const actual = testIntake(blockExports, {
				files: {
					"package.json": [
						JSON.stringify({
							exports: {
								".": { default: "./dist/index.js" },
								"./package.json": "./package.json",
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				conditions: { default: "./dist/index.js" },
				filePath: "./dist/index.js",
				subpaths: { "./package.json": "./package.json" },
			});
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
