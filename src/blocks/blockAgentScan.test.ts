import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockAgentScan } from "./blockAgentScan.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockAgentScan, () => {
	test("without options.workflowsVersions", () => {
		const creation = testBlock(blockAgentScan, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "agentscan",
			          "MatteoGabriele",
			        ],
			      },
			    },
			    {
			      "block": "[Block Slop Issue Unlink]",
			      "props": {
			        "labels": [
			          "agentscan:automated-account",
			          "agentscan:community-flagged",
			          "agentscan:mixed-signals",
			        ],
			      },
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
			          message-automation: This account's recent GitHub activity looks automated, so this has been closed automatically. If that's a mistake, please comment with more context and a maintainer will take a look.
			          message-community-flagged: This account has been flagged by the community as likely automated. If that's a mistake, please comment with more context and a maintainer will take a look.
			          message-mixed: This account's recent GitHub activity shows some signs of automation. A maintainer will take a look.
			          scan-issues: true
			          trusted-author-associations: collaborator,member,owner

			name: AgentScan

			on:
			  issues:
			    types:
			      - opened
			  pull_request_target: # zizmor: ignore[dangerous-triggers]
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

	test("with actionSteps", () => {
		const creation = testBlock(blockAgentScan, {
			options: optionsBase,
			props: {
				actionSteps: [{ uses: "test/after@v1" }],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "agentscan",
			          "MatteoGabriele",
			        ],
			      },
			    },
			    {
			      "block": "[Block Slop Issue Unlink]",
			      "props": {
			        "labels": [
			          "agentscan:automated-account",
			          "agentscan:community-flagged",
			          "agentscan:mixed-signals",
			        ],
			      },
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
			          message-automation: This account's recent GitHub activity looks automated, so this has been closed automatically. If that's a mistake, please comment with more context and a maintainer will take a look.
			          message-community-flagged: This account has been flagged by the community as likely automated. If that's a mistake, please comment with more context and a maintainer will take a look.
			          message-mixed: This account's recent GitHub activity shows some signs of automation. A maintainer will take a look.
			          scan-issues: true
			          trusted-author-associations: collaborator,member,owner
			      - uses: test/after@v1

			name: AgentScan

			on:
			  issues:
			    types:
			      - opened
			  pull_request_target: # zizmor: ignore[dangerous-triggers]
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
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "agentscan",
			          "MatteoGabriele",
			        ],
			      },
			    },
			    {
			      "block": "[Block Slop Issue Unlink]",
			      "props": {
			        "labels": [
			          "agentscan:automated-account",
			          "agentscan:community-flagged",
			          "agentscan:mixed-signals",
			        ],
			      },
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
			          message-automation: This account's recent GitHub activity looks automated, so this has been closed automatically. If that's a mistake, please comment with more context and a maintainer will take a look.
			          message-community-flagged: This account has been flagged by the community as likely automated. If that's a mistake, please comment with more context and a maintainer will take a look.
			          message-mixed: This account's recent GitHub activity shows some signs of automation. A maintainer will take a look.
			          scan-issues: true
			          trusted-author-associations: collaborator,member,owner

			name: AgentScan

			on:
			  issues:
			    types:
			      - opened
			  pull_request_target: # zizmor: ignore[dangerous-triggers]
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
