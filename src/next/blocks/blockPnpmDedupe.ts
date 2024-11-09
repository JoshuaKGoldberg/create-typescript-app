import { schema } from "../schema.js";

export const blockPnpmDedupe = schema.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			commands: ["pnpm dedupe"],
			documentation: {
				"Linting Duplicate Packages": {
					level: 3,
					text: `[pnpm dedupe --check](https://pnpm.io/cli/dedupe) is used to check for unnecessarily duplicated packages in the \`pnpm-lock.yml\` file.
You can run it with \`pnpm lint:packages\`:

\`\`\`shell
pnpm lint:packages
\`\`\`
`,
				},
			},
			jobs: [
				{
					name: "Lint Packages",
					steps: [{ run: "pnpm lint:packages" }],
				},
			],
			package: {
				scripts: {
					"lint:packages": "pnpm dedupe --check",
				},
			},
		};
	},
});
