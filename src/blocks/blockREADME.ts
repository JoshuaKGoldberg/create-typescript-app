import _ from "lodash";
import { z } from "zod";

import { base, Contributor } from "../base.js";

function printAttributes(attributes: Record<string, number | string>) {
	return Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.sort()
		.join(" ");
}

export const blockREADME = base.createBlock({
	about: {
		name: "README.md",
	},
	addons: {
		notices: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const { notices } = addons;
		const { contributors = [] } = options;

		const logo =
			options.logo &&
			`\n<img ${printAttributes({ align: "right", ...options.logo })}>`;

		const explainer = options.explainer && `\n${options.explainer.join("\n")}`;

		return {
			files: {
				"README.md": `<h1 align="center">${options.title}</h1>

<p align="center">${formatDescription(options.description)}</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: ${contributors.length}" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-${contributors.length}-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/${options.owner}/${options.repository}/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/${options.owner}/${options.repository}" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/${options.owner}/${options.repository}/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/${options.repository}"><img alt="📦 npm version" src="https://img.shields.io/npm/v/${options.repository}?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>
${[logo, explainer].filter(Boolean).join("\n\n")}
## Usage

${options.usage}

## Development

See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
Thanks! 💖

## Contributors

<!-- spellchecker: disable -->
${printAllContributorsTable(contributors)}
<!-- spellchecker: enable -->
${notices.length ? `\n${notices.map((notice) => notice.trim()).join("\n\n")}` : ""}`,
			},
		};
	},
});

function formatDescription(description: string) {
	if (!description.includes(". ")) {
		return description;
	}

	return "\n\t" + description.replaceAll(". ", ".\n\t") + "\n";
}

function printAllContributorsTable(contributors: Contributor[]) {
	return [
		`<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->`,
		`<!-- prettier-ignore-start -->`,
		`<!-- markdownlint-disable -->`,
		`<table>`,
		`  <tbody>`,
		`    <tr>`,
		// This intentionally uses the same sort as all-contributors-cli:
		// https://github.com/all-contributors/cli/blob/74bc388bd6f0ae2658e6495e9d3781d737438a97/src/generate/index.js#L76
		..._.sortBy(contributors, "name").flatMap((contributor, i) => {
			const row = printContributorCell(contributor);

			return i && i % 7 === 0 ? [`    </tr>`, `    <tr>`, row] : [row];
		}),
		`    </tr>`,
		`  </tbody>`,
		`</table>`,
		``,
		`<!-- markdownlint-restore -->`,
		`<!-- prettier-ignore-end -->`,
		``,
		`<!-- ALL-CONTRIBUTORS-LIST:END -->`,
	].join("\n");
}

function printContributorCell(contributor: Contributor) {
	return [
		`      <td align="center" valign="top" width="14.28%">`,
		`<a href="${contributor.profile}">`,
		`<img src="${contributor.avatar_url}?s=100" width="100px;" alt="${contributor.name}"/>`,
		`<br />`,
		`<sub><b>${contributor.name}</b></sub></a><br />`,
		...contributor.contributions
			.map((contribution) => {
				switch (contribution) {
					case "bug":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/issues?q=author%3A${contributor.login}" title="Bug reports">🐛</a>`;
					case "code":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=${contributor.login}" title="Code">💻</a>`;
					case "design":
						return `<a href="#design-${contributor.login}" title="Design">🎨</a>`;
					case "doc":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=${contributor.login}" title="Documentation">📖</a>`;
					case "ideas":
						return `<a href="#ideas-${contributor.login}" title="Ideas, Planning, & Feedback">🤔</a>`;
					case "infra":
						return `<a href="#infra-${contributor.login}" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a>`;
					case "maintenance":
						return `<a href="#maintenance-${contributor.login}" title="Maintenance">🚧</a>`;
					case "review":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/pulls?q=is%3Apr+reviewed-by%3A${contributor.login}" title="Reviewed Pull Requests">👀</a>`;
					case "test":
						return `<a href="https://github.com/JoshuaKGoldberg/create-typescript-app/commits?author=${contributor.login}" title="Tests">⚠️</a>`;
					case "tool":
						return `<a href="#tool-${contributor.login}" title="Tools">🔧</a>`;
					default:
						return `!(${contribution})!`;
				}
			})
			.join(" "),
		`</td>`,
	].join("");
}
