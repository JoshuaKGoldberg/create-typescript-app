import { z } from "zod";

import { splitIntoSections } from "../../steps/writing/creation/dotGitHub/createDevelopment/splitIntoSections.js";
import { base } from "../base.js";

export const blockDevelopmentDocs = base.createBlock({
	about: {
		name: "Development Docs",
	},
	addons: {
		hints: z.array(z.array(z.string())).default([]),
		sections: z
			.record(
				z.string(),
				z.union([
					z.string(),
					z.object({
						level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
						text: z.string(),
					}),
				]),
			)
			.default({}),
	},
	produce({ addons, options }) {
		const { hints, sections } = addons;
		const { documentation = "" } = options;

		const createdDocs = `# Development
${
	options.guide
		? `
> If you'd like a more guided walkthrough, see [${options.guide.title}](${options.guide.href}).
> It'll walk you through the common activities you'll need to contribute.`
		: ""
}

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

\`\`\`shell
git clone https://github.com/<your-name-here>/${options.repository}
cd ${options.repository}
pnpm install
\`\`\`

${hints.map((hint) => hint.map((line) => `> ${line}\n`).join("")).join("\n\n")}
> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.
${Object.entries(sections)
	.sort(([a], [b]) => a.localeCompare(b))
	.flatMap(([heading, content]) =>
		typeof content === "string"
			? [`## ${heading}`, content]
			: [`${"#".repeat(content.level)} ${heading}`, content.text],
	)
	.join("\n\n")}
`;

		const customSections = Object.fromEntries(
			splitIntoSections(documentation).filter(([key]) => {
				return !createdDocs.includes(`\n${key}`) && key !== "# Development";
			}),
		);

		const customDocs = Object.entries(customSections)
			.map(
				([heading, content]) => `${heading}

${content}`,
			)
			.join("\n\n");

		return {
			files: {
				".github": {
					"DEVELOPMENT.md": [createdDocs, customDocs]
						.filter(Boolean)
						.join("\n\n"),
				},
			},
		};
	},
});
