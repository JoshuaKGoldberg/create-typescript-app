import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockZizmor } from "./blockZizmor.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockZizmor, () => {
	test("without addons", () => {
		const creation = testBlock(blockZizmor, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "zizmor",
			          "zizmorcore",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint GitHub Actions",
			            "steps": [
			              {
			                "uses": "zizmorcore/zizmor-action@v0.6.4",
			                "with": {
			                  "advanced-security": "false",
			                  "annotations": "true",
			                },
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "zizmor.yaml": [
			        "rules:
			  dangerous-triggers:
			    ignore:
			      - pr-review-labels.yaml
			  ref-version-mismatch:
			    disable: true
			  self-repository:
			    disable: true
			  unpinned-uses:
			    config:
			      policies:
			        '*': ref-pin
			",
			        {
			          "previously": [
			            "zizmor.yml",
			          ],
			        },
			      ],
			    },
			  },
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockZizmor, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "zizmor",
			          "zizmorcore",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint GitHub Actions",
			            "steps": [
			              {
			                "uses": "zizmorcore/zizmor-action@v0.6.4",
			                "with": {
			                  "advanced-security": "false",
			                  "annotations": "true",
			                },
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "files": [
			          "zizmor.{yaml,yml}",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "zizmor.yaml": [
			        "rules:
			  dangerous-triggers:
			    ignore:
			      - pr-review-labels.yaml
			  ref-version-mismatch:
			    disable: true
			  self-repository:
			    disable: true
			  unpinned-uses:
			    config:
			      policies:
			        '*': ref-pin
			",
			        {
			          "previously": [
			            "zizmor.yml",
			          ],
			        },
			      ],
			    },
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockZizmor, {
			addons: {
				rules: {
					"dangerous-triggers": {
						ignore: ["pr-review-labels.yaml", "octoguide.yaml"],
					},
					"ref-version-mismatch": { disable: false },
					"self-repository": { disable: false },
					"template-injection": {
						ignore: ["deploy.yaml"],
						remap: { severity: "high" },
					},
					"unpinned-uses": {
						config: { policies: { "*": "hash-pin" } },
						ignore: ["deploy.yaml"],
					},
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "zizmor",
			          "zizmorcore",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Lint GitHub Actions",
			            "steps": [
			              {
			                "uses": "zizmorcore/zizmor-action@v0.6.4",
			                "with": {
			                  "advanced-security": "false",
			                  "annotations": "true",
			                },
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "zizmor.yaml": [
			        "rules:
			  dangerous-triggers:
			    ignore:
			      - octoguide.yaml
			      - pr-review-labels.yaml
			  ref-version-mismatch:
			    disable: false
			  self-repository:
			    disable: false
			  template-injection:
			    ignore:
			      - deploy.yaml
			    remap:
			      severity: high
			  unpinned-uses:
			    config:
			      policies:
			        '*': hash-pin
			    ignore:
			      - deploy.yaml
			",
			        {
			          "previously": [
			            "zizmor.yml",
			          ],
			        },
			      ],
			    },
			  },
			}
		`);
	});

	test("with a hash-pinned zizmor-action in workflowsVersions", () => {
		const creation = testBlock(blockZizmor, {
			options: {
				...optionsBase,
				workflowsVersions: {
					"zizmorcore/zizmor-action": {
						"v0.6.4": {
							hash: "cc914d7f3750a2d13d75c7f184a1060aa0e9d482",
						},
					},
				},
			},
		});

		expect(creation.addons).toContainEqual(
			expect.objectContaining({
				addons: {
					jobs: [
						expect.objectContaining({
							steps: [
								expect.objectContaining({
									uses: "zizmorcore/zizmor-action@cc914d7f3750a2d13d75c7f184a1060aa0e9d482 # v0.6.4",
								}),
							],
						}),
					],
				},
			}),
		);
	});

	describe("intake", () => {
		it("returns undefined when zizmor.yaml does not exist", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					".github": {},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when zizmor.yaml is not valid YAML", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					".github": {
						"zizmor.yaml": ["rules: ["],
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when zizmor.yaml does not contain rules", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					".github": {
						"zizmor.yaml": [dump({ other: true })],
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when zizmor.yaml does not contain any valid rules", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					".github": {
						"zizmor.yaml": [dump({ rules: { "template-injection": null } })],
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns valid rules when .github/zizmor.yml contains rules", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					".github": {
						"zizmor.yml": [
							dump({
								rules: {
									"dangerous-triggers": null,
									"forbidden-uses": {
										config: { deny: ["example/*"] },
									},
									"template-injection": { ignore: ["deploy.yaml"] },
									"unpinned-uses": {
										config: { policies: { "*": "hash-pin" } },
									},
									"use-trusted-publishing": { disable: true },
								},
							}),
						],
					},
				},
			});

			expect(actual).toEqual({
				rules: {
					"forbidden-uses": {
						config: { deny: ["example/*"] },
					},
					"template-injection": { ignore: ["deploy.yaml"] },
					"unpinned-uses": {
						config: { policies: { "*": "hash-pin" } },
					},
					"use-trusted-publishing": { disable: true },
				},
			});
		});

		it("keeps unknown rule properties such as remap", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					".github": {
						"zizmor.yaml": [
							dump({
								rules: {
									"template-injection": { remap: { severity: "high" } },
								},
							}),
						],
					},
				},
			});

			expect(actual).toEqual({
				rules: {
					"template-injection": { remap: { severity: "high" } },
				},
			});
		});

		it("returns rules that produce the same zizmor.yaml when given its own produced zizmor.yaml", () => {
			const produced = testBlock(blockZizmor, {
				options: optionsBase,
			}).files as { ".github": { "zizmor.yaml": [string] } };

			const actual = testIntake(blockZizmor, {
				files: {
					".github": {
						"zizmor.yaml": [produced[".github"]["zizmor.yaml"][0]],
					},
				},
			});

			expect(
				testBlock(blockZizmor, {
					addons: actual,
					options: optionsBase,
				}).files,
			).toEqual(produced);
		});

		it("returns rules when a root zizmor.yaml contains rules", () => {
			const actual = testIntake(blockZizmor, {
				files: {
					"zizmor.yaml": [
						dump({
							rules: {
								"template-injection": { ignore: ["deploy.yaml"] },
							},
						}),
					],
				},
			});

			expect(actual).toEqual({
				rules: {
					"template-injection": { ignore: ["deploy.yaml"] },
				},
			});
		});
	});
});
