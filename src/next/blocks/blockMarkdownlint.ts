import { BlockPhase, MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockMarkdownlint = schema.createBlock({
	about: {
		name: "Markdownlint",
	},
	phase: BlockPhase.Lint,
	produce({ created }) {
		return {
			editor: { extensions: ["DavidAnson.vscode-markdownlint"] },
			files: {
				".markdownlint.json": JSON.stringify({
					extends: "markdownlint/style/prettier",
					"first-line-h1": false,
					"no-inline-html": false,
				}),
				".markdownlintignore": [
					".github/CODE_OF_CONDUCT.md",
					"CHANGELOG.md",
					...created.metadata
						.filter((value) => value.type === MetadataFileType.Built)
						.map((value) => value.glob),
					"node_modules/",
				].join("\n"),
			},
			jobs: [
				{
					name: "Lint Markdown",
					steps: [{ run: "pnpm lint:md" }],
				},
			],
			package: {
				scripts: {
					"lint:md":
						'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
				},
			},
		};
	},
});
