import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockRenovate } from "./blockRenovate.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRenovate", () => {
	test("without addons", () => {
		const creation = testBlock(blockRenovate, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "apps": [
			          {
			            "name": "Renovate",
			            "url": "https://github.com/apps/renovate",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "renovate.json": "{"$schema":"https://docs.renovatebot.com/renovate-schema.json","automerge":true,"extends":[":preserveSemverRanges","config:best-practices","replacements:all"],"ignoreDeps":["codecov/codecov-action"],"labels":["dependencies"],"minimumReleaseAge":"7 days","patch":{"enabled":false},"postUpdateOptions":["pnpmDedupe"]}",
			    },
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockRenovate, {
			addons: {
				ignoreDeps: ["all-contributors-cli"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "apps": [
			          {
			            "name": "Renovate",
			            "url": "https://github.com/apps/renovate",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "renovate.json": "{"$schema":"https://docs.renovatebot.com/renovate-schema.json","automerge":true,"extends":[":preserveSemverRanges","config:best-practices","replacements:all"],"ignoreDeps":["all-contributors-cli","codecov/codecov-action"],"labels":["dependencies"],"minimumReleaseAge":"7 days","patch":{"enabled":false},"postUpdateOptions":["pnpmDedupe"]}",
			    },
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns no ignoreDeps when .github/renovate.json does not exist", () => {
			const actual = testIntake(blockRenovate, {
				files: {},
			});

			expect(actual).toEqual({ ignoreDeps: [] });
		});

		it("returns no ignoreDeps when .github/renovate.json does not contain truthy data", () => {
			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify(null)],
					},
				},
			});

			expect(actual).toEqual({ ignoreDeps: [] });
		});

		it("returns no ignoreDeps when .github/renovate.json contains only unrelated data", () => {
			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify({ other: true })],
					},
				},
			});

			expect(actual).toEqual({ ignoreDeps: [] });
		});

		it("returns ignoreDeps when .github/renovate.json contains ignoreDeps", () => {
			const ignoreDeps = ["all-contributors-cli", "codecov/codecov-action"];

			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify({ ignoreDeps })],
					},
				},
			});

			expect(actual).toEqual({ ignoreDeps });
		});

		it("returns ignoreDeps when .github/renovate.json contains ignoreDeps and other data", () => {
			const ignoreDeps = ["all-contributors-cli", "codecov/codecov-action"];

			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [
							JSON.stringify({
								ignoreDeps,
								other: true,
							}),
						],
					},
				},
			});

			expect(actual).toEqual({ ignoreDeps });
		});
	});
});
