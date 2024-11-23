import { base } from "../base.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";

export const blockKnip = base.createBlock({
	about: {
		name: "Knip",
	},
	produce() {
		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						"Linting With Knip": {
							level: 3,
							text: `[knip](https://github.com/webpro/knip) is used to detect unused files, dependencies, and code exports.
You can run it with \`pnpm lint:knip\`:

\`\`\`shell
pnpm lint:knip
\`\`\`
`,
						},
					},
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint Knip",
							steps: [{ run: "pnpm lint:knip" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: {
							knip: "5.27.2",
						},
						scripts: {
							"lint:knip": "knip",
						},
					},
				}),
			],
			files: {
				"knip.json": JSON.stringify({
					$schema: "https://unpkg.com/knip@latest/schema.json",
					entry: ["src/index.ts!"],
					ignoreExportsUsedInFile: {
						interface: true,
						type: true,
					},
					project: ["src/**/*.ts!"],
				}),
			},
		};
	},
});
