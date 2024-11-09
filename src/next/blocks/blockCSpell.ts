import { BlockPhase, MetadataFileType } from "create";

import { schema } from "../schema.js";

export const blockCSpell = schema.createBlock({
	about: {
		name: "CSpell",
	},
	phase: BlockPhase.Lint,
	produce({ created }) {
		return {
			documentation: {
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
			editor: { extensions: ["streetsidesoftware.code-spell-checker"] },
			files: {
				"cspell.json": JSON.stringify({
					dictionaries: ["typescript"],
					ignorePaths: [
						".github",
						"CHANGELOG.md",
						"lib",
						"node_modules",
						"pnpm-lock.yaml",
						...created.metadata
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
				scripts: {
					test: "vitest",
				},
			},
		};
	},
});
