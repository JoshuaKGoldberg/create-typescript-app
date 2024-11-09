import { BlockPhase } from "create";

import { splitIntoSections } from "../../steps/writing/creation/dotGitHub/createDevelopment/splitIntoSections.js";
import { inputTextFile } from "../inputs/inputTextFile.js";
import { schema } from "../schema.js";

export const blockDevelopmentDocs = schema.createBlock({
	about: {
		name: "Development Docs",
	},
	phase: BlockPhase.Documentation,
	async produce({ created, options, take }) {
		const existingContents = await take(inputTextFile, {
			filePath: ".github/DEVELOPMENT.md",
		});

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

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

${Object.entries(created.documentation)
	.sort(([a], [b]) => a.localeCompare(b))
	.flatMap(([heading, content]) =>
		typeof content === "string"
			? [`## ${heading}`, content]
			: [`${"#".repeat(content.level)} ${heading}`, content.text],
	)
	.join("\n\n")}
`;

		const createdSectionHeadings = new Set([
			"Development",
			...Object.keys(created.documentation),
		]);

		const customSections = Object.fromEntries(
			splitIntoSections(existingContents ?? "").filter(([key]) => {
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
