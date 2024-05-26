import { Options } from "../../shared/types.js";

export function generateTopContent(options: Options, existingBadges: string[]) {
	const remainingExistingBadges = new Set(existingBadges);
	const badges: string[] = [];

	for (const [badgeLine, existingMatcher] of [
		[
			!options.excludeAllContributors &&
				`<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/👪_all_contributors-1-21bb42.svg" /></a>
	<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->`,
			/<a\s+href.*contributors.*All\s+Contributors/,
		],
		[
			`<a href="https://github.com/${options.owner}/${options.repository}/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>`,
			/CODE_OF_CONDUCT\.md/,
		],
		[
			!options.excludeTests &&
				`<a href="https://codecov.io/gh/${options.owner}/${options.repository}" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage" /></a>`,
			/https:\/\/codecov\.io\/gh/,
		],
		[
			`<a href="https://github.com/${options.owner}/${options.repository}/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>`,
			/LICENSE\.(md|txt)/,
		],
		[
			`<a href="http://npmjs.com/package/${options.repository}"><img alt="📦 npm version" src="https://img.shields.io/npm/v/${options.repository}?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>`,
			/npm.*v/i,
		],
		[
			`<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />`,
			/typescript.*strict/i,
		],
	] as const) {
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

	return `<h1 align="center">${options.title}</h1>

<p align="center">${options.description}</p>

<p align="center">
${[...badges, ...remainingExistingBadges]
	.map((badge) => `\t${badge}`)
	.join("\n")}
</p>${
		options.logo
			? `

<img align="right" alt="${options.logo.alt}" src="${options.logo.src}">

`
			: ""
	}${
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
