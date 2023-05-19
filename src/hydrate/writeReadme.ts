import * as fs from "node:fs/promises";

import chalk from "chalk";

import { readFileSafe } from "./readFileSafe.js";
import { RepositorySettings } from "./repositorySettings.js";

const contributorsIndicator = `<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->`;

const allContributorsContent = `
## Contributors

<!-- spellchecker: disable -->
${contributorsIndicator}
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
<!-- (this will be filled in by all-contributors) -->
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
`;

export async function writeReadme(settings: RepositorySettings) {
	let contents = await readFileSafe("README.md", "");
	if (!contents) {
		console.log(chalk.gray("README.md doesn't appear to exist; creating."));
		await fs.writeFile(
			"README.md",
			[generateTopContent(settings), allContributorsContent].join("\n\n")
		);
		return;
	}

	const endOfH1 = findH1Close(contents);

	contents = [generateTopContent(settings), contents.slice(endOfH1)].join("");

	if (contents.includes(contributorsIndicator)) {
		console.log(
			chalk.gray("README.md already has Contributors section; skipping.")
		);
	} else {
		console.log(
			chalk.gray("README.md doesn't appear have Contributors section; adding.")
		);
		contents = [contents, allContributorsContent].join("\n\n");
	}

	await fs.writeFile("README.md", contents);
}

function findH1Close(contents: string) {
	const markdownMatch = contents.match(/^#.+/);
	if (markdownMatch) {
		return (markdownMatch.index ?? 0) + markdownMatch[0].length;
	}

	return contents.indexOf("</h1>") + "</h1>".length;
}

function generateTopContent(settings: RepositorySettings) {
	return `<h1 align="center">${settings.title}</h1>

<p align="center">${settings.description}</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 17" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	</a>
	<a href="https://codecov.io/gh/${settings.owner}/${
		settings.repository
	}" target="_blank">${
		settings.unitTests
			? `
	<img alt="Codecov Test Coverage" src="https://codecov.io/gh/${settings.owner}/${settings.repository}/branch/main/graph/badge.svg?token=INSERT_CODECOV_TOKEN_HERE"/>`
			: ""
	}
	</a>
	<a href="https://github.com/${settings.owner}/${
		settings.repository
	}/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/${settings.owner}/${
		settings.repository
	}/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/${
			settings.owner
		}/${settings.repository}?color=21bb42">
	</a>${
		settings.funding
			? `
	<a href="https://github.com/sponsors/${settings.owner}" target="_blank">
		<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
	</a>`
			: ""
	}
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>`;
}
