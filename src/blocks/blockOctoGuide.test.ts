import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockOctoGuide } from "./blockOctoGuide.js";
import { optionsBase } from "./options.fakes.js";

describe(blockOctoGuide, () => {
	test("without addons", () => {
		const creation = testBlock(blockOctoGuide, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "workflows": {
			        "octoguide.yaml": "jobs:
			  octoguide:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      discussions: write
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/octoguide@0.11.1
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
			  issue_comment:
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
			  pull_request_target:
			    types:
			      - edited
			      - opened
			",
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
			  "addons": [
			    {
			      "addons": {
			        "files": [
			          ".github/workflows/accessibility-alt-text-bot.{yaml,yml}",
			          ".github/workflows/compliance.{yaml,yml}",
			          ".github/workflows/octoguide.yml",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "octoguide.yaml": "jobs:
			  octoguide:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      discussions: write
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/octoguide@0.11.1
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
			  issue_comment:
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
			  pull_request_target:
			    types:
			      - edited
			      - opened
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockOctoGuide, {
			addons: {
				config: "strict",
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "workflows": {
			        "octoguide.yaml": "jobs:
			  octoguide:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      discussions: write
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/octoguide@0.11.1
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
			  issue_comment:
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
			  pull_request_target:
			    types:
			      - edited
			      - opened
			",
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
