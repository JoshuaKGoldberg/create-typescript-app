import { describe, expect, it } from "vitest";

import { Options } from "../../../../shared/types.js";
import { createWorkflows } from "./createWorkflows.js";

const createOptions = (exclude: boolean) =>
	({
		access: "public",
		author: undefined,
		base: "everything",
		description: "Stub description.",
		email: {
			github: "github@email.com",
			npm: "npm@email.com",
		},
		excludeAllContributors: exclude,
		excludeCompliance: exclude,
		excludeLintJson: exclude,
		excludeLintKnip: exclude,
		excludeLintMd: exclude,
		excludeLintPackageJson: exclude,
		excludeLintPackages: exclude,
		excludeLintPerfectionist: exclude,
		excludeLintSpelling: exclude,
		excludeLintYml: exclude,
		excludeReleases: exclude,
		excludeRenovate: exclude,
		excludeTests: exclude,
		funding: undefined,
		logo: undefined,
		mode: "create",
		owner: "StubOwner",
		repository: "stub-repository",
		title: "Stub Title",
	}) satisfies Options;

describe("createWorkflows", () => {
	it("creates a full set of workflows when all excludes are disabled", () => {
		const workflows = createWorkflows(createOptions(false));

		expect(workflows).toMatchInlineSnapshot(`
			{
			  "build.yml": "jobs:
			  build:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm build
			      - run: node ./lib/index.js

			name: Build

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "compliance.yml": "jobs:
			  compliance:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: mtfoley/pr-compliance-action@main
			        with:
			          body-auto-close: false
			          ignore-authors: |-
			            allcontributors
			            allcontributors[bot]
			            renovate
			            renovate[bot]
			          ignore-team-members: false

			name: Compliance

			on:
			  pull_request:
			    branches:
			      - main
			    types:
			      - edited
			      - opened
			      - reopened
			      - synchronize

			permissions:
			  pull-requests: write
			",
			  "contributors.yml": "jobs:
			  contributors:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			        with:
			          fetch-depth: 0
			      - uses: ./.github/actions/prepare
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			        uses: JoshuaKGoldberg/all-contributors-auto-action@v0.3.2

			name: Contributors

			on:
			  push:
			    branches:
			      - main
			",
			  "lint-knip.yml": "jobs:
			  lint_knip:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint:knip

			name: Lint Knip

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "lint-markdown.yml": "jobs:
			  lint_markdown:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint:md

			name: Lint Markdown

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "lint-package-json.yml": "jobs:
			  lint_package_json:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint:package-json

			name: Lint Package JSON

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "lint-packages.yml": "jobs:
			  lint_packages:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint:packages

			name: Lint Packages

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "lint-spelling.yml": "jobs:
			  lint_spelling:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint:spelling

			name: Lint spelling

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "lint.yml": "jobs:
			  lint:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint

			name: Lint

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "post-release.yml": "jobs:
			  post_release:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			        with:
			          fetch-depth: 0
			      - run: echo \\"npm_version=$(npm pkg get version | tr -d '\\"')\\" >> \\"$GITHUB_ENV\\"
			      - uses: apexskier/github-release-commenter@v1
			        with:
			          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
			          comment-template: |
			              :tada: This is included in version {release_link} :tada:

			              The release is available on:
			        
			              * [GitHub releases](https://github.com/StubOwner/stub-repository/releases/tag/{release_tag})
			              * [npm package (@latest dist-tag)](https://www.npmjs.com/package/stub-repository/v/\${{ env.npm_version }})
			        
			              Cheers! 📦🚀

			name: Post Release

			on:
			  release:
			    types:
			      - published
			",
			  "pr-review-requested.yml": "jobs:
			  pr_review_requested:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions-ecosystem/action-remove-labels@v1
			        with:
			          labels: 'status: waiting for author'
			      - if: failure()
			        run: |
			          echo \\"Don't worry if the previous step failed.\\"
			          echo \\"See https://github.com/actions-ecosystem/action-remove-labels/issues/221.\\"

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested

			permissions:
			  pull-requests: write
			",
			  "prettier.yml": "jobs:
			  prettier:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm format --list-different

			name: Prettier

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "release.yml": "concurrency:
			  group: \${{ github.workflow }}

			jobs:
			  release:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			        with:
			          fetch-depth: 0
			          ref: main
			      - uses: ./.github/actions/prepare
			      - run: pnpm build
			      - run: git config user.name \\"\${GITHUB_ACTOR}\\"
			      - run: git config user.email \\"\${GITHUB_ACTOR}@users.noreply.github.com\\"
			      - env:
			          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
			        run: npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
			      - name: Delete branch protection on main
			        uses: actions/github-script@v6.4.1
			        with:
			          github-token: \${{ secrets.ACCESS_TOKEN }}
			          script: |
			                try {
			                  await github.request(
			                    \`DELETE /repos/StubOwner/stub-repository/branches/main/protection\`,
			                  );
			                } catch (error) {
			                  if (!error.message?.includes?.(\\"Branch not protected\\")) {
			                    throw error;
			                  }
			                }
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			        run: |
			            if pnpm run should-semantic-release ; then
			              pnpm release-it --verbose
			            fi
			      - if: always()
			        name: Recreate branch protection on main
			        uses: actions/github-script@v6.4.1
			        with:
			          github-token: \${{ secrets.ACCESS_TOKEN }}
			          script: |
			              github.request(
			                \`PUT /repos/StubOwner/stub-repository/branches/main/protection\`,
			                {
			                  allow_deletions: false,
			                  allow_force_pushes: true,
			                  allow_fork_pushes: false,
			                  allow_fork_syncing: true,
			                  block_creations: false,
			                  branch: \\"main\\",
			                  enforce_admins: false,
			                  owner: \\"StubOwner\\",
			                  repo: \\"stub-repository\\",
			                  required_conversation_resolution: true,
			                  required_linear_history: false,
			                  required_pull_request_reviews: null,
			                  required_status_checks: {
			                    checks: [
			                      { context: \\"build\\" },
			                      { context: \\"compliance\\" },
			                      { context: \\"lint\\" },
			                      { context: \\"lint_knip\\" },
			                      { context: \\"lint_markdown\\" },
			                      { context: \\"lint_package_json\\" },
			                      { context: \\"lint_packages\\" },
			                      { context: \\"lint_spelling\\" },
			                      { context: \\"prettier\\" },
			                      { context: \\"test\\" },
			                    ],
			                    strict: false,
			                  },
			                  restrictions: null,
			                }
			              );

			name: Release

			on:
			  push:
			    branches:
			      - main

			permissions:
			  contents: write
			  id-token: write
			",
			  "test.yml": "jobs:
			  test:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm run test --coverage
			      - name: Codecov
			        uses: codecov/codecov-action@v3
			        with:
			          github-token: \${{ secrets.GITHUB_TOKEN }}

			name: Test

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "tsc.yml": "jobs:
			  type_check:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm tsc

			name: Type Check

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			}
		`);
	});

	it("creates a minimal set of workflows when all options are enabled", () => {
		const workflows = createWorkflows(createOptions(true));

		expect(workflows).toMatchInlineSnapshot(`
			{
			  "build.yml": "jobs:
			  build:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm build
			      - run: node ./lib/index.js

			name: Build

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "lint.yml": "jobs:
			  lint:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm lint

			name: Lint

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "pr-review-requested.yml": "jobs:
			  pr_review_requested:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions-ecosystem/action-remove-labels@v1
			        with:
			          labels: 'status: waiting for author'
			      - if: failure()
			        run: |
			          echo \\"Don't worry if the previous step failed.\\"
			          echo \\"See https://github.com/actions-ecosystem/action-remove-labels/issues/221.\\"

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested

			permissions:
			  pull-requests: write
			",
			  "prettier.yml": "jobs:
			  prettier:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm format --list-different

			name: Prettier

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			  "tsc.yml": "jobs:
			  type_check:
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			      - uses: ./.github/actions/prepare
			      - run: pnpm tsc

			name: Type Check

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			",
			}
		`);
	});
});
