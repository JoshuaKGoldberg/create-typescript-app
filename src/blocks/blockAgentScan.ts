import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockSlopIssueUnlink } from "./blockSlopIssueUnlink.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

export const blockAgentScan = base.createBlock({
	about: {
		name: "AgentScan",
	},
	produce({ options }) {
		return {
			addons: [
				blockCSpell({
					words: ["agentscan", "MatteoGabriele"],
				}),
				blockSlopIssueUnlink({
					labels: [
						"agentscan:automated-account",
						"agentscan:community-flagged",
						"agentscan:mixed-signals",
					],
				}),
			],
			files: {
				".github": {
					workflows: {
						"agentscan.yaml": createSoloWorkflowFile({
							if: "${{ !endsWith(github.actor, '[bot]') }}",
							name: "AgentScan",
							on: {
								issues: {
									types: ["opened"],
								},
								pull_request_target: {
									types: ["opened", "reopened"],
								},
							},
							permissions: {
								contents: "read",
								issues: "write",
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"MatteoGabriele/agentscan-action",
										"v2.8.0",
										options.workflowsVersions,
									),
									with: {
										"auto-close": true,
										"github-token": "${{ secrets.GITHUB_TOKEN }}",
										"message-automation":
											"This account's recent GitHub activity looks automated, so this has been closed automatically. If that's a mistake, please comment with more context and a maintainer will take a look.",
										"message-community-flagged":
											"This account has been flagged by the community as likely automated. If that's a mistake, please comment with more context and a maintainer will take a look.",
										"message-mixed":
											"This account's recent GitHub activity shows some signs of automation. A maintainer will take a look.",
										"scan-issues": true,
										"trusted-author-associations": "collaborator,member,owner",
									},
								},
							],
						}),
					},
				},
			},
		};
	},
});
