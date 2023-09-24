import { Options } from "../../shared/types.js";

export function generateTopContent(options: Options, existingBadges: string[]) {
	const remainingExistingBadges = new Set(existingBadges);
	const badges: string[] = [];

	function spliceBadge(
		badgeLine: false | string | undefined,
		existingMatcher: RegExp,
	) {
		const existingMatch = existingBadges.find((existingLine) =>
			existingMatcher.test(existingLine),
		);

		if (existingMatch) {
			remainingExistingBadges.delete(existingMatch);
		}

		if (badgeLine) {
			badges.push(badgeLine);
		}
	}

	for (const [badgeLine, existingMatcher] of [
		[
			!options.excludeContributors &&
				`<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 2" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
</a>`,
			/ALL-CONTRIBUTORS-BADGE:START/,
		],
		[
			!options.excludeTests &&
				`<a href="https://codecov.io/gh/${options.owner}/${options.repository}" target="_blank">
		<img alt="Codecov Test Coverage" src="https://codecov.io/gh/${options.owner}/${options.repository}/branch/main/graph/badge.svg"/>
	</a>`,
			/https:\/\/codecov\.io\/gh/,
		],
		[
			`<a href="https://github.com/${options.owner}/${options.repository}/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>`,
			/CODE_OF_CONDUCT\.md/,
		],
		[
			`<a href="https://github.com/${options.owner}/${options.repository}/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/${options.owner}/${options.repository}?color=21bb42">
	</a>`,
			/LICENSE\.(md|txt)/,
		],
		[
			options.funding &&
				`<a href="https://github.com/sponsors/${options.funding}" target="_blank">
		<img alt="Sponsor: On GitHub" src="https://img.shields.io/badge/sponsor-on_github-21bb42.svg" />
	</a>`,
			/github.+sponsors/,
		],
		[
			`<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />`,
			/style.*prettier/i,
		],
		[
			`<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />`,
			/typescript.*strict/i,
		],
		[
			`<img alt="npm package version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42" />`,
			/npm.*v/i,
		],
	] as const) {
		spliceBadge(badgeLine, existingMatcher);
	}

	return `<h1 align="center">${options.title}</h1>

<p align="center">${options.description}</p>

<p align="center">
${[...badges, ...remainingExistingBadges]
	.map((badge) => `\t${badge}`)
	.join("\n")}
</p>${
		options.mode === "migrate"
			? ""
			: `

## Usage

\`\`\`shell
npm i ${options.repository}
\`\`\`
\`\`\`ts
import { greet } from "${options.repository}";

greet("Hello, world! 💖");
\`\`\``
	}`;
}
