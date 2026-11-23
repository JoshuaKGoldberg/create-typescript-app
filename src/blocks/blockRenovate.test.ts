import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockRenovate } from "./blockRenovate.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockRenovate, () => {
	test("without props", () => {
		const creation = testBlock(blockRenovate, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Apps]",
			      "props": {
			        "apps": [
			          {
			            "name": "Renovate",
			            "url": "https://github.com/apps/renovate",
			          },
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "renovate.json": "{
				"$schema": "https://docs.renovatebot.com/renovate-schema.json",
				"automerge": true,
				"extends": [
					":preserveSemverRanges",
					"config:best-practices",
					"replacements:all"
				],
				"ignoreDeps": ["codecov/codecov-action"],
				"labels": ["dependencies"],
				"minimumReleaseAge": "7 days",
				"patch": { "enabled": false },
				"postUpdateOptions": ["pnpmDedupe"]
			}
			",
			    },
			  },
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockRenovate, {
			options: optionsBase,
			props: {
				ignoreDeps: ["all-contributors-cli"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Apps]",
			      "props": {
			        "apps": [
			          {
			            "name": "Renovate",
			            "url": "https://github.com/apps/renovate",
			          },
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "renovate.json": "{
				"$schema": "https://docs.renovatebot.com/renovate-schema.json",
				"automerge": true,
				"extends": [
					":preserveSemverRanges",
					"config:best-practices",
					"replacements:all"
				],
				"ignoreDeps": ["all-contributors-cli", "codecov/codecov-action"],
				"labels": ["dependencies"],
				"minimumReleaseAge": "7 days",
				"patch": { "enabled": false },
				"postUpdateOptions": ["pnpmDedupe"]
			}
			",
			    },
			  },
			}
		`);
	});

	test("with gitIgnoredAuthors", () => {
		const creation = testBlock(blockRenovate, {
			options: optionsBase,
			props: {
				gitIgnoredAuthors: [
					"41898282+github-actions[bot]@users.noreply.github.com",
				],
			},
		});

		expect(creation.files).toMatchInlineSnapshot(`
			{
			  ".github": {
			    "renovate.json": "{
				"$schema": "https://docs.renovatebot.com/renovate-schema.json",
				"automerge": true,
				"extends": [
					":preserveSemverRanges",
					"config:best-practices",
					"replacements:all"
				],
				"gitIgnoredAuthors": [
					"41898282+github-actions[bot]@users.noreply.github.com"
				],
				"ignoreDeps": ["codecov/codecov-action"],
				"labels": ["dependencies"],
				"minimumReleaseAge": "7 days",
				"patch": { "enabled": false },
				"postUpdateOptions": ["pnpmDedupe"]
			}
			",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns no ignoreDeps when .github/renovate.json does not exist", () => {
			const actual = testIntake(blockRenovate, {
				files: {},
			});

			expect(actual).toEqual({
				gitIgnoredAuthors: [],
				ignoreDeps: [],
				packageRules: [],
			});
		});

		it("returns no ignoreDeps when .github/renovate.json does not contain truthy data", () => {
			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify(null)],
					},
				},
			});

			expect(actual).toEqual({
				gitIgnoredAuthors: [],
				ignoreDeps: [],
				packageRules: [],
			});
		});

		it("returns no ignoreDeps when .github/renovate.json contains only unrelated data", () => {
			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify({ other: true })],
					},
				},
			});

			expect(actual).toEqual({
				gitIgnoredAuthors: [],
				ignoreDeps: [],
				packageRules: [],
			});
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

			expect(actual).toEqual({
				gitIgnoredAuthors: [],
				ignoreDeps,
				packageRules: [],
			});
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

			expect(actual).toEqual({
				gitIgnoredAuthors: [],
				ignoreDeps,
				packageRules: [],
			});
		});

		it("returns gitIgnoredAuthors when .github/renovate.json contains gitIgnoredAuthors", () => {
			const gitIgnoredAuthors = [
				"41898282+github-actions[bot]@users.noreply.github.com",
			];

			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify({ gitIgnoredAuthors })],
					},
				},
			});

			expect(actual).toEqual({
				gitIgnoredAuthors,
				ignoreDeps: [],
				packageRules: [],
			});
		});
	});
});
