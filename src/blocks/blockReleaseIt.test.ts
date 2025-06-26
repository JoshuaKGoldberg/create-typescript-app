import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockReleaseIt } from "./blockReleaseIt.js";
import { optionsBase } from "./options.fakes.js";

describe("blockReleaseIt", () => {
	test("without addons", () => {
		const creation = testBlock(blockReleaseIt, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "CHANGELOG.md",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@release-it/conventional-changelog": "10.0.1",
			            "release-it": "19.0.3",
			          },
			          "publishConfig": {
			            "provenance": true,
			          },
			          "scripts": {
			            "should-semantic-release": undefined,
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "badges": [
			          {
			            "alt": "📦 npm version",
			            "href": "http://npmjs.com/package/test-repository",
			            "src": "https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "secrets": [
			          {
			            "description": "a GitHub PAT with repo and workflow permissions",
			            "name": "ACCESS_TOKEN",
			          },
			          {
			            "description": "an npm access token with automation permissions",
			            "name": "NPM_TOKEN",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
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

			              * [GitHub releases](https://github.com/test-owner/test-repository/releases/tag/{release_tag})
			              * [npm package (@latest dist-tag)](https://www.npmjs.com/package/test-repository/v/\${{ env.npm_version }})

			              Cheers! 📦🚀


			name: Post Release


			on:
			  release:
			    types:
			      - published


			permissions:
			  issues: write
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
			          token: \${{ secrets.ACCESS_TOKEN }}
			      - uses: ./.github/actions/prepare
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
			        uses: JoshuaKGoldberg/release-it-action@v0.3.2


			name: Release


			on:
			  push:
			    branches:
			      - main


			permissions:
			  contents: write
			  id-token: write
			",
			      },
			    },
			    ".release-it.json": "{"git":{"commitMessage":"chore: release v\${version}","requireCommits":true},"github":{"release":true,"releaseName":"v\${version}"},"npm":{"publishArgs":["--access public","--provenance"]},"plugins":{"@release-it/conventional-changelog":{"infile":"CHANGELOG.md","preset":"conventionalcommits","types":[{"section":"Features","type":"feat"},{"section":"Bug Fixes","type":"fix"},{"section":"Performance Improvements","type":"perf"},{"hidden":true,"type":"build"},{"hidden":true,"type":"chore"},{"hidden":true,"type":"ci"},{"hidden":true,"type":"docs"},{"hidden":true,"type":"refactor"},{"hidden":true,"type":"style"},{"hidden":true,"type":"test"}]}}}",
			  },
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockReleaseIt, {
			addons: {
				builders: [
					{
						order: 1,
						run: "one",
					},
					{
						order: 0,
						run: "zero",
					},
					{
						order: 2,
						run: "two",
					},
				],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "CHANGELOG.md",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "properties": {
			          "devDependencies": {
			            "@release-it/conventional-changelog": "10.0.1",
			            "release-it": "19.0.3",
			          },
			          "publishConfig": {
			            "provenance": true,
			          },
			          "scripts": {
			            "should-semantic-release": undefined,
			          },
			        },
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "badges": [
			          {
			            "alt": "📦 npm version",
			            "href": "http://npmjs.com/package/test-repository",
			            "src": "https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "secrets": [
			          {
			            "description": "a GitHub PAT with repo and workflow permissions",
			            "name": "ACCESS_TOKEN",
			          },
			          {
			            "description": "an npm access token with automation permissions",
			            "name": "NPM_TOKEN",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
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

			              * [GitHub releases](https://github.com/test-owner/test-repository/releases/tag/{release_tag})
			              * [npm package (@latest dist-tag)](https://www.npmjs.com/package/test-repository/v/\${{ env.npm_version }})

			              Cheers! 📦🚀


			name: Post Release


			on:
			  release:
			    types:
			      - published


			permissions:
			  issues: write
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
			          token: \${{ secrets.ACCESS_TOKEN }}
			      - uses: ./.github/actions/prepare
			      - run: zero
			      - run: one
			      - run: two
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
			        uses: JoshuaKGoldberg/release-it-action@v0.3.2


			name: Release


			on:
			  push:
			    branches:
			      - main


			permissions:
			  contents: write
			  id-token: write
			",
			      },
			    },
			    ".release-it.json": "{"git":{"commitMessage":"chore: release v\${version}","requireCommits":true},"github":{"release":true,"releaseName":"v\${version}"},"npm":{"publishArgs":["--access public","--provenance"]},"plugins":{"@release-it/conventional-changelog":{"infile":"CHANGELOG.md","preset":"conventionalcommits","types":[{"section":"Features","type":"feat"},{"section":"Bug Fixes","type":"fix"},{"section":"Performance Improvements","type":"perf"},{"hidden":true,"type":"build"},{"hidden":true,"type":"chore"},{"hidden":true,"type":"ci"},{"hidden":true,"type":"docs"},{"hidden":true,"type":"refactor"},{"hidden":true,"type":"style"},{"hidden":true,"type":"test"}]}}}",
			  },
			}
		`);
	});
});
