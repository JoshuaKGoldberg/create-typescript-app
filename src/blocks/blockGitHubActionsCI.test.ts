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
			        "pr-review-requested.yaml": [
			          "jobs:
			  pr_review_requested:
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions-ecosystem/action-remove-labels@v1
			        with:
			          labels: 'status: waiting for author'
			      - if: failure()
			        run: |
			          echo "Don't worry if the previous step failed."
			          echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested
			",
			          {
			            "previously": [
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted-label.yaml": "jobs:
			  pr_review_submitted_label:
			    if: github.event.workflow_run.event == 'pull_request_review' && github.event.workflow_run.conclusion == 'success'
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/download-artifact@v8
			        with:
			          github-token: \${{ secrets.GITHUB_TOKEN }}
			          name: pr-number
			          run-id: \${{ github.event.workflow_run.id }}
			      - env:
			          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
			          HEAD_SHA: \${{ github.event.workflow_run.head_sha }}
			        run: |
			          pr_number=$(cat pr-number)
			          if [[ ! "$pr_number" =~ ^[0-9]+$ ]]; then
			            echo "The pr-number artifact does not contain a PR number."
			            exit 1
			          fi
			          if [[ "$(gh api "repos/$GITHUB_REPOSITORY/pulls/$pr_number" --jq .head.sha)" != "$HEAD_SHA" ]]; then
			            echo "PR #$pr_number's head commit is not the reviewed commit, so it is not labeled."
			            exit 0
			          fi
			          gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/labels" --silent -f "labels[]=status: waiting for author"

			name: PR Review Submitted Label

			on:
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    if: github.event.review.state == 'changes_requested'
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          PR_NUMBER: \${{ github.event.pull_request.number }}
			        run: echo "$PR_NUMBER" > pr-number
			      - uses: actions/upload-artifact@v7
			        with:
			          name: pr-number
			          path: pr-number
			          retention-days: 1

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
			        "pr-review-requested.yaml": [
			          "jobs:
			  pr_review_requested:
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions-ecosystem/action-remove-labels@v1
			        with:
			          labels: 'status: waiting for author'
			      - if: failure()
			        run: |
			          echo "Don't worry if the previous step failed."
			          echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested
			",
			          {
			            "previously": [
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted-label.yaml": "jobs:
			  pr_review_submitted_label:
			    if: github.event.workflow_run.event == 'pull_request_review' && github.event.workflow_run.conclusion == 'success'
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/download-artifact@v8
			        with:
			          github-token: \${{ secrets.GITHUB_TOKEN }}
			          name: pr-number
			          run-id: \${{ github.event.workflow_run.id }}
			      - env:
			          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
			          HEAD_SHA: \${{ github.event.workflow_run.head_sha }}
			        run: |
			          pr_number=$(cat pr-number)
			          if [[ ! "$pr_number" =~ ^[0-9]+$ ]]; then
			            echo "The pr-number artifact does not contain a PR number."
			            exit 1
			          fi
			          if [[ "$(gh api "repos/$GITHUB_REPOSITORY/pulls/$pr_number" --jq .head.sha)" != "$HEAD_SHA" ]]; then
			            echo "PR #$pr_number's head commit is not the reviewed commit, so it is not labeled."
			            exit 0
			          fi
			          gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/labels" --silent -f "labels[]=status: waiting for author"

			name: PR Review Submitted Label

			on:
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    if: github.event.review.state == 'changes_requested'
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          PR_NUMBER: \${{ github.event.pull_request.number }}
			        run: echo "$PR_NUMBER" > pr-number
			      - uses: actions/upload-artifact@v7
			        with:
			          name: pr-number
			          path: pr-number
			          retention-days: 1

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
			        "pr-review-requested.yaml": [
			          "jobs:
			  pr_review_requested:
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions-ecosystem/action-remove-labels@v1
			        with:
			          labels: 'status: waiting for author'
			      - if: failure()
			        run: |
			          echo "Don't worry if the previous step failed."
			          echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested
			",
			          {
			            "previously": [
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted-label.yaml": "jobs:
			  pr_review_submitted_label:
			    if: github.event.workflow_run.event == 'pull_request_review' && github.event.workflow_run.conclusion == 'success'
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/download-artifact@v8
			        with:
			          github-token: \${{ secrets.GITHUB_TOKEN }}
			          name: pr-number
			          run-id: \${{ github.event.workflow_run.id }}
			      - env:
			          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
			          HEAD_SHA: \${{ github.event.workflow_run.head_sha }}
			        run: |
			          pr_number=$(cat pr-number)
			          if [[ ! "$pr_number" =~ ^[0-9]+$ ]]; then
			            echo "The pr-number artifact does not contain a PR number."
			            exit 1
			          fi
			          if [[ "$(gh api "repos/$GITHUB_REPOSITORY/pulls/$pr_number" --jq .head.sha)" != "$HEAD_SHA" ]]; then
			            echo "PR #$pr_number's head commit is not the reviewed commit, so it is not labeled."
			            exit 0
			          fi
			          gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/labels" --silent -f "labels[]=status: waiting for author"

			name: PR Review Submitted Label

			on:
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    if: github.event.review.state == 'changes_requested'
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          PR_NUMBER: \${{ github.event.pull_request.number }}
			        run: echo "$PR_NUMBER" > pr-number
			      - uses: actions/upload-artifact@v7
			        with:
			          name: pr-number
			          path: pr-number
			          retention-days: 1

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
			        "pr-review-requested.yaml": [
			          "jobs:
			  pr_review_requested:
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions-ecosystem/action-remove-labels@v1
			        with:
			          labels: 'status: waiting for author'
			      - if: failure()
			        run: |
			          echo "Don't worry if the previous step failed."
			          echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested
			",
			          {
			            "previously": [
			              "pr-review-requested.yml",
			            ],
			          },
			        ],
			        "pr-review-submitted-label.yaml": "jobs:
			  pr_review_submitted_label:
			    if: github.event.workflow_run.event == 'pull_request_review' && github.event.workflow_run.conclusion == 'success'
			    permissions:
			      actions: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/download-artifact@v8
			        with:
			          github-token: \${{ secrets.GITHUB_TOKEN }}
			          name: pr-number
			          run-id: \${{ github.event.workflow_run.id }}
			      - env:
			          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
			          HEAD_SHA: \${{ github.event.workflow_run.head_sha }}
			        run: |
			          pr_number=$(cat pr-number)
			          if [[ ! "$pr_number" =~ ^[0-9]+$ ]]; then
			            echo "The pr-number artifact does not contain a PR number."
			            exit 1
			          fi
			          if [[ "$(gh api "repos/$GITHUB_REPOSITORY/pulls/$pr_number" --jq .head.sha)" != "$HEAD_SHA" ]]; then
			            echo "PR #$pr_number's head commit is not the reviewed commit, so it is not labeled."
			            exit 0
			          fi
			          gh api "repos/$GITHUB_REPOSITORY/issues/$pr_number/labels" --silent -f "labels[]=status: waiting for author"

			name: PR Review Submitted Label

			on:
			  workflow_run:
			    types:
			      - completed
			    workflows:
			      - PR Review Submitted
			",
			        "pr-review-submitted.yaml": "jobs:
			  pr_review_submitted:
			    if: github.event.review.state == 'changes_requested'
			    permissions: {}
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          PR_NUMBER: \${{ github.event.pull_request.number }}
			        run: echo "$PR_NUMBER" > pr-number
			      - uses: actions/upload-artifact@v7
			        with:
			          name: pr-number
			          path: pr-number
			          retention-days: 1

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
