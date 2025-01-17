import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { optionsBase } from "./options.fakes.js";

describe("blockGitHubActionsCI", () => {
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
			          "action.yml": "description: Prepares the repo for a typical CI job

			name: Prepare

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			      with:
			        version: 9
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: '20'
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
			        "accessibility-alt-text-bot.yml": "jobs:
			  accessibility_alt_text_bot:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: github/accessibility-alt-text-bot@v1.4.0

			name: Accessibility Alt Text Bot

			on:
			  issue_comment:
			    types:
			      - created
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request:
			    types:
			      - edited
			      - opened

			permissions:
			  issues: write
			  pull-requests: write
			",
			        "ci.yml": undefined,
			        "pr-review-requested.yml": "jobs:
			  pr_review_requested:
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

			permissions:
			  pull-requests: write
			",
			      },
			    },
			  },
			}
		`);
	});

	test("migration mode", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			mode: "migrate",
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
			          "action.yml": "description: Prepares the repo for a typical CI job

			name: Prepare

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			      with:
			        version: 9
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: '20'
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
			        "accessibility-alt-text-bot.yml": "jobs:
			  accessibility_alt_text_bot:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: github/accessibility-alt-text-bot@v1.4.0

			name: Accessibility Alt Text Bot

			on:
			  issue_comment:
			    types:
			      - created
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request:
			    types:
			      - edited
			      - opened

			permissions:
			  issues: write
			  pull-requests: write
			",
			        "ci.yml": undefined,
			        "pr-review-requested.yml": "jobs:
			  pr_review_requested:
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

			permissions:
			  pull-requests: write
			",
			      },
			    },
			  },
			  "scripts": [
			    {
			      "commands": [
			        "rm -rf .circleci travis.yml",
			      ],
			      "phase": 0,
			      "silent": true,
			    },
			  ],
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
			          "action.yml": "description: Prepares the repo for a typical CI job

			name: Prepare

			runs:
			  steps:
			    - uses: pnpm/action-setup@v4
			      with:
			        version: 9
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: '20'
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
			        "accessibility-alt-text-bot.yml": "jobs:
			  accessibility_alt_text_bot:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: github/accessibility-alt-text-bot@v1.4.0

			name: Accessibility Alt Text Bot

			on:
			  issue_comment:
			    types:
			      - created
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request:
			    types:
			      - edited
			      - opened

			permissions:
			  issues: write
			  pull-requests: write
			",
			        "ci.yml": "jobs:
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
			        "pr-review-requested.yml": "jobs:
			  pr_review_requested:
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

			permissions:
			  pull-requests: write
			",
			      },
			    },
			  },
			}
		`);
	});
});
