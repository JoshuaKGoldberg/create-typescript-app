import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

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
