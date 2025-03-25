import { base } from "../base.js";
import { packageData } from "../data/packageData.js";
import { resolveUses } from "./actions/resolveUses.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.js";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.js";
import { formatYamlAction } from "./files/formatYamlAction.js";

export const blockCTATransitions = base.createBlock({
	about: {
		name: "CTA Transitions",
	},
	produce({ options }) {
		return {
			addons: [
				blockPackageJson({
					properties: {
						devDependencies: {
							"create-typescript-app": packageData.version,
						},
					},
				}),
				blockRepositoryBranchRuleset({
					requiredStatusChecks: ["Transition"],
				}),
			],
			files: {
				".github": {
					actions: {
						transition: {
							"action.yml": formatYamlAction({
								description: "Runs create-typescript-app in transition mode",
								name: "Transition",
								runs: {
									steps: [
										{ uses: "./.github/actions/prepare" },
										{
											run: "npx create-typescript-app",
											shell: "bash",
										},
										{
											id: "auto-commit-action",
											uses: "stefanzweifel/git-auto-commit-action@v5",
											with: {
												commit_author:
													"The Friendly Bingo Bot <bot@create.bingo>",
												commit_message:
													"Check in changes from re-running npx create-typescript-app",
												commit_user_email: "bot@create.bingo",
												commit_user_name: "The Friendly Bingo Bot",
											},
										},
										{
											if: "steps.auto-commit-action.outputs.changes_detected == 'true'",
											uses: "mshick/add-pr-comment@v2",
											with: {
												issue: "${{ github.event.pull_request.number }}",
												message: [
													"🤖 Beep boop! I ran `npx create-typescript-app` and it updated some files.",
													"I went ahead and checked those changes into this PR for you. Please review the latest commit to see if you want to merge it.",
													"Cheers!",
													" — _The Friendly Bingo Bot_ 💝",
													"",
													"> ℹ️ These automatic commits keep your repository up-to-date with new versions of [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app). If you want to opt out, delete your `.github/workflows/cta-transitions.yml` file.",
												].join("\n"),
											},
										},
									],
									using: "composite",
								},
							}),
						},
					},
					workflows: {
						"cta.yml": createSoloWorkflowFile({
							jobName: "Transition",
							name: "CTA",
							on: {
								pull_request: {
									branches: ["main"],
								},
							},
							permissions: {
								"pull-requests": "write",
							},
							steps: [
								{
									uses: resolveUses(
										"actions/checkout",
										"v4",
										options.workflowsVersions,
									),
									with: {
										"fetch-depth": 0,
										ref: "${{github.event.pull_request.head.ref}}",
										repository:
											"${{github.event.pull_request.head.repo.full_name}}",
										token: "${{ secrets.ACCESS_TOKEN }}",
									},
								},
								{
									id: "check",
									if: `(github.actor == '${options.owner}' || github.actor == 'renovate[bot]') && startsWith(github.head_ref, 'renovate/') && contains(github.event.pull_request.title, 'create-typescript-app')`,
									uses: "./.github/actions/transition",
								},
								{
									if: "steps.check.outcome == 'skipped'",
									run: "echo 'Skipping transition mode because the PR does not appear to be an automated or owner-created update to create-typescript-app.'",
								},
							],
						}),
					},
				},
			},
		};
	},
});
