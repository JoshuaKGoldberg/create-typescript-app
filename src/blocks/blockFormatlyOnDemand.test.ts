import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockFormatlyOnDemand } from "./blockFormatlyOnDemand.js";
import { optionsBase } from "./options.fakes.js";

describe(blockFormatlyOnDemand, () => {
	test("without addons", () => {
		const creation = testBlock(blockFormatlyOnDemand, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "secrets": [
			          {
			            "description": "a GitHub PAT with public_repo permissions, so formatting can be pushed to pull requests from forks",
			            "name": "FORMATLY_ON_DEMAND_TOKEN",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "formatly-on-demand-detect.yaml": "jobs:
			  detect:
			    uses: JoshuaKGoldberg/formatly-on-demand/.github/workflows/detect.yaml@v0
			    with:
			      install: corepack enable && pnpm install --frozen-lockfile
			      node-version: 20.12.0


			name: Formatly on Demand Detect


			on:
			  pull_request: ~
			",
			        "formatly-on-demand-format.yaml": "jobs:
			  format:
			    permissions:
			      issues: write
			      pull-requests: read
			    secrets:
			      push-token: \${{ secrets.FORMATLY_ON_DEMAND_TOKEN }}
			    uses: JoshuaKGoldberg/formatly-on-demand/.github/workflows/format.yaml@v0
			    with:
			      install: corepack enable && pnpm install --frozen-lockfile
			      node-version: 20.12.0


			name: Formatly on Demand Format


			on:
			  issue_comment:
			    types:
			      - created
			",
			        "formatly-on-demand-offer.yaml": "jobs:
			  offer:
			    permissions:
			      actions: read
			      issues: write
			      pull-requests: read
			    uses: JoshuaKGoldberg/formatly-on-demand/.github/workflows/offer.yaml@v0


			name: Formatly on Demand Offer


			on:
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - Formatly on Demand Detect
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockFormatlyOnDemand, {
			addons: {
				install: "npm ci",
				pushTokenSecret: "ACCESS_TOKEN",
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "secrets": [
			          {
			            "description": "a GitHub PAT with public_repo permissions, so formatting can be pushed to pull requests from forks",
			            "name": "ACCESS_TOKEN",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "formatly-on-demand-detect.yaml": "jobs:
			  detect:
			    uses: JoshuaKGoldberg/formatly-on-demand/.github/workflows/detect.yaml@v0
			    with:
			      install: npm ci
			      node-version: 20.12.0


			name: Formatly on Demand Detect


			on:
			  pull_request: ~
			",
			        "formatly-on-demand-format.yaml": "jobs:
			  format:
			    permissions:
			      issues: write
			      pull-requests: read
			    secrets:
			      push-token: \${{ secrets.ACCESS_TOKEN }}
			    uses: JoshuaKGoldberg/formatly-on-demand/.github/workflows/format.yaml@v0
			    with:
			      install: npm ci
			      node-version: 20.12.0


			name: Formatly on Demand Format


			on:
			  issue_comment:
			    types:
			      - created
			",
			        "formatly-on-demand-offer.yaml": "jobs:
			  offer:
			    permissions:
			      actions: read
			      issues: write
			      pull-requests: read
			    uses: JoshuaKGoldberg/formatly-on-demand/.github/workflows/offer.yaml@v0


			name: Formatly on Demand Offer


			on:
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - Formatly on Demand Detect
			",
			      },
			    },
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when the format workflow does not exist", () => {
			const actual = testIntake(blockFormatlyOnDemand, {
				files: {
					".github": {
						workflows: {},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when the format workflow has no format job", () => {
			const actual = testIntake(blockFormatlyOnDemand, {
				files: {
					".github": {
						workflows: {
							"formatly-on-demand-format.yaml": [
								dump({ jobs: { other: { uses: "other/workflow@1" } } }),
							],
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns the install command and push token secret when the format workflow has them", () => {
			const actual = testIntake(blockFormatlyOnDemand, {
				files: {
					".github": {
						workflows: {
							"formatly-on-demand-format.yaml": [
								dump({
									jobs: {
										format: {
											secrets: {
												"push-token": "${{ secrets.ACCESS_TOKEN }}",
											},
											uses: "JoshuaKGoldberg/formatly-on-demand/.github/workflows/format.yaml@v0",
											with: { install: "npm ci" },
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toEqual({
				install: "npm ci",
				pushTokenSecret: "ACCESS_TOKEN",
			});
		});
	});
});
