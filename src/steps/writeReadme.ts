import fs from "node:fs/promises";

import { readFileSafe } from "../shared/readFileSafe.js";
import { Options } from "../shared/types.js";
import { endOfReadmeNotice } from "./updateReadme.js";

const contributorsIndicator = `<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->`;

function generateAllContributorsContent(options: Options) {
	return [
		`## Contributors`,
		``,
		`<!-- spellchecker: disable -->`,
		contributorsIndicator,
		`<!-- prettier-ignore-start -->`,
		!options.excludeLintMd && `<!-- markdownlint-disable -->`,
		`<table>`,
		`<!-- (this will be filled in by all-contributors) -->`,
		`</table>`,
		``,
		!options.excludeLintMd && `<!-- markdownlint-restore -->`,
		`<!-- prettier-ignore-end -->`,
		``,
		`<!-- ALL-CONTRIBUTORS-LIST:END -->`,
		`<!-- spellchecker: enable -->`,
	]
		.filter(Boolean)
		.join("\n");
}

export async function writeReadme(options: Options) {
	const allContributorsContent =
		!options.excludeContributors && generateAllContributorsContent(options);
	let contents = await readFileSafe("README.md", "");
	if (!contents) {
		await fs.writeFile(
			"README.md",
			[generateTopContent(options), allContributorsContent, endOfReadmeNotice]
				.filter(Boolean)
				.join("\n\n"),
		);
		return;
	}

	const endOfH1 = findH1Close(contents);

	contents = [generateTopContent(options), contents.slice(endOfH1)]
		.join("")
		.replace(/\[!\[.+\]\(.+\)\]\(.+\)/g, "")
		.replace(/!\[.+\]\(.+\)/g, "")
		.replaceAll("\r", "")
		.replaceAll("\n\n\n", "\n\n");

	if (allContributorsContent && !contents.includes(contributorsIndicator)) {
		contents = [contents, allContributorsContent].join("\n\n");
	}

	if (!contents.includes(endOfReadmeNotice)) {
		contents = [contents, endOfReadmeNotice].join("\n\n");
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

function generateTopContent(options: Options) {
	const badgeLines = [
		!options.excludeContributors &&
			`<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</a>`,
		!options.excludeTests &&
			`<a href="https://codecov.io/gh/${options.owner}/${options.repository}" target="_blank">
	<img alt="Codecov Test Coverage" src="https://codecov.io/gh/${options.owner}/${options.repository}/branch/main/graph/badge.svg"/>
</a>`,
		`<a href="https://github.com/${options.owner}/${options.repository}/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
	<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
</a>`,
		`<a href="https://github.com/${options.owner}/${options.repository}/blob/main/LICENSE.md" target="_blank">
	<img alt="License: MIT" src="https://img.shields.io/github/license/${options.owner}/${options.repository}?color=21bb42">
</a>`,
		options.funding &&
			`
		<a href="https://github.com/sponsors/${options.funding}" target="_blank">
			<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
		</a>`,
		`<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />`,
		`<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />`,
	].filter(Boolean);

	return `<h1 align="center">${options.title}</h1>

<p align="center">${options.description}</p>

<p align="center">
	${badgeLines.join("")}
</p>`;
}
