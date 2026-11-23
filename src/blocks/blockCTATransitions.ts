import { base } from "../base.ts";
import { packageData } from "../data/packageData.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.ts";
import { blockRepositorySecrets } from "./blockRepositorySecrets.ts";
import { blockZizmor } from "./blockZizmor.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { withPreviously } from "./files/withPreviously.ts";

export const blockCTATransitions = base.createBlock({
	about: {
		name: "CTA Transitions",
	},
	produce({ options }) {
		return {
			extensions: [
				blockCSpell({
					words: ["mshick", options.owner, "stefanzweifel"],
				}),
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
				blockRepositorySecrets({
					secrets: [
						{
							description: "a GitHub PAT with repo and workflow permissions",
							name: "ACCESS_TOKEN",
						},
					],
				}),
				blockZizmor({
					rules: {
						"bot-conditions": { ignore: ["cta.yaml"] },
					},
				}),
			],
			files: {
				".github": {
					actions: {
						transition: {
							"action.yaml": withPreviously(
								formatYaml({
									description: "Runs create-typescript-app in transition mode",
									inputs: {
										token: {
											description:
												"GitHub personal access token with repo, workflow, and read:org permissions.",
											required: true,
										},
									},
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
												uses: resolveUses(
													"stefanzweifel/git-auto-commit-action",
													"v7",
													options.workflowsVersions,
													"d0b01107b5db882071f96de5dd4b54961ea93f4c",
												),
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
												uses: resolveUses(
													"mshick/add-pr-comment",
													"v3",
													options.workflowsVersions,
													"ec328af66588ab8f77cdeb2c264f14aba45bbf59",
												),
												with: {
													issue: "${{ github.event.pull_request.number }}",
													message: [
														"🤖 Beep boop! I ran `npx create-typescript-app` and it updated some files.",
														"",
														"I went ahead and checked those changes into this PR for you. Please review the latest commit to see if you want to merge it.",
														"",
														"Cheers!",
														" — _The Friendly Bingo Bot_ 💝",
														"",
														"> ℹ️ These automatic commits keep your repository up-to-date with new versions of [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app). If you want to opt out, delete your `.github/workflows/cta.yaml` file.",
													].join("\n"),
												},
											},
											{
												id: "package-change",
												uses: resolveUses(
													"JoshuaKGoldberg/package-change-detector-action",
													"v0.0.1",
													options.workflowsVersions,
													"6acfdff89acb0ece6a8550f92d8f37ea888e1288",
												),
												with: {
													properties: "engines",
												},
											},
											{
												if: `steps.package-change.outputs.changed == 'true'`,
												uses: resolveUses(
													"JoshuaKGoldberg/draft-pull-request-once-action",
													"0.1.0",
													options.workflowsVersions,
													"bedb63df0d09d762e9d5b5b1839c8704a6526fcc",
												),
												with: {
													"github-token": "${{ inputs.token }}",
													message: [
														"🤖 Beep boop! This PR changes the `engines` field in `package.json`. That might be a breaking change. It's been set to a draft so that it doesn't automatically merge. Go ahead and un-draft the PR if the change is ready for release.",
														"",
														"Cheers!",
														" — _The Friendly Bingo Bot_ 💝",
													].join("\n"),
												},
											},
										],
										using: "composite",
									},
								}),
								["action.yml"],
							),
						},
					},
					workflows: {
						"cta.yaml": withPreviously(
							createSoloWorkflowFile({
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
										id: "checkout",
										if: `(github.actor == '${options.owner}' || github.actor == 'renovate[bot]') && startsWith(github.head_ref, 'renovate/') && contains(github.event.pull_request.title, 'create-typescript-app')`,
										uses: resolveUses(
											"actions/checkout",
											"v7",
											options.workflowsVersions,
											"3d3c42e5aac5ba805825da76410c181273ba90b1",
										),
										with: {
											"fetch-depth": 0,
											"persist-credentials": true,
											ref: "${{github.event.pull_request.head.ref}}",
											repository:
												"${{github.event.pull_request.head.repo.full_name}}",
											token: "${{ secrets.ACCESS_TOKEN }}",
										},
									},
									{
										if: "steps.checkout.outcome != 'skipped'",
										uses: "./.github/actions/transition",
										with: {
											token: "${{ secrets.ACCESS_TOKEN }}",
										},
									},
									{
										if: "steps.checkout.outcome == 'skipped'",
										run: "echo 'Skipping transition mode because the PR does not appear to be an automated or owner-created update to create-typescript-app.'",
									},
								],
							}),
							["cta.yml"],
						),
					},
				},
			},
		};
	},
});
