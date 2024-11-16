import { base } from "../base.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";

export const blockPnpmDedupe = base.createBlock({
	about: {
		name: "pnpm Dedupe",
	},
	produce() {
		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
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
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Packages",
							steps: [{ run: "pnpm lint:packages" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						scripts: {
							"lint:packages": "pnpm dedupe --check",
						},
					},
				}),
			],
			commands: [
				{
					phase: 1,
					script: "pnpm dedupe",
				},
			],
		};
	},
});
