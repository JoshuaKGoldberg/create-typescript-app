import { z } from "zod";

import { base } from "../base.js";

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
		badges: z.array(z.string()).default([]),
		notices: z.array(z.string()).default([]),
		sections: z.array(z.string()).default([]),
	},
	produce({ addons, options }) {
		const { badges, notices, sections } = addons;

		const logo =
			options.logo &&
			`\n<img ${printAttributes({ align: "right", ...options.logo })}>\n`;

		const explainer =
			options.explainer && `\n${options.explainer.join("\n")}\n`;

		return {
			files: {
				"README.md": `<h1 align="center">${options.title}</h1>

<p align="center">${formatDescription(options.description)}</p>

<p align="center">${badges.length ? badges.map((badge) => `\n\t${badge}`).join("\n") : ""}
	<a href="https://github.com/${options.owner}/${options.repository}/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/${options.owner}/${options.repository}" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/${options.owner}/${options.repository}/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/${options.repository}"><img alt="📦 npm version" src="https://img.shields.io/npm/v/${options.repository}?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>
${[logo, explainer].filter(Boolean).join("")}
## Usage

${options.usage}

## Development

See [\`.github/CONTRIBUTING.md\`](./.github/CONTRIBUTING.md), then [\`.github/DEVELOPMENT.md\`](./.github/DEVELOPMENT.md).
Thanks! 💖
${sections.map((section) => `\n${section}`).join("")}
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
