import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockSlopIssueUnlink } from "./blockSlopIssueUnlink.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockSlopIssueUnlink, () => {
	test("without addons", () => {
		const creation = testBlock(blockSlopIssueUnlink, {
			options: optionsBase,
		});

		expect(creation).toEqual({});
	});

	test("with labels", () => {
		const creation = testBlock(blockSlopIssueUnlink, {
			addons: {
				labels: ["spam: b", "spam: a"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "uses": "JoshuaKGoldberg/slop-issue-unlink-action@v0.3.0",
			            "with": {
			              "labels": "agentscan:automated-account
			agentscan:community-flagged
			agentscan:mixed-signals",
			            },
			          },
			        ],
			      },
			      "block": "[Block AgentScan]",
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "uses": "JoshuaKGoldberg/slop-issue-unlink-action@v0.3.0",
			            "with": {
			              "labels": "suspected ai slop",
			            },
			          },
			        ],
			      },
			      "block": "[Block Anti-Slop]",
			    },
			    {
			      "addons": {
			        "rules": {
			          "dangerous-triggers": {
			            "ignore": [
			              "slop-issue-unlink.yaml",
			            ],
			          },
			        },
			      },
			      "block": "[Block zizmor]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "slop-issue-unlink.yaml": "jobs:
			  slop_issue_unlink:
			    if: \${{ !github.event.pull_request.merged }}
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/slop-issue-unlink-action@v0.3.0
			        with:
			          labels: |-
			            spam: a
			            spam: b

			name: Slop Issue Unlink

			on:
			  pull_request_target:
			    types:
			      - closed
			      - labeled
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with the action's default labels", () => {
		const creation = testBlock(blockSlopIssueUnlink, {
			addons: {
				labels: [
					"suspected ai slop",
					"agentscan:automated-account",
					"agentscan:community-flagged",
					"agentscan:mixed-signals",
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "uses": "JoshuaKGoldberg/slop-issue-unlink-action@v0.3.0",
			            "with": {
			              "labels": "agentscan:automated-account
			agentscan:community-flagged
			agentscan:mixed-signals",
			            },
			          },
			        ],
			      },
			      "block": "[Block AgentScan]",
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "uses": "JoshuaKGoldberg/slop-issue-unlink-action@v0.3.0",
			            "with": {
			              "labels": "suspected ai slop",
			            },
			          },
			        ],
			      },
			      "block": "[Block Anti-Slop]",
			    },
			    {
			      "addons": {
			        "rules": {
			          "dangerous-triggers": {
			            "ignore": [
			              "slop-issue-unlink.yaml",
			            ],
			          },
			        },
			      },
			      "block": "[Block zizmor]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "slop-issue-unlink.yaml": "jobs:
			  slop_issue_unlink:
			    if: \${{ !github.event.pull_request.merged }}
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/slop-issue-unlink-action@v0.3.0

			name: Slop Issue Unlink

			on:
			  pull_request_target:
			    types:
			      - closed
			      - labeled
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with options.workflowsVersions", () => {
		const creation = testBlock(blockSlopIssueUnlink, {
			addons: {
				labels: ["spam"],
			},
			options: {
				...optionsBase,
				workflowsVersions: {
					"JoshuaKGoldberg/slop-issue-unlink-action": {
						"v9.9.9": {
							hash: "abc123",
						},
					},
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "uses": "JoshuaKGoldberg/slop-issue-unlink-action@abc123 # v9.9.9",
			            "with": {
			              "labels": "agentscan:automated-account
			agentscan:community-flagged
			agentscan:mixed-signals",
			            },
			          },
			        ],
			      },
			      "block": "[Block AgentScan]",
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "uses": "JoshuaKGoldberg/slop-issue-unlink-action@abc123 # v9.9.9",
			            "with": {
			              "labels": "suspected ai slop",
			            },
			          },
			        ],
			      },
			      "block": "[Block Anti-Slop]",
			    },
			    {
			      "addons": {
			        "rules": {
			          "dangerous-triggers": {
			            "ignore": [
			              "slop-issue-unlink.yaml",
			            ],
			          },
			        },
			      },
			      "block": "[Block zizmor]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "slop-issue-unlink.yaml": "jobs:
			  slop_issue_unlink:
			    if: \${{ !github.event.pull_request.merged }}
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: JoshuaKGoldberg/slop-issue-unlink-action@abc123 # v9.9.9
			        with:
			          labels: spam

			name: Slop Issue Unlink

			on:
			  pull_request_target:
			    types:
			      - closed
			      - labeled
			",
			      },
			    },
			  },
			}
		`);
	});
});
