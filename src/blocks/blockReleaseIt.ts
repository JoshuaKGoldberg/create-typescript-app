import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
import { isPlainObject } from "../utils/isPlainObject.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockREADME } from "./blockREADME.ts";
import { blockRepositorySecrets } from "./blockRepositorySecrets.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

const git = {
	commitMessage: "chore: release v${version}",
	pushArgs: ["--follow-tags", "--atomic"],
	requireCommits: true,
};

export const blockReleaseIt = base.createBlock({
	about: {
		name: "release-it",
	},
	intake({ files }) {
		const releaseItJson = intakeFileAsJson(files, [".release-it.json"]);
		if (!isPlainObject(releaseItJson?.git)) {
			return undefined;
		}

		// Keep a repository's own git options, such as getLatestTagFromAllRefs,
		// but not the ones this Block always sets itself.
		const extraGit = Object.fromEntries(
			Object.entries(releaseItJson.git).filter(([key]) => !(key in git)),
		);

		return Object.keys(extraGit).length ? { git: extraGit } : undefined;
	},
	produce({ options, props }) {
		const { builders } = props;

		return {
			extensions: [
				blockCSpell({
					words: ["apexskier"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies(
							"@release-it/conventional-changelog",
							"release-it",
						),
						scripts: {
							"should-semantic-release": undefined,
						},
					},
				}),
				blockREADME({
					badges: [
						{
							alt: "📦 npm version",
							href: `http://npmjs.com/package/${options.repository}`,
							src: `https://img.shields.io/npm/v/${options.repository}?color=21bb42&label=%F0%9F%93%A6%20npm`,
						},
					],
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
				".github": {
					workflows: {
						"post-release.yaml": withPreviously(
							createSoloWorkflowFile({
								name: "Post Release",
								on: {
									release: {
										types: ["published"],
									},
								},
								permissions: {
									issues: "write",
									"pull-requests": "write",
								},
								steps: [
									{
										env: { TAG_NAME: "${{ github.event.release.tag_name }}" },
										run: 'echo "npm_version=${TAG_NAME#v}" >> "$GITHUB_ENV"',
									},
									{
										uses: resolveUses(
											"apexskier/github-release-commenter",
											"v1",
											options.workflowsVersions,
											"e7813a9625eabd79a875b4bc4046cfcae377ab34",
										),
										with: {
											"comment-template": `
							:tada: This is included in version {release_link} :tada:

							The release is available on:

							* [GitHub releases](https://github.com/${options.owner}/${options.repository}/releases/tag/{release_tag})
							* [npm package (@latest dist-tag)](https://www.npmjs.com/package/${options.repository}/v/\${{ env.npm_version }})

							Cheers! 📦🚀
						`,
											GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
										},
									},
								],
							}),
							["post-release.yml"],
						),
						"release.yaml": withPreviously(
							createSoloWorkflowFile({
								concurrency: {
									group: "${{ github.workflow }}",
								},
								name: "Release",
								on: {
									push: {
										branches: ["main"],
									},
								},
								permissions: {
									contents: "read",
									"id-token": "write",
								},
								steps: [
									{
										uses: resolveUses(
											"actions/checkout",
											"v7",
											options.workflowsVersions,
											"3d3c42e5aac5ba805825da76410c181273ba90b1",
										),
										with: {
											"fetch-depth": 0,
											"persist-credentials": true,
											ref: "main",
											token: "${{ secrets.ACCESS_TOKEN }}",
										},
									},
									{
										uses: "./.github/actions/prepare",
									},
									...builders
										.sort((a, b) => a.order - b.order)
										.map(({ run }) => ({ run })),
									{
										env: {
											GITHUB_TOKEN: "${{ secrets.ACCESS_TOKEN }}",
										},
										uses: resolveUses(
											"JoshuaKGoldberg/release-it-action",
											"v0.6.4",
											options.workflowsVersions,
											"c8081a3d2382b75d5fd1315443c095d7f95fd146",
										),
									},
								],
							}),
							["release.yml"],
						),
					},
				},
				".release-it.json": formatFile(
					".release-it.json",
					JSON.stringify({
						git: Object.fromEntries(
							Object.entries({ ...props.git, ...git }).sort(([a], [b]) =>
								a.localeCompare(b),
							),
						),
						github: {
							release: true,
							releaseName: "v${version}",
						},
						hooks: { "after:git:release": "npm publish" },
						npm: { publish: false, skipChecks: true },
						plugins: {
							"@release-it/conventional-changelog": {
								infile: "CHANGELOG.md",
								preset: "conventionalcommits",
							},
						},
					}),
				),
			},
			suggestions: [
				[
					`- add ${options.owner}/${options.repository} and \`release.yaml\` as a Trusted Publisher on:`,
					`   https://www.npmjs.com/package/${options.repository}/access`,
				].join("\n"),
			],
		};
	},
	props: {
		builders: z
			.array(
				z.object({
					order: z.number(),
					run: z.string(),
				}),
			)
			.default([]),
		git: z.record(z.string(), z.unknown()).optional(),
	},
});
