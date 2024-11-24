import { z } from "zod";

import { base } from "../base.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockVSCode } from "./blockVSCode.js";

export const blockCSpell = base.createBlock({
	about: {
		name: "CSpell",
	},
	addons: {
		ignores: z.array(z.string()).default([]),
	},
	produce({ addons }) {
		const { ignores } = addons;

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
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Spelling",
							steps: [{ run: "pnpm lint:spelling" }],
						},
					],
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
