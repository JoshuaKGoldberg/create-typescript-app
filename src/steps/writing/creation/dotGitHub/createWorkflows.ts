/* spellchecker: disable */
import { Options } from "../../../../shared/types.js";
import { createWorkflowFile } from "./createWorkflowFile.js";

export function createWorkflows(options: Options) {
	return {
		"build.yml": createWorkflowFile({
			name: "Build",
			runs: ["pnpm build", "node ./lib/index.js"],
		}),
		"pr-review-requested.yml": createWorkflowFile({
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
		"prettier.yml": createWorkflowFile({
			name: "Prettier",
			runs: ["pnpm format --list-different"],
		}),
		"tsc.yml": createWorkflowFile({
			name: "Type Check",
			runs: ["pnpm tsc"],
		}),
		...(!options.excludeCompliance && {
			"compliance.yml": createWorkflowFile({
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
			"contributors.yml": createWorkflowFile({
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
						uses: `JoshuaKGoldberg/all-contributors-auto-action@v0.4.3`,
					},
				],
			}),
		}),
		"accessibility-alt-text-bot.yml": createWorkflowFile({
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
		"lint.yml": createWorkflowFile({
			name: "Lint",
			runs: [...(options.bin ? ["pnpm build"] : []), "pnpm lint"],
		}),
		...(!options.excludeLintKnip && {
			"lint-knip.yml": createWorkflowFile({
				name: "Lint Knip",
				runs: ["pnpm lint:knip"],
			}),
		}),
		...(!options.excludeLintMd && {
			"lint-markdown.yml": createWorkflowFile({
				name: "Lint Markdown",
				runs: ["pnpm lint:md"],
			}),
		}),
		...(!options.excludeLintPackages && {
			"lint-packages.yml": createWorkflowFile({
				name: "Lint Packages",
				runs: ["pnpm lint:packages"],
			}),
		}),
		...(!options.excludeLintSpelling && {
			"lint-spelling.yml": createWorkflowFile({
				name: "Lint spelling",
				runs: ["pnpm lint:spelling"],
			}),
		}),
		...(!options.excludeReleases && {
			"post-release.yml": createWorkflowFile({
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
							GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
							"comment-template": `
							:tada: This is included in version {release_link} :tada:

							The release is available on:

							* [GitHub releases](https://github.com/${options.owner}/${options.repository}/releases/tag/{release_tag})
							* [npm package (@latest dist-tag)](https://www.npmjs.com/package/${options.repository}/v/\${{ env.npm_version }})

							Cheers! 📦🚀
						`,
						},
					},
				],
			}),
			"release.yml": createWorkflowFile({
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
		...(!options.excludeTests && {
			"test.yml": createWorkflowFile({
				name: "Test",
				steps: [
					{ uses: "actions/checkout@v4" },
					{ uses: "./.github/actions/prepare" },
					{ run: "pnpm run test --coverage" },
					{
						name: "Codecov",
						uses: "codecov/codecov-action@v3",
					},
				],
			}),
		}),
	};
}
