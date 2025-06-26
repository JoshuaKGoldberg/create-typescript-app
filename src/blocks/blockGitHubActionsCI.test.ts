import { testBlock, testIntake } from "bingo-stratum-testers";
import jsYaml from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { optionsBase } from "./options.fakes.js";

describe("blockGitHubActionsCI", () => {
	test("without options.node.pinned", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			options: {
				...optionsBase,
				node: {
					minimum: "20.12.0",
				},
			},
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
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: 20.12.0
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
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

	test("with options.node.pinned", () => {
		const creation = testBlock(blockGitHubActionsCI, {
			options: {
				...optionsBase,
				node: {
					minimum: "20.12.0",
					pinned: "22.12.0",
				},
			},
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
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: 22.12.0
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
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
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: 20.12.0
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
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
			          "travis.yml",
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
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: 20.12.0
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
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
			    - uses: actions/setup-node@v4
			      with:
			        cache: pnpm
			        node-version: 20.12.0
			    - run: pnpm install --frozen-lockfile
			      shell: bash
			  using: composite
			",
			        },
			      },
			      "workflows": {
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

	describe("intake", () => {
		it("returns undefined when action.yml does not exist", () => {
			const actual = testIntake(blockGitHubActionsCI, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when action.yml contains invalid yml", () => {
			const actual = testIntake(blockGitHubActionsCI, {
				files: {
					".github": {
						actions: {
							prepare: {
								"action.yml": ["invalid yml!"],
							},
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when action.yml does not contain a runs entry", () => {
			const actual = testIntake(blockGitHubActionsCI, {
				files: {
					".github": {
						actions: {
							prepare: {
								"action.yml": [
									jsYaml.dump({
										other: {
											steps: [],
										},
									}),
								],
							},
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when action.yml runs steps is not an array", () => {
			const actual = testIntake(blockGitHubActionsCI, {
				files: {
					".github": {
						actions: {
							prepare: {
								"action.yml": [
									jsYaml.dump({
										runs: {
											steps: true,
										},
									}),
								],
							},
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined env when action.yml contains a test action with actions/setup-node step", () => {
			const actual = testIntake(blockGitHubActionsCI, {
				files: {
					".github": {
						actions: {
							prepare: {
								"action.yml": [
									jsYaml.dump({
										runs: {
											steps: [
												{
													uses: "actions/other@v1",
												},
											],
										},
									}),
								],
							},
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined env when action.yml contains a test action with no env in its actions/setup-node step", () => {
			const actual = testIntake(blockGitHubActionsCI, {
				files: {
					".github": {
						actions: {
							prepare: {
								"action.yml": [
									jsYaml.dump({
										runs: {
											steps: [
												{
													uses: "actions/setup-node@v4",
												},
											],
										},
									}),
								],
							},
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns nodeVersion when action.yml contains a test action with node-version in its actions/setup/node step", () => {
			const nodeVersion = "20.10.0";

			const actual = testIntake(blockGitHubActionsCI, {
				files: {
					".github": {
						actions: {
							prepare: {
								"action.yml": [
									jsYaml.dump({
										runs: {
											steps: [
												{
													uses: "actions/setup-node@v4",
													with: {
														"node-version": nodeVersion,
													},
												},
											],
										},
									}),
								],
							},
						},
					},
				},
			});

			expect(actual).toEqual({ nodeVersion });
		});
	});
});
