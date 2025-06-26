import { testBlock } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockAllContributors } from "./blockAllContributors.js";
import { optionsBase } from "./options.fakes.js";

describe("blockAllContributors", () => {
	it("defaults contributors to [] when not provided", () => {
		const creation = testBlock(blockAllContributors, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "/.all-contributorsrc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "badges": [
			          {
			            "alt": "👪 All Contributors: undefined",
			            "comments": {
			              "after": "
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->",
			              "before": "<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				",
			            },
			            "href": "#contributors",
			            "src": "https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-undefined-21bb42.svg",
			          },
			        ],
			        "sections": undefined,
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
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".all-contributorsrc": "{
			  "badgeTemplate": "\\t<a href=\\"#contributors\\" target=\\"_blank\\"><img alt=\\"👪 All Contributors: <%= contributors.length %>\\" src=\\"https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg\\" /></a>",
			  "commitType": "docs",
			  "contributors": [],
			  "contributorsPerLine": 7,
			  "contributorsSortAlphabetically": true,
			  "files": [
			    "README.md"
			  ],
			  "projectName": "test-repository",
			  "projectOwner": "test-owner",
			  "repoType": "github"
			}",
			    ".github": {
			      "workflows": {
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
			        uses: JoshuaKGoldberg/all-contributors-auto-action@v0.5.0


			name: Contributors


			on:
			  push:
			    branches:
			      - main
			",
			      },
			    },
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpx all-contributors-cli@6.23.1 add test-owner code,content,doc,ideas,infra,maintenance,projectManagement,tool",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	it("runs add including existing owner contributions when they exist", () => {
		const creation = testBlock(blockAllContributors, {
			options: {
				...optionsBase,
				contributors: [
					{
						avatar_url: "https://avatars.githubusercontent.com/u/3335181?v=4",
						contributions: ["bug", "code", "design", "doc", "test", "tool"],
						login: "JoshuaKGoldberg",
						name: "Josh Goldberg",
						profile: "http://www.joshuakgoldberg.com",
					},
				],
				owner: "JoshuaKGoldberg",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "/.all-contributorsrc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "badges": [
			          {
			            "alt": "👪 All Contributors: 1",
			            "comments": {
			              "after": "
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->",
			              "before": "<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				",
			            },
			            "href": "#contributors",
			            "src": "https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg",
			          },
			        ],
			        "sections": [
			          "## Contributors

			<!-- spellchecker: disable -->
			<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			<!-- prettier-ignore-start -->
			<!-- markdownlint-disable -->
			<table>
			  <tbody>
			    <tr>
			      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#design-JoshuaKGoldberg" title="Design">🎨</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=JoshuaKGoldberg" title="Tests">⚠️</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
			    </tr>
			  </tbody>
			</table>

			<!-- markdownlint-restore -->
			<!-- prettier-ignore-end -->

			<!-- ALL-CONTRIBUTORS-LIST:END -->
			<!-- spellchecker: enable -->",
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
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".all-contributorsrc": "{
			  "badgeTemplate": "\\t<a href=\\"#contributors\\" target=\\"_blank\\"><img alt=\\"👪 All Contributors: <%= contributors.length %>\\" src=\\"https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg\\" /></a>",
			  "commitType": "docs",
			  "contributors": [
			    {
			      "avatar_url": "https://avatars.githubusercontent.com/u/3335181?v=4",
			      "contributions": [
			        "bug",
			        "code",
			        "design",
			        "doc",
			        "test",
			        "tool"
			      ],
			      "login": "JoshuaKGoldberg",
			      "name": "Josh Goldberg",
			      "profile": "http://www.joshuakgoldberg.com"
			    }
			  ],
			  "contributorsPerLine": 7,
			  "contributorsSortAlphabetically": true,
			  "files": [
			    "README.md"
			  ],
			  "projectName": "test-repository",
			  "projectOwner": "JoshuaKGoldberg",
			  "repoType": "github"
			}",
			    ".github": {
			      "workflows": {
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
			        uses: JoshuaKGoldberg/all-contributors-auto-action@v0.5.0


			name: Contributors


			on:
			  push:
			    branches:
			      - main
			",
			      },
			    },
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpx all-contributors-cli@6.23.1 add JoshuaKGoldberg bug,code,design,doc,test,tool,content,ideas,infra,maintenance,projectManagement",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});

	it("adds full owner contributions when no existing contributor is the owner", () => {
		const creation = testBlock(blockAllContributors, {
			options: {
				...optionsBase,
				contributors: [
					{
						avatar_url: "https://avatars.githubusercontent.com/u/3335181?v=4",
						contributions: ["bug", "code", "design", "doc", "test", "tool"],
						login: "other",
						name: "Other",
						profile: "http://www.example.com",
					},
				],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignores": [
			          "/.all-contributorsrc",
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "badges": [
			          {
			            "alt": "👪 All Contributors: 1",
			            "comments": {
			              "after": "
			<!-- ALL-CONTRIBUTORS-BADGE:END -->
				<!-- prettier-ignore-end -->",
			              "before": "<!-- prettier-ignore-start -->
				<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
				",
			            },
			            "href": "#contributors",
			            "src": "https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg",
			          },
			        ],
			        "sections": [
			          "## Contributors

			<!-- spellchecker: disable -->
			<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
			<!-- prettier-ignore-start -->
			<!-- markdownlint-disable -->
			<table>
			  <tbody>
			    <tr>
			      <td align="center" valign="top" width="14.28%"><a href="http://www.example.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Other"/><br /><sub><b>Other</b></sub></a><br /><a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3Aother" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=other" title="Code">💻</a> <a href="#design-other" title="Design">🎨</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=other" title="Documentation">📖</a> <a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=other" title="Tests">⚠️</a> <a href="#tool-other" title="Tools">🔧</a></td>
			    </tr>
			  </tbody>
			</table>

			<!-- markdownlint-restore -->
			<!-- prettier-ignore-end -->

			<!-- ALL-CONTRIBUTORS-LIST:END -->
			<!-- spellchecker: enable -->",
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
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			  "files": {
			    ".all-contributorsrc": "{
			  "badgeTemplate": "\\t<a href=\\"#contributors\\" target=\\"_blank\\"><img alt=\\"👪 All Contributors: <%= contributors.length %>\\" src=\\"https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-<%= contributors.length %>-21bb42.svg\\" /></a>",
			  "commitType": "docs",
			  "contributors": [
			    {
			      "avatar_url": "https://avatars.githubusercontent.com/u/3335181?v=4",
			      "contributions": [
			        "bug",
			        "code",
			        "design",
			        "doc",
			        "test",
			        "tool"
			      ],
			      "login": "other",
			      "name": "Other",
			      "profile": "http://www.example.com"
			    }
			  ],
			  "contributorsPerLine": 7,
			  "contributorsSortAlphabetically": true,
			  "files": [
			    "README.md"
			  ],
			  "projectName": "test-repository",
			  "projectOwner": "test-owner",
			  "repoType": "github"
			}",
			    ".github": {
			      "workflows": {
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
			        uses: JoshuaKGoldberg/all-contributors-auto-action@v0.5.0


			name: Contributors


			on:
			  push:
			    branches:
			      - main
			",
			      },
			    },
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpx all-contributors-cli@6.23.1 add test-owner code,content,doc,ideas,infra,maintenance,projectManagement,tool",
			      ],
			      "phase": 3,
			    },
			  ],
			}
		`);
	});
});
