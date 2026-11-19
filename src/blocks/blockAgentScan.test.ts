import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockAgentScan } from "./blockAgentScan.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockAgentScan", () => {
	test("without options.workflowsVersions", () => {
		const creation = testBlock(blockAgentScan, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "agentscan",
			          "MatteoGabriele",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "labels": [
			          "agentscan:automated-account",
			          "agentscan:community-flagged",
			          "agentscan:mixed-signals",
			        ],
			      },
			      "block": "[Block Slop Unlink Issues]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "agentscan.yaml": "jobs:
			  agentscan:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      contents: read
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: MatteoGabriele/agentscan-action@v2.8.0
			        with:
			          auto-close: true
			          github-token: \${{ secrets.GITHUB_TOKEN }}
			          scan-issues: true
			          trusted-author-associations: collaborator,member,owner

			name: AgentScan

			on:
			  issues:
			    types:
			      - opened
			  pull_request_target:
			    types:
			      - opened
			      - reopened
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with options.workflowsVersions", () => {
		const creation = testBlock(blockAgentScan, {
			options: {
				...optionsBase,
				workflowsVersions: {
					"MatteoGabriele/agentscan-action": {
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
			        "words": [
			          "agentscan",
			          "MatteoGabriele",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "labels": [
			          "agentscan:automated-account",
			          "agentscan:community-flagged",
			          "agentscan:mixed-signals",
			        ],
			      },
			      "block": "[Block Slop Unlink Issues]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "agentscan.yaml": "jobs:
			  agentscan:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    permissions:
			      contents: read
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: MatteoGabriele/agentscan-action@abc123 # v9.9.9
			        with:
			          auto-close: true
			          github-token: \${{ secrets.GITHUB_TOKEN }}
			          scan-issues: true
			          trusted-author-associations: collaborator,member,owner

			name: AgentScan

			on:
			  issues:
			    types:
			      - opened
			  pull_request_target:
			    types:
			      - opened
			      - reopened
			",
			      },
			    },
			  },
			}
		`);
	});
});
