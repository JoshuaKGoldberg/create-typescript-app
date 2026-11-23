import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockZizmor } from "./blockZizmor.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockZizmor, () => {
	test("without props", () => {
		const creation = testBlock(blockZizmor, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "zizmor",
			          "zizmorcore",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint GitHub Actions",
			            "steps": [
			              {
			                "uses": "zizmorcore/zizmor-action@v0.8.1",
			                "with": {
			                  "advanced-security": "false",
			                  "annotations": "true",
			                },
			              },
			            ],
			          },
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "zizmor.yaml": [
			        "rules:
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
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "zizmor",
			          "zizmorcore",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint GitHub Actions",
			            "steps": [
			              {
			                "uses": "zizmorcore/zizmor-action@v0.8.1",
			                "with": {
			                  "advanced-security": "false",
			                  "annotations": "true",
			                },
			              },
			            ],
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          "zizmor.{yaml,yml}",
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "zizmor.yaml": [
			        "rules:
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

	test("with props", () => {
		const creation = testBlock(blockZizmor, {
			options: optionsBase,
			props: {
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
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "zizmor",
			          "zizmorcore",
			        ],
			      },
			    },
			    {
			      "block": "[Block GitHub Actions CI]",
			      "props": {
			        "jobs": [
			          {
			            "name": "Lint GitHub Actions",
			            "steps": [
			              {
			                "uses": "zizmorcore/zizmor-action@v0.8.1",
			                "with": {
			                  "advanced-security": "false",
			                  "annotations": "true",
			                },
			              },
			            ],
			          },
			        ],
			      },
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

	test("with an older hash-pinned zizmor-action in workflowsVersions", () => {
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

		expect(creation.extensions).toContainEqual(
			expect.objectContaining({
				props: {
					jobs: [
						expect.objectContaining({
							steps: [
								expect.objectContaining({
									uses: "zizmorcore/zizmor-action@45d7276c9ca790aabd705e31ca99c6185c3e76dd # v0.8.1",
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
					options: optionsBase,
					props: actual,
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
