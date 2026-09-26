import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockREADME } from "./blockREADME.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRepositorySecrets } from "./blockRepositorySecrets.ts";
import { createSoloWorkflowFile } from "./files/createSoloWorkflowFile.ts";

export const blockReleaseIt = base.createBlock({
	about: {
		name: "release-it",
	},
	addons: {
		builders: z
			.array(
				z.object({
					order: z.number(),
					run: z.string(),
				}),
			)
			.default([]),
	},
	legacyFiles: {
		".github/workflows/post-release.yml": ".github/workflows/post-release.yaml",
		".github/workflows/release.yml": ".github/workflows/release.yaml",
	},
	produce({ addons, options }) {
		const { builders } = addons;

		return {
			addons: [
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
						"post-release.yaml": createSoloWorkflowFile({
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
									uses: resolveUses(
										"actions/checkout",
										"v4",
										options.workflowsVersions,
									),
									with: { "fetch-depth": 0 },
								},
								{
									run: `echo "npm_version=$(npm pkg get version | tr -d '"')" >> "$GITHUB_ENV"`,
								},
								{
									uses: resolveUses(
										"apexskier/github-release-commenter",
										"v1",
										options.workflowsVersions,
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
						"release.yaml": createSoloWorkflowFile({
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
								contents: "write",
								"id-token": "write",
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
										"v0.4.0",
										options.workflowsVersions,
									),
								},
							],
						}),
					},
				},
				".release-it.json": JSON.stringify({
					git: {
						commitMessage: "chore: release v${version}",
						requireCommits: true,
					},
					github: {
						release: true,
						releaseName: "v${version}",
					},
					npm: { skipChecks: true },
					plugins: {
						"@release-it/conventional-changelog": {
							infile: "CHANGELOG.md",
							preset: "conventionalcommits",
							types: [
								{ section: "Features", type: "feat" },
								{ section: "Bug Fixes", type: "fix" },
								{ section: "Performance Improvements", type: "perf" },
								{ hidden: true, type: "build" },
								{ hidden: true, type: "chore" },
								{ hidden: true, type: "ci" },
								{ hidden: true, type: "docs" },
								{ hidden: true, type: "refactor" },
								{ hidden: true, type: "style" },
								{ hidden: true, type: "test" },
							],
						},
					},
				}),
			},
			suggestions: [
				[
					`- add ${options.owner}/${options.repository} and \`release.yaml\` as a Trusted Publisher on:`,
					`   https://www.npmjs.com/package/${options.repository}/access`,
				].join("\n"),
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [
						".github/workflows/post-release.yml",
						".github/workflows/release.yml",
					],
				}),
			],
		};
	},
});
