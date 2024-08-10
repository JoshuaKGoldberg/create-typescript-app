import { describe, expect, it } from "vitest";

import { Options } from "../../../../shared/types.js";
import { createWorkflows } from "./createWorkflows.js";

const createOptions = (exclude: boolean) =>
	({
		access: "public",
		base: "everything",
		bin: exclude ? undefined : "./bin/index.js",
		description: "Test description.",
		directory: ".",
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
			  "accessibility-alt-text-bot.yml": "jobs:
			  accessibility_alt_text_bot:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: github/accessibility-alt-text-bot@v1.4.0

			name: Accessibility Alt Text Bot

			on:
			  issue_comment:
			    types:
			      - created
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request:
			    types:
			      - edited
			      - opened

			permissions:
			  issues: write
			  pull-requests: write
			",
			  "ci.yml": "jobs:
			  Build:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm build
			      - run:
			          run: node ./lib/index.js
			  Lint:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm build
			      - run:
			          run: pnpm lint
			  Lint Knip:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm lint:knip
			  Lint Markdown:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm lint:md
			  Lint Packages:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm lint:packages
			  Lint spelling:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm lint:spelling
			  Prettier:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm format --list-different
			  Test:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm run test --coverage
			      - run:
			          uses: codecov/codecov-action@v3
			  Type Check:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm tsc

			name: CI

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
			        uses: JoshuaKGoldberg/all-contributors-auto-action@v0.4.3

			name: Contributors

			on:
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
			      - run: echo "npm_version=$(npm pkg get version | tr -d '"')" >> "$GITHUB_ENV"
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
			          echo "Don't worry if the previous step failed."
			          echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested

			permissions:
			  pull-requests: write
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
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
			        uses: JoshuaKGoldberg/release-it-action@v0.2.2

			name: Release

			on:
			  push:
			    branches:
			      - main

			permissions:
			  contents: write
			  id-token: write
			",
			}
		`);
	});

	it("creates a minimal set of workflows when all options are enabled", () => {
		const workflows = createWorkflows(createOptions(true));

		expect(workflows).toMatchInlineSnapshot(`
			{
			  "accessibility-alt-text-bot.yml": "jobs:
			  accessibility_alt_text_bot:
			    if: \${{ !endsWith(github.actor, '[bot]') }}
			    runs-on: ubuntu-latest
			    steps:
			      - uses: github/accessibility-alt-text-bot@v1.4.0

			name: Accessibility Alt Text Bot

			on:
			  issue_comment:
			    types:
			      - created
			      - edited
			  issues:
			    types:
			      - edited
			      - opened
			  pull_request:
			    types:
			      - edited
			      - opened

			permissions:
			  issues: write
			  pull-requests: write
			",
			  "ci.yml": "jobs:
			  Build:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm build
			      - run:
			          run: node ./lib/index.js
			  Lint:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm lint
			  Prettier:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm format --list-different
			  Type Check:
			    runs-on: ubuntu-latest
			    steps:
			      - run:
			          run: pnpm tsc

			name: CI

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
			          echo "Don't worry if the previous step failed."
			          echo "See https://github.com/actions-ecosystem/action-remove-labels/issues/221."

			name: PR Review Requested

			on:
			  pull_request_target:
			    types:
			      - review_requested

			permissions:
			  pull-requests: write
			",
			}
		`);
	});
});
