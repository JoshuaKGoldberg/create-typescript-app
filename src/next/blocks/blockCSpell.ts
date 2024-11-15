import { z } from "zod";

import { schema } from "../schema.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockVSCode } from "./blockVSCode.js";

export const blockCSpell = schema.createBlock({
	about: {
		name: "CSpell",
	},
	args: {
		ignores: z.array(z.string()).optional(),
	},
	produce({ args }) {
		const { ignores = [] } = args;
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
						...ignores,
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
