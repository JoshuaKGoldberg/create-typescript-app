import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test, vi } from "vitest";

import { blockReleaseIt } from "./blockReleaseIt.ts";
import { optionsBase } from "./options.fakes.ts";

vi.mock("../data/packageData.ts", async (importOriginal) => {
	const { getPackageDependencies } =
		await importOriginal<typeof import("../data/packageData.ts")>();
	return {
		getPackageDependencies: (...names: string[]) =>
			Object.fromEntries(
				Object.keys(getPackageDependencies(...names)).map((name) => [
					name,
					"0.0.0-mock",
				]),
			),
	};
});

describe(blockReleaseIt, () => {
	test("without props", () => {
		const creation = testBlock(blockReleaseIt, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "apexskier",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "@release-it/conventional-changelog": "0.0.0-mock",
			            "release-it": "0.0.0-mock",
			          },
			          "scripts": {
			            "should-semantic-release": undefined,
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block README.md]",
			      "props": {
			        "badges": [
			          {
			            "alt": "📦 npm version",
			            "href": "http://npmjs.com/package/test-repository",
			            "src": "https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Repository Secrets]",
			      "props": {
			        "secrets": [
			          {
			            "description": "a GitHub PAT with repo and workflow permissions",
			            "name": "ACCESS_TOKEN",
			          },
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "post-release.yaml": [
			          "jobs:
			  post_release:
			    permissions:
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          TAG_NAME: \${{ github.event.release.tag_name }}
			        run: echo "npm_version=\${TAG_NAME#v}" >> "$GITHUB_ENV"
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
			",
			          {
			            "previously": [
			              "post-release.yml",
			            ],
			          },
			        ],
			        "release.yaml": [
			          "concurrency:
			  group: \${{ github.workflow }}

			jobs:
			  release:
			    permissions:
			      contents: read
			      id-token: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v7
			        with:
			          fetch-depth: 0
			          persist-credentials: true
			          ref: main
			          token: \${{ secrets.ACCESS_TOKEN }}
			      - uses: ./.github/actions/prepare
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			        uses: JoshuaKGoldberg/release-it-action@v0.6.4

			name: Release

			on:
			  push:
			    branches:
			      - main
			",
			          {
			            "previously": [
			              "release.yml",
			            ],
			          },
			        ],
			      },
			    },
			    ".release-it.json": "{
				"git": {
					"commitMessage": "chore: release v\${version}",
					"pushArgs": ["--follow-tags", "--atomic"],
					"requireCommits": true
				},
				"github": { "release": true, "releaseName": "v\${version}" },
				"hooks": { "after:git:release": "npm publish" },
				"npm": { "publish": false, "skipChecks": true },
				"plugins": {
					"@release-it/conventional-changelog": {
						"infile": "CHANGELOG.md",
						"preset": "conventionalcommits",
						"types": [
							{ "section": "Features", "type": "feat" },
							{ "section": "Bug Fixes", "type": "fix" },
							{ "section": "Performance Improvements", "type": "perf" },
							{ "hidden": true, "type": "build" },
							{ "hidden": true, "type": "chore" },
							{ "hidden": true, "type": "ci" },
							{ "hidden": true, "type": "docs" },
							{ "hidden": true, "type": "refactor" },
							{ "hidden": true, "type": "style" },
							{ "hidden": true, "type": "test" }
						]
					}
				}
			}
			",
			  },
			  "suggestions": [
			    "- add test-owner/test-repository and \`release.yaml\` as a Trusted Publisher on:
			   https://www.npmjs.com/package/test-repository/access",
			  ],
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockReleaseIt, {
			options: optionsBase,
			props: {
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
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block CSpell]",
			      "props": {
			        "words": [
			          "apexskier",
			        ],
			      },
			    },
			    {
			      "block": "[Block Package JSON]",
			      "props": {
			        "properties": {
			          "devDependencies": {
			            "@release-it/conventional-changelog": "0.0.0-mock",
			            "release-it": "0.0.0-mock",
			          },
			          "scripts": {
			            "should-semantic-release": undefined,
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block README.md]",
			      "props": {
			        "badges": [
			          {
			            "alt": "📦 npm version",
			            "href": "http://npmjs.com/package/test-repository",
			            "src": "https://img.shields.io/npm/v/test-repository?color=21bb42&label=%F0%9F%93%A6%20npm",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Repository Secrets]",
			      "props": {
			        "secrets": [
			          {
			            "description": "a GitHub PAT with repo and workflow permissions",
			            "name": "ACCESS_TOKEN",
			          },
			        ],
			      },
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "post-release.yaml": [
			          "jobs:
			  post_release:
			    permissions:
			      issues: write
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          TAG_NAME: \${{ github.event.release.tag_name }}
			        run: echo "npm_version=\${TAG_NAME#v}" >> "$GITHUB_ENV"
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
			",
			          {
			            "previously": [
			              "post-release.yml",
			            ],
			          },
			        ],
			        "release.yaml": [
			          "concurrency:
			  group: \${{ github.workflow }}

			jobs:
			  release:
			    permissions:
			      contents: read
			      id-token: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v7
			        with:
			          fetch-depth: 0
			          persist-credentials: true
			          ref: main
			          token: \${{ secrets.ACCESS_TOKEN }}
			      - uses: ./.github/actions/prepare
			      - run: zero
			      - run: one
			      - run: two
			      - env:
			          GITHUB_TOKEN: \${{ secrets.ACCESS_TOKEN }}
			        uses: JoshuaKGoldberg/release-it-action@v0.6.4

			name: Release

			on:
			  push:
			    branches:
			      - main
			",
			          {
			            "previously": [
			              "release.yml",
			            ],
			          },
			        ],
			      },
			    },
			    ".release-it.json": "{
				"git": {
					"commitMessage": "chore: release v\${version}",
					"pushArgs": ["--follow-tags", "--atomic"],
					"requireCommits": true
				},
				"github": { "release": true, "releaseName": "v\${version}" },
				"hooks": { "after:git:release": "npm publish" },
				"npm": { "publish": false, "skipChecks": true },
				"plugins": {
					"@release-it/conventional-changelog": {
						"infile": "CHANGELOG.md",
						"preset": "conventionalcommits",
						"types": [
							{ "section": "Features", "type": "feat" },
							{ "section": "Bug Fixes", "type": "fix" },
							{ "section": "Performance Improvements", "type": "perf" },
							{ "hidden": true, "type": "build" },
							{ "hidden": true, "type": "chore" },
							{ "hidden": true, "type": "ci" },
							{ "hidden": true, "type": "docs" },
							{ "hidden": true, "type": "refactor" },
							{ "hidden": true, "type": "style" },
							{ "hidden": true, "type": "test" }
						]
					}
				}
			}
			",
			  },
			  "suggestions": [
			    "- add test-owner/test-repository and \`release.yaml\` as a Trusted Publisher on:
			   https://www.npmjs.com/package/test-repository/access",
			  ],
			}
		`);
	});

	test("marks its workflows as previously .yml files", () => {
		const creation = testBlock(blockReleaseIt, { options: optionsBase });

		expect(creation.files?.[".github"]).toMatchObject({
			workflows: {
				"post-release.yaml": [
					expect.any(String),
					{ previously: ["post-release.yml"] },
				],
				"release.yaml": [expect.any(String), { previously: ["release.yml"] }],
			},
		});
	});

	test("with git props", () => {
		const creation = testBlock(blockReleaseIt, {
			options: optionsBase,
			props: {
				git: {
					getLatestTagFromAllRefs: true,
					requireCommits: false,
				},
			},
		});

		expect(
			JSON.parse(
				(creation.files?.[".release-it.json"] as string | undefined) ?? "",
			),
		).toMatchObject({
			git: {
				commitMessage: "chore: release v${version}",
				getLatestTagFromAllRefs: true,
				pushArgs: ["--follow-tags", "--atomic"],
				requireCommits: true,
			},
		});
	});

	describe("intake", () => {
		it("returns undefined when .release-it.json does not exist", () => {
			const actual = testIntake(blockReleaseIt, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when .release-it.json has no git options", () => {
			const actual = testIntake(blockReleaseIt, {
				files: {
					".release-it.json": [JSON.stringify({ npm: { publish: false } })],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when .release-it.json only has git options the block sets", () => {
			const actual = testIntake(blockReleaseIt, {
				files: {
					".release-it.json": [
						JSON.stringify({
							git: {
								commitMessage: "chore: release v${version}",
								pushArgs: ["--atomic", "--follow-tags"],
								requireCommits: true,
							},
						}),
					],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns other git options when .release-it.json has them", () => {
			const actual = testIntake(blockReleaseIt, {
				files: {
					".release-it.json": [
						JSON.stringify({
							git: {
								commitMessage: "chore: release v${version}",
								getLatestTagFromAllRefs: true,
								requireCommits: true,
							},
						}),
					],
				},
			});

			expect(actual).toEqual({ git: { getLatestTagFromAllRefs: true } });
		});
	});
});
