import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockOctoGuide } from "./blockOctoGuide.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockOctoGuide, () => {
	test("without props", () => {
		const creation = testBlock(blockOctoGuide, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "octoguide",
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "octoguide.yaml": [
			          "jobs:
			  octoguide:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      discussions: write
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/octoguide@0.33.1
			        with:
			          config: recommended
			          github-token: \${{ secrets.GITHUB_TOKEN }}

			name: OctoGuide

			on:
			  discussion:
			    types:
			      - created
			      - edited
			  discussion_comment:
			    types:
			      - created
			      - deleted
			      - edited
			  issue_comment: # zizmor: ignore[dangerous-triggers]
			    types:
			      - created
			      - deleted
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request_review_comment:
			    types:
			      - created
			      - deleted
			      - edited
			  pull_request_target: # zizmor: ignore[dangerous-triggers]
			    types:
			      - edited
			      - opened
			",
			          {
			            "previously": [
			              "octoguide.yml",
			            ],
			          },
			        ],
			      },
			    },
			  },
			}
		`);
	});

	test("transition mode without files", () => {
		const creation = testBlock(blockOctoGuide, {
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
			          "octoguide",
			        ],
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".github/workflows/accessibility-alt-text-bot.{yaml,yml}",
			          ".github/workflows/compliance.{yaml,yml}",
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "octoguide.yaml": [
			          "jobs:
			  octoguide:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      discussions: write
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/octoguide@0.33.1
			        with:
			          config: recommended
			          github-token: \${{ secrets.GITHUB_TOKEN }}

			name: OctoGuide

			on:
			  discussion:
			    types:
			      - created
			      - edited
			  discussion_comment:
			    types:
			      - created
			      - deleted
			      - edited
			  issue_comment: # zizmor: ignore[dangerous-triggers]
			    types:
			      - created
			      - deleted
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request_review_comment:
			    types:
			      - created
			      - deleted
			      - edited
			  pull_request_target: # zizmor: ignore[dangerous-triggers]
			    types:
			      - edited
			      - opened
			",
			          {
			            "previously": [
			              "octoguide.yml",
			            ],
			          },
			        ],
			      },
			    },
			  },
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockOctoGuide, {
			options: optionsBase,
			props: {
				config: "strict",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "octoguide",
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "octoguide.yaml": [
			          "jobs:
			  octoguide:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      discussions: write
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/octoguide@0.33.1
			        with:
			          config: strict
			          github-token: \${{ secrets.GITHUB_TOKEN }}

			name: OctoGuide

			on:
			  discussion:
			    types:
			      - created
			      - edited
			  discussion_comment:
			    types:
			      - created
			      - deleted
			      - edited
			  issue_comment: # zizmor: ignore[dangerous-triggers]
			    types:
			      - created
			      - deleted
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request_review_comment:
			    types:
			      - created
			      - deleted
			      - edited
			  pull_request_target: # zizmor: ignore[dangerous-triggers]
			    types:
			      - edited
			      - opened
			",
			          {
			            "previously": [
			              "octoguide.yml",
			            ],
			          },
			        ],
			      },
			    },
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when octoguide.yaml does not exist", () => {
			const actual = testIntake(blockOctoGuide, {
				files: {
					".github": {
						workflows: {},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when octoguide.yaml contains an octoguide job with no octoguide step", () => {
			const actual = testIntake(blockOctoGuide, {
				files: {
					".github": {
						workflows: {
							"octoguide.yaml": [
								dump({
									jobs: {
										octoguide: {
											name: "Octoguide",
											steps: [
												{
													uses: "other/workflow@1",
													with: { config: "strict" },
												},
											],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toEqual(undefined);
		});

		it("returns config when octoguide.yaml contains an octoguide job with config in its octoguide step", () => {
			const config = "strict";

			const actual = testIntake(blockOctoGuide, {
				files: {
					".github": {
						workflows: {
							"octoguide.yaml": [
								dump({
									jobs: {
										octoguide: {
											name: "Octoguide",
											steps: [
												{
													uses: "JoshuaKGoldberg/octoguide@1",
													with: { config },
												},
											],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toEqual({ config });
		});
	});
});
