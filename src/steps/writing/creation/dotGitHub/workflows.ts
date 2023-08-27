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
							"ignore-authors": [
								"allcontributors",
								"allcontributors[bot]",
								"renovate",
								"renovate[bot]",
							].join("\n"),
							"ignore-team-members": false,
						},
					},
				],
			}),
		}),
		...(!options.excludeContributors && {
			"contributors.yml": createWorkflowFile({
				name: "Contributors",
				on: {
					push: {
						branches: ["main"],
					},
				},
				steps: [
					{ uses: "actions/checkout@v3", with: { "fetch-depth": 0 } },
					{ uses: "./.github/actions/prepare" },
					{
						env: { GITHUB_TOKEN: "${{ secrets.ACCESS_TOKEN }}" },
						uses: `JoshuaKGoldberg/all-contributors-auto-action@v0.3.2`,
					},
				],
			}),
		}),
		"lint.yml": createWorkflowFile({
			name: "Lint",
			runs: ["pnpm lint"],
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
		...(!options.excludeLintPackageJson && {
			"lint-package.yml": createWorkflowFile({
				name: "Lint Package JSON",
				runs: ["pnpm lint:package-json"],
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
					{ uses: "actions/checkout@v3", with: { "fetch-depth": 0 } },
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
					"cancel-in-progress": true,
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
						uses: "actions/checkout@v3",
						with: {
							"fetch-depth": 0,
						},
					},
					{
						uses: "./.github/actions/prepare",
					},
					{
						run: "pnpm build",
					},
					{
						run: 'git config user.name "${GITHUB_ACTOR}"',
					},
					{
						run: 'git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"',
					},
					{
						env: {
							NPM_TOKEN: "${{ secrets.NPM_TOKEN }}",
						},
						run: "npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN",
					},
					{
						name: "Delete branch protection on main",
						uses: "actions/github-script@v6.4.1",
						with: {
							"github-token": "${{ secrets.ACCESS_TOKEN }}",
							script: `
								try {
									await github.request(
									  \`DELETE /repos/${options.owner}/${options.repository}/branches/main/protection\`,
									);
								} catch (error) {
									if (!error.message?.includes?.("Branch not protected")) {
										throw error;
									}
								}`,
						},
					},
					{
						env: {
							GITHUB_TOKEN: "${{ secrets.ACCESS_TOKEN }}",
						},
						run: `
						if pnpm run should-semantic-release ; then
						  pnpm release-it --verbose
						  gh workflow run post-release.yml
						fi`,
					},
					{
						if: "always()",
						name: "Recreate branch protection on main",
						uses: "actions/github-script@v6.4.1",
						with: {
							"github-token": "${{ secrets.ACCESS_TOKEN }}",
							script: `
							github.request(
							  \`PUT /repos/${options.owner}/${options.repository}/branches/main/protection\`,
							  {
								  allow_deletions: false,
								  allow_force_pushes: true,
								  allow_fork_pushes: false,
								  allow_fork_syncing: true,
								  block_creations: false,
								  branch: "main",
								  enforce_admins: false,
								  owner: "${options.owner}",
								  repo: "${options.repository}",
								  required_conversation_resolution: true,
								  required_linear_history: false,
								  required_pull_request_reviews: null,
								  required_status_checks: {
									checks: [
									  { context: "build" },
									  { context: "compliance" },
									  { context: "lint" },
									  { context: "lint_knip" },
									  { context: "lint_markdown" },
									  { context: "lint_package" },
									  { context: "lint_packages" },
									  { context: "lint_spelling" },
									  { context: "prettier" },
									  { context: "test" },
									],
									strict: false,
								  },
								  restrictions: null,
							  }
							);
						`,
						},
					},
				],
			}),
		}),
		...(options.excludeTests && {
			"test.yml": createWorkflowFile({
				name: "Test",
				steps: [
					{ uses: "actions/checkout@v3" },
					{ uses: "./.github/actions/prepare" },
					{ run: "pnpm run test --coverage" },
					{
						name: "Codecov",
						uses: "codecov/codecov-action@v3",
						with: { "github-token": "${{ secrets.GITHUB_TOKEN }}" },
					},
				],
			}),
		}),
	};
}
