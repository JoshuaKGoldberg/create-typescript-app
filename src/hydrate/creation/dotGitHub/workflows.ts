/* spellchecker: disable */
import { RepositorySettings } from "../../repositorySettings.js";
import { createWorkflowFile } from "./createWorkflowFile.js";

export function createWorkflows({
	owner,
	repository,
}: Pick<RepositorySettings, "owner" | "repository">) {
	return {
		"build.yml": createWorkflowFile({
			name: "Build",
			runs: ["pnpm build", "node ./lib/index.js"],
		}),
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
					uses: `${owner}/all-contributors-auto-action@v0.3.0`,
				},
			],
		}),
		"lint.yml": createWorkflowFile({
			name: "Lint",
			runs: ["pnpm lint"],
		}),
		"lint-knip.yml": createWorkflowFile({
			name: "Lint Knip",
			runs: ["pnpm lint:knip"],
		}),
		"lint-markdown.yml": createWorkflowFile({
			name: "Lint Markdown",
			runs: ["pnpm lint:md"],
		}),
		"lint-package.yml": createWorkflowFile({
			name: "Lint Package",
			runs: ["pnpm lint:package"],
		}),
		"lint-spelling.yml": createWorkflowFile({
			name: "Lint spelling",
			runs: ["pnpm lint:spelling"],
		}),
		"post-release.yml": createWorkflowFile({
			name: "Post Release",
			on: {
				release: {
					types: ["published"],
				},
				workflow_dispatch: null,
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
				
							* [GitHub releases](https://github.com/${owner}/${repository}/releases/tag/{release_tag})
							* [npm package (@latest dist-tag)](https://www.npmjs.com/package/${repository}/v/\${{ env.npm_version }})
				
							Cheers! 📦🚀
						`,
					},
				},
			],
		}),
		"prettier.yml": createWorkflowFile({
			name: "Prettier",
			runs: ["pnpm format --list-different"],
		}),
		"release.yml": createWorkflowFile({
			concurrency: {
				"cancel-in-progress": false,
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
								  \`DELETE /repos/${owner}/${repository}/branches/main/protection\`,
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
						  \`PUT /repos/${owner}/${repository}/branches/main/protection\`,
						  {
							  allow_deletions: false,
							  allow_force_pushes: true,
							  allow_fork_pushes: false,
							  allow_fork_syncing: true,
							  block_creations: false,
							  branch: "main",
							  enforce_admins: false,
							  owner: "${owner}",
							  repo: "${repository}",
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
	};
}
