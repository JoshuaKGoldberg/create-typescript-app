import { Options } from "../../../../shared/types.js";
import { createMultiWorkflowFile } from "./createMultiWorkflowFile.js";
import { createSoloWorkflowFile } from "./createSoloWorkflowFile.js";

export function createWorkflows(options: Options) {
	return {
		"accessibility-alt-text-bot.yml": createSoloWorkflowFile({
			if: "${{ !endsWith(github.actor, '[bot]') }}",
			name: "Accessibility Alt Text Bot",
			on: {
				issue_comment: {
					types: ["created", "edited"],
				},
				issues: {
					types: ["edited", "opened"],
				},
				pull_request: {
					types: ["edited", "opened"],
				},
			},
			permissions: {
				issues: "write",
				"pull-requests": "write",
			},
			steps: [
				{
					uses: "github/accessibility-alt-text-bot@v1.4.0",
				},
			],
		}),
		"ci.yml": createMultiWorkflowFile({
			jobs: [
				{
					name: "Build",
					steps: [{ run: "pnpm build" }, { run: "node ./lib/index.js" }],
				},
				{
					name: "Prettier",
					steps: [{ run: "pnpm format --list-different" }],
				},
				{
					name: "Type Check",
					steps: [{ run: "pnpm tsc" }],
				},
				{
					name: "Lint",
					steps: [
						...(options.bin ? [{ run: "pnpm build" }] : []),
						{ run: "pnpm lint" },
					],
				},
				...(options.excludeLintKnip
					? []
					: [
							{
								name: "Lint Knip",
								steps: [{ run: "pnpm lint:knip" }],
							},
						]),
				...(options.excludeLintMd
					? []
					: [
							{
								name: "Lint Markdown",
								steps: [{ run: "pnpm lint:md" }],
							},
						]),
				...(options.excludeLintPackages
					? []
					: [
							{
								name: "Lint Packages",
								steps: [{ run: "pnpm lint:packages" }],
							},
						]),
				...(options.excludeLintSpelling
					? []
					: [
							{
								name: "Lint Spelling",
								steps: [{ run: "pnpm lint:spelling" }],
							},
						]),
				...(options.excludeTests
					? []
					: [
							{
								name: "Test",
								steps: [
									{ run: "pnpm run test --coverage" },
									{ uses: "codecov/codecov-action@v3" },
								],
							},
						]),
			],
			name: "CI",
		}),
		...(!options.excludeCompliance && {
			"compliance.yml": createSoloWorkflowFile({
				name: "Compliance",
				on: {
					pull_request: {
						branches: ["main"],
						types: ["edited", "opened", "reopened", "synchronize"],
					},
				},
				permissions: {
					"pull-requests": "write",
				},
				steps: [
					{
						uses: "mtfoley/pr-compliance-action@main",
						with: {
							"body-auto-close": false,
							"ignore-authors":
								[
									...(options.excludeAllContributors
										? []
										: ["allcontributors", "allcontributors[bot]"]),
									...(options.excludeRenovate
										? []
										: ["renovate", "renovate[bot]"]),
								].join("\n") || undefined,
							"ignore-team-members": false,
						},
					},
				],
			}),
		}),
		...(!options.excludeAllContributors && {
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
		}),
		...(!options.excludeReleases && {
			"post-release.yml": createSoloWorkflowFile({
				name: "Post Release",
				on: {
					release: {
						types: ["published"],
					},
				},
				steps: [
					{ uses: "actions/checkout@v4", with: { "fetch-depth": 0 } },
					{
						run: `echo "npm_version=$(npm pkg get version | tr -d '"')" >> "$GITHUB_ENV"`,
					},
					{
						uses: "apexskier/github-release-commenter@v1",
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
		}),
		"pr-review-requested.yml": createSoloWorkflowFile({
			name: "PR Review Requested",
			on: {
				pull_request_target: {
					types: ["review_requested"],
				},
			},
			permissions: {
				"pull-requests": "write",
			},
			steps: [
				{
					uses: "actions-ecosystem/action-remove-labels@v1",
					with: {
						labels: "status: waiting for author",
					},
				},
				{
					if: "failure()",
					run: 'echo "Don\'t worry if the previous step failed."\necho "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."\n',
				},
			],
		}),
		...(!options.excludeReleases && {
			"release.yml": createSoloWorkflowFile({
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
						uses: "actions/checkout@v4",
						with: {
							"fetch-depth": 0,
							ref: "main",
						},
					},
					{
						uses: "./.github/actions/prepare",
					},
					{
						run: "pnpm build",
					},
					{
						env: {
							GITHUB_TOKEN: "${{ secrets.ACCESS_TOKEN }}",
							NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
						},
						uses: "JoshuaKGoldberg/release-it-action@v0.2.2",
					},
				],
			}),
		}),
	};
}
