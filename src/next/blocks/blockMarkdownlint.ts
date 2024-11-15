import { schema } from "../schema.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVSCode } from "./blockVSCode.js";
import { MetadataFileType } from "./metadata.js";

export const blockMarkdownlint = schema.createBlock({
	about: {
		name: "Markdownlint",
	},
	produce({ created }) {
		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						"Linting With Markdownlint": {
							level: 3,
							text: `[Markdownlint](https://github.com/DavidAnson/markdownlint) is used to run linting on Markdown source files.
		You can run it with \`pnpm lint:md\`:
		
		\`\`\`shell
		pnpm lint:md
		\`\`\`
		`,
						},
					},
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Markdown",
							steps: [{ run: "pnpm lint:md" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							markdownlint: "latest",
							"markdownlint-cli": "latest",
							"sentences-per-line": "latest",
						},
						scripts: {
							"lint:md":
								'markdownlint "**/*.md" ".github/**/*.md" --rules sentences-per-line',
						},
					},
				}),
				blockVSCode({
					extensions: ["DavidAnson.vscode-markdownlint"],
				}),
			],
			files: {
				".markdownlint.json": JSON.stringify({
					extends: "markdownlint/style/prettier",
					"first-line-h1": false,
					"no-inline-html": false,
				}),
				".markdownlintignore": [
					".github/CODE_OF_CONDUCT.md",
					"CHANGELOG.md",
					...created.metadata.files
						.filter((value) => value.type === MetadataFileType.Built)
						.map((value) => value.glob),
					"node_modules/",
				].join("\n"),
			},
		};
	},
});
