import { createSoloWorkflowFile } from "../../steps/writing/creation/dotGitHub/createSoloWorkflowFile.js";
import { base } from "../base.js";
import { blockRepositorySecrets } from "./blockRepositorySecrets.js";
import { CommandPhase } from "./phases.js";

export const blockAllContributors = base.createBlock({
	about: {
		name: "AllContributors",
	},
	produce({ options }) {
		return {
			addons: [
				blockRepositorySecrets({
					secrets: [
						{
							description: "a GitHub PAT with repo and workflow permissions",
							name: "ACCESS_TOKEN",
						},
					],
				}),
			],
			files: {
				".all-contributorsrc": JSON.stringify({
					badgeTemplate:
						'	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg" /></a>',
					contributors: options.contributors ?? [],
					contributorsSortAlphabetically: true,
					projectName: options.repository,
					projectOwner: options.owner,
				}),
				".github": {
					workflows: {
						"contributors.yml": createSoloWorkflowFile({
							name: "Contributors",
							on: {
								push: {
									branches: ["main"],
								},
							},
							steps: [
								{ uses: "actions/checkout@v4", with: { "fetch-depth": 0 } },
								{ uses: "./.github/actions/prepare" },
								{
									env: { GITHUB_TOKEN: "${{ secrets.ACCESS_TOKEN }}" },
									uses: `JoshuaKGoldberg/all-contributors-auto-action@v0.5.0`,
								},
							],
						}),
					},
				},
			},
			scripts: [
				{
					commands: [
						`pnpx all-contributors-cli generate`,
						`pnpx all-contributors-cli add ${options.owner} code,content,doc,ideas,infra,maintenance,projectManagement,tool`,
					],
					phase: CommandPhase.Process,
				},
			],
		};
	},
});
