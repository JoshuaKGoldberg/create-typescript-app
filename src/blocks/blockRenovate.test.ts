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
				customManagers: [
					{
						customType: "regex",
						datasourceTemplate: "github-tags",
						managerFilePatterns: ["/^src/.+\\.ts$/"],
						matchStrings: [
							'uses\\("(?<depName>[^"]+)", "(?<currentValue>[^"]+)"',
						],
					},
				],
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
				"customManagers": [
					{
						"customType": "regex",
						"datasourceTemplate": "github-tags",
						"managerFilePatterns": ["/^src/.+\\\\.ts$/"],
						"matchStrings": [
							"uses\\\\(\\"(?<depName>[^\\"]+)\\", \\"(?<currentValue>[^\\"]+)\\""
						]
					}
				],
				"extends": [
					":preserveSemverRanges",
					"config:best-practices",
					"replacements:all"
				],
				"ignoreDeps": ["all-contributors-cli"],
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

	test("transition mode", () => {
		const creation = testBlock(blockRenovate, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation.extensions).toMatchInlineSnapshot(`
			[
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
			  {
			    "block": "[Block Remove Files]",
			    "props": {
			      "files": [
			        ".github/renovate.{json5,jsonc}",
			        ".renovaterc",
			        ".renovaterc.{json,json5,jsonc}",
			        "renovate.{json,json5,jsonc}",
			      ],
			    },
			  },
			]
		`);
	});

	describe("intake", () => {
		it("returns no ignoreDeps when .github/renovate.json does not exist", () => {
			const actual = testIntake(blockRenovate, {
				files: {},
			});

			expect(actual).toEqual({
				customManagers: [],
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
				customManagers: [],
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
				customManagers: [],
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
				customManagers: [],
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
				customManagers: [],
				gitIgnoredAuthors: [],
				ignoreDeps,
				packageRules: [],
			});
		});

		it("returns customManagers when .github/renovate.json contains customManagers", () => {
			const customManagers = [
				{
					customType: "regex",
					datasourceTemplate: "github-tags",
					managerFilePatterns: ["/^src/.+\\.ts$/"],
					matchStrings: [
						'uses\\("(?<depName>[^"]+)", "(?<currentValue>[^"]+)"',
					],
				},
			];

			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify({ customManagers })],
					},
				},
			});

			expect(actual).toEqual({
				customManagers,
				gitIgnoredAuthors: [],
				ignoreDeps: [],
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
				customManagers: [],
				gitIgnoredAuthors,
				ignoreDeps: [],
				packageRules: [],
			});
		});

		it.each([
			["renovate.json"],
			["renovate.jsonc"],
			["renovate.json5"],
			[".renovaterc"],
			[".renovaterc.json"],
			[".renovaterc.jsonc"],
			[".renovaterc.json5"],
		])("returns data when only %s exists", (fileName) => {
			const ignoreDeps = ["all-contributors-cli"];

			const actual = testIntake(blockRenovate, {
				files: {
					[fileName]: [JSON.stringify({ ignoreDeps })],
				},
			});

			expect(actual).toEqual({
				customManagers: [],
				gitIgnoredAuthors: [],
				ignoreDeps,
				packageRules: [],
			});
		});

		it("ignores invalid data in other files", () => {
			const ignoreDeps = ["all-contributors-cli"];

			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [JSON.stringify({ ignoreDeps })],
					},
					"renovate.json": [JSON.stringify({ ignoreDeps: "invalid" })],
				},
			});

			expect(actual).toEqual({
				customManagers: [],
				gitIgnoredAuthors: [],
				ignoreDeps,
				packageRules: [],
			});
		});

		it("merges data with the highest precedence last when multiple files exist", () => {
			const packageRules = [
				{ enabled: false, matchDepNames: ["node"] },
				{ automerge: false, matchDepNames: ["typescript"] },
				{ automerge: false, matchDepNames: ["eslint"] },
			];

			const actual = testIntake(blockRenovate, {
				files: {
					".github": {
						"renovate.json": [
							JSON.stringify({
								ignoreDeps: ["codecov/codecov-action"],
								packageRules: packageRules.slice(0, 2),
							}),
						],
					},
					"renovate.json": [
						JSON.stringify({
							ignoreDeps: ["all-contributors-cli", "codecov/codecov-action"],
							packageRules: packageRules.slice(1),
						}),
					],
				},
			});

			expect(actual).toEqual({
				customManagers: [],
				gitIgnoredAuthors: [],
				ignoreDeps: ["codecov/codecov-action", "all-contributors-cli"],
				packageRules,
			});
		});
	});
});
