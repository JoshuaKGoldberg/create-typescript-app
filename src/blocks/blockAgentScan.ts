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
