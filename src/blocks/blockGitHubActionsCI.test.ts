import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockGitHubActionsCI, () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "requiredStatusChecks": undefined,
			      },
			      "block": "[Block Repository Branch Ruleset]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": [
			            "description: Prepares the repo for a typical CI job

			name: Setup

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: lts/*
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			            {
			              "previously": [
			                "action.yml",
			              ],
			            },
			          ],
			        },
			      },
			      "workflows": {
			        "ci.yaml": undefined,
			        "pr-review-labels.yaml": [
			          "jobs:
			  pr_review_labels:
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Labels

			on:
			  pull_request_target:
			    types:
			      - review_requested
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			          {
			            "previously": [
			              "pr-review-requested.yaml",
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Submitted

			on:
			  pull_request_review:
			    types:
			      - submitted
			",
			      },
			    },
			  },
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "requiredStatusChecks": undefined,
			      },
			      "block": "[Block Repository Branch Ruleset]",
			    },
			    {
			      "addons": {
			        "files": [
			          ".circleci",
			          ".github/workflows/ci.yml",
			          "travis.{yaml,yml}",
			        ],
			      },
			      "block": "[Block Remove Files]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": [
			            "description: Prepares the repo for a typical CI job

			name: Setup

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: lts/*
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			            {
			              "previously": [
			                "action.yml",
			              ],
			            },
			          ],
			        },
			      },
			      "workflows": {
			        "ci.yaml": undefined,
			        "pr-review-labels.yaml": [
			          "jobs:
			  pr_review_labels:
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Labels

			on:
			  pull_request_target:
			    types:
			      - review_requested
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			          {
			            "previously": [
			              "pr-review-requested.yaml",
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Submitted

			on:
			  pull_request_review:
			    types:
			      - submitted
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			addons: {
				jobs: [
					{
						name: "Validate",
						steps: [
							{
								env: { VAR_ENV: "true" },
								if: "always()",
								run: "pnpm validate",
								with: { VAR_WITH: "true" },
							},
						],
					},
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "requiredStatusChecks": [
			          "Engines Check",
			          "Validate",
			        ],
			      },
			      "block": "[Block Repository Branch Ruleset]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": [
			            "description: Prepares the repo for a typical CI job

			name: Setup

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: lts/*
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			            {
			              "previously": [
			                "action.yml",
			              ],
			            },
			          ],
			        },
			      },
			      "workflows": {
			        "ci.yaml": [
			          "jobs:
			  engines_check:
			    name: Engines Check
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - uses: actions/setup-node@v4
			        with:
			          cache: pnpm
			          node-version: 20.12.0
			      - run: pnpm install --prod --engine-strict --ignore-scripts

			  validate:
			    name: Validate
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - env:
			          VAR_ENV: 'true'
			        if: always()
			        run: pnpm validate
			        with:
			          VAR_WITH: 'true'

			name: CI

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			          {
			            "previously": [
			              "ci.yml",
			            ],
			          },
			        ],
			        "pr-review-labels.yaml": [
			          "jobs:
			  pr_review_labels:
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Labels

			on:
			  pull_request_target:
			    types:
			      - review_requested
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			          {
			            "previously": [
			              "pr-review-requested.yaml",
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Submitted

			on:
			  pull_request_review:
			    types:
			      - submitted
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with job permissions", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			addons: {
				jobs: [
					{
						checkoutWith: { "fetch-depth": "0" },
						name: "Action",
						permissions: { contents: "read" },
						steps: [
							{
								uses: "./",
								with: { "github-token": "${{ secrets.GITHUB_TOKEN }}" },
							},
						],
					},
					{
						name: "Build",
						steps: [{ run: "pnpm build" }],
					},
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "requiredStatusChecks": [
			          "Action",
			          "Build",
			          "Engines Check",
			        ],
			      },
			      "block": "[Block Repository Branch Ruleset]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": [
			            "description: Prepares the repo for a typical CI job

			name: Setup

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: lts/*
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			            {
			              "previously": [
			                "action.yml",
			              ],
			            },
			          ],
			        },
			      },
			      "workflows": {
			        "ci.yaml": [
			          "jobs:
			  action:
			    name: Action
			    permissions:
			      contents: read
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			        with:
			          fetch-depth: '0'
			      - uses: ./.github/actions/prepare
			      - uses: ./
			        with:
			          github-token: \${{ secrets.GITHUB_TOKEN }}

			  build:
			    name: Build
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm build

			  engines_check:
			    name: Engines Check
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - uses: actions/setup-node@v4
			        with:
			          cache: pnpm
			          node-version: 20.12.0
			      - run: pnpm install --prod --engine-strict --ignore-scripts

			name: CI

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			          {
			            "previously": [
			              "ci.yml",
			            ],
			          },
			        ],
			        "pr-review-labels.yaml": [
			          "jobs:
			  pr_review_labels:
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Labels

			on:
			  pull_request_target:
			    types:
			      - review_requested
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			          {
			            "previously": [
			              "pr-review-requested.yaml",
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/pr-review-labels-action@v0.1.0

			name: PR Review Submitted

			on:
			  pull_request_review:
			    types:
			      - submitted
			",
			      },
			    },
			  },
			}
		`);
	});
});
