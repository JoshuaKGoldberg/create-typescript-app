import { schema } from "../schema.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockVSCode } from "./blockVSCode.js";
import { MetadataFileType } from "./metadata.js";

export const blockCSpell = schema.createBlock({
	about: {
		name: "CSpell",
	},
	produce({ created }) {
		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						"Linting With CSpell": {
							level: 3,
							text: `[cspell](https://cspell.org) is used to spell check across all source files.
You can run it with \`pnpm lint:spelling\`:

\`\`\`shell
pnpm lint:spelling
\`\`\`
`,
						},
					},
				}),
				blockVSCode({
					extensions: ["streetsidesoftware.code-spell-checker"],
				}),
			],
			files: {
				"cspell.json": JSON.stringify({
					dictionaries: ["typescript"],
					ignorePaths: [
						".github",
						"CHANGELOG.md",
						"lib",
						"node_modules",
						"pnpm-lock.yaml",
						...created.metadata.files
							.filter((value) => value.type === MetadataFileType.Ignored)
							.map((value) => value.glob),
					].sort(),
				}),
			},
			jobs: [
				{
					name: "Lint Spelling",
					steps: [{ run: "pnpm lint:spelling" }],
				},
			],
			package: {
				devDependencies: {
					cspell: "latest",
				},
				scripts: {
					"lint:spelling": 'cspell "**" ".github/**/*"',
				},
			},
		};
	},
});
