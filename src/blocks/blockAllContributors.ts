import _ from "lodash";

import { base } from "../base.js";
import { startingOwnerContributions } from "../data/contributions.js";
import { Contributor } from "../schemas.js";
import { resolveUses } from "./actions/resolveUses.js";
import { blockPrettier } from "./blockPrettier.js";
import { blockREADME } from "./blockREADME.js";
import { blockRepositorySecrets } from "./blockRepositorySecrets.js";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.js";
import { CommandPhase } from "./phases.js";

export const blockAllContributors = base.createBlock({
	about: {
		name: "AllContributors",
	},
	produce({ options }) {
		const contributions = options.contributors?.length;
		const ownerContributions = Array.from(
			new Set(
				[
					options.contributors?.find(
						(contributor) =>
							contributor.login.toLowerCase() === options.owner.toLowerCase(),
					)?.contributions,
					startingOwnerContributions,
				]
					.filter(Boolean)
					.flat(),
			),
		);

		return {
			addons: [
				blockPrettier({
					ignores: ["/.all-contributorsrc"],
				}),
				blockREADME({
					badges: [
						{
							alt: `👪 All Contributors: ${contributions}`,
							comments: {
								after: `
<!-- ALL-CONTRIBUTORS-BADGE:END -->
\t<!-- prettier-ignore-end -->`,
								before: `<!-- prettier-ignore-start -->
\t<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
\t`,
							},
							href: "#contributors",
							src: `https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-${contributions}-21bb42.svg`,
						},
					],
					sections: options.contributors
						? [printAllContributorsTable(options.contributors)]
						: undefined,
				}),
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
				".all-contributorsrc": JSON.stringify(
					{
						badgeTemplate:
							'	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg" /></a>',
						commitType: "docs",
						contributors: options.contributors ?? [],
						contributorsPerLine: 7,
						contributorsSortAlphabetically: true,
						files: ["README.md"],
						projectName: options.repository,
						projectOwner: options.owner,
						repoType: "github",
					},
					null,
					2,
				),
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
								{
									uses: resolveUses(
										"actions/checkout",
										"v4",
										options.workflowsVersions,
									),
									with: { "fetch-depth": 0 },
								},
								{ uses: "./.github/actions/prepare" },
								{
									env: { GITHUB_TOKEN: "${{ secrets.ACCESS_TOKEN }}" },
									uses: resolveUses(
										"JoshuaKGoldberg/all-contributors-auto-action",
										"v0.5.0",
										options.workflowsVersions,
									),
								},
							],
						}),
					},
				},
			},
			scripts: [
				{
					commands: [
						`pnpx all-contributors-cli@6.23.1 add ${options.owner} ${ownerContributions.join(",")}`,
					],
					phase: CommandPhase.Process,
				},
			],
		};
	},
});

function printAllContributorsTable(contributors: Contributor[]) {
	return [
		`## Contributors`,
		``,
		`<!-- spellchecker: disable -->`,
		`<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->`,
		`<!-- prettier-ignore-start -->`,
		`<!-- markdownlint-disable -->`,
		`<table>`,
		`  <tbody>`,
		`    <tr>`,
		// This intentionally uses the same sort as all-contributors-cli:
		// https://github.com/all-contributors/cli/blob/74bc388bd6f0ae2658e6495e9d3781d737438a97/src/generate/index.js#L76
		..._.sortBy(contributors, "name").flatMap((contributor, i) => {
			const row = printContributorCell(contributor);

			return i && i % 7 === 0 ? [`    </tr>`, `    <tr>`, row] : [row];
		}),
		`    </tr>`,
		`  </tbody>`,
		`</table>`,
		``,
		`<!-- markdownlint-restore -->`,
		`<!-- prettier-ignore-end -->`,
		``,
		`<!-- ALL-CONTRIBUTORS-LIST:END -->`,
		`<!-- spellchecker: enable -->`,
	].join("\n");
}

function printContributorCell(contributor: Contributor) {
	return [
		`      <td align="center" valign="top" width="14.28%">`,
		`<a href="${contributor.profile}">`,
		`<img src="${contributor.avatar_url}?s=100" width="100px;" alt="${contributor.name}"/>`,
		`<br />`,
		`<sub><b>${contributor.name}</b></sub></a><br />`,
		contributor.contributions
			.map((contribution) => {
				switch (contribution) {
					case "bug":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3A${contributor.login}" title="Bug reports">🐛</a>`;
					case "code":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=${contributor.login}" title="Code">💻</a>`;
					case "design":
						return `<a href="#design-${contributor.login}" title="Design">🎨</a>`;
					case "doc":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=${contributor.login}" title="Documentation">📖</a>`;
					case "ideas":
						return `<a href="#ideas-${contributor.login}" title="Ideas, Planning, & Feedback">🤔</a>`;
					case "infra":
						return `<a href="#infra-${contributor.login}" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a>`;
					case "maintenance":
						return `<a href="#maintenance-${contributor.login}" title="Maintenance">🚧</a>`;
					case "review":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/pulls?q=is%3Apr+reviewed-by%3A${contributor.login}" title="Reviewed Pull Requests">👀</a>`;
					case "test":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=${contributor.login}" title="Tests">⚠️</a>`;
					case "tool":
						return `<a href="#tool-${contributor.login}" title="Tools">🔧</a>`;
				}
			})
			.join(" "),
		`</td>`,
	].join("");
}
