import {
	contributionTypes,
	createContributionLink,
	isContributionTypeName,
} from "all-contributors-types";

import { base } from "../base.ts";
import { startingOwnerContributions } from "../data/contributions.ts";
import { Contributor } from "../schemas.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockContributingDocs } from "./blockContributingDocs.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockPrettier } from "./blockPrettier.ts";
import { blockREADME } from "./blockREADME.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { CommandPhase } from "./phases.ts";

export const blockAllContributors = base.createBlock({
	about: {
		name: "AllContributors",
	},
	produce({ options }) {
		const owner = options.contributors?.find(
			(contributor) =>
				contributor.login.toLowerCase() === options.owner.toLowerCase(),
		);
		const ownerContributions = Array.from(
			new Set([...(owner?.contributions ?? []), ...startingOwnerContributions]),
		);
		const contributors = options.contributors?.map((contributor) =>
			contributor === owner
				? { ...contributor, contributions: ownerContributions }
				: contributor,
		);
		const contributions = contributors?.length;

		return {
			extensions: [
				blockContributingDocs({
					postMergeRecognition: `Once your PR is merged, if you haven't yet been added to the [_Contributors_ table in the README.md](../README.md#contributors) for its [type of contribution](https://allcontributors.org/docs/en/emoji-key "Allcontributors emoji key"), you should be soon.
Please do ping the maintainer who merged your PR if that doesn't happen within 24 hours - it was likely an oversight on our end!`,
				}),
				blockCSpell({
					ignorePaths: [".all-contributorsrc"],
				}),
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
					sections: contributors
						? [
								printAllContributorsTable(contributors, {
									projectName: options.repository,
									projectOwner: options.owner,
								}),
							]
						: undefined,
				}),
			],
			files: {
				".all-contributorsrc":
					JSON.stringify(
						{
							badgeTemplate:
								'	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg" /></a>',
							commitType: "docs",
							contributors: contributors ?? [],
							contributorsPerLine: 7,
							contributorsSortAlphabetically: true,
							files: ["README.md"],
							projectName: options.repository,
							projectOwner: options.owner,
							repoType: "github",
						},
						null,
						2,
					) + "\n",
				".github": {
					workflows: {
						"contributors.yaml": withPreviously(
							createSoloWorkflowFile({
								name: "Contributors",
								on: {
									push: {
										branches: ["main"],
									},
								},
								permissions: {
									actions: "read",
									contents: "read",
									issues: "write",
									"pull-requests": "write",
								},
								steps: [
									{
										env: { GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}" },
										uses: resolveUses(
											"JoshuaKGoldberg/all-contributors-auto-action",
											"v0.7.0",
											options.workflowsVersions,
											"c578423db9b2c14d3cee9c72f6c2aed31c128030",
										),
									},
								],
							}),
							["contributors.yml"],
						),
					},
				},
			},
			scripts: owner
				? undefined
				: [
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

interface ProjectOptions {
	projectName: string;
	projectOwner: string;
}

function printAllContributorsTable(
	contributors: Contributor[],
	project: ProjectOptions,
) {
	return [
		`## Contributors`,
		``,
		`<!-- spellchecker: disable -->`,
		`<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->`,
		`<!-- prettier-ignore-start -->`,
		`<table>`,
		`  <tbody>`,
		`    <tr>`,
		// This intentionally uses the same sort as all-contributors-cli:
		// https://github.com/all-contributors/cli/blob/74bc388bd6f0ae2658e6495e9d3781d737438a97/src/generate/index.js#L76
		...contributors
			.toSorted((a, b) => Number(a.name > b.name) - Number(a.name < b.name))
			.flatMap((contributor, i) => {
				const row = printContributorCell(contributor, project);

				return i && i % 7 === 0 ? [`    </tr>`, `    <tr>`, row] : [row];
			}),
		`    </tr>`,
		`  </tbody>`,
		`</table>`,
		``,
		`<!-- prettier-ignore-end -->`,
		``,
		`<!-- ALL-CONTRIBUTORS-LIST:END -->`,
		`<!-- spellchecker: enable -->`,
	].join("\n");
}

function printContributorCell(
	contributor: Contributor,
	project: ProjectOptions,
) {
	return [
		`      <td align="center" valign="top" width="14.28%">`,
		`<a href="${contributor.profile}">`,
		`<img src="${contributor.avatar_url}?s=100" width="100px;" alt="${contributor.name}"/>`,
		`<br />`,
		`<sub><b>${contributor.name}</b></sub></a><br />`,
		contributor.contributions
			.filter(isContributionTypeName)
			.map((contribution) => {
				const { description, symbol } = contributionTypes[contribution];
				const href = createContributionLink(contribution, {
					...project,
					login: contributor.login,
				});

				return `<a href="${href}" title="${description}">${symbol}</a>`;
			})
			.join(" "),
		`</td>`,
	].join("");
}
