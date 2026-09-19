import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { optionsBase } from "./options.fakes.js";

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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": "description: Prepares the repo for a typical CI job

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
			        },
			      },
			      "workflows": {
			        "ci.yaml": undefined,
			        "pr-review-requested.yaml": "jobs:
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
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "files": [
			          ".circleci",
			          ".github/actions/prepare/action.yml",
			          ".github/workflows/ci.yml",
			          ".github/workflows/pr-review-requested.yml",
			          "travis.{yaml,yml}",
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": "description: Prepares the repo for a typical CI job

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
			        },
			      },
			      "workflows": {
			        "ci.yaml": undefined,
			        "pr-review-requested.yaml": "jobs:
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
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "actions": {
			        "prepare": {
			          "action.yaml": "description: Prepares the repo for a typical CI job

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
			        },
			      },
			      "workflows": {
			        "ci.yaml": "jobs:
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
			        "pr-review-requested.yaml": "jobs:
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
			      },
			    },
			  },
			}
		`);
	});
});
