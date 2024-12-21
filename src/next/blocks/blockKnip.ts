import { base } from "../base.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { getPackageDependencies, getPackageDependency } from "./packageData.js";

export const blockKnip = base.createBlock({
	about: {
		name: "Knip",
	},
	produce() {
		return {
			addons: [
				blockDevelopmentDocs({
					sections: {
						Linting: {
							contents: {
								items: [
									`- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports`,
								],
							},
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
						devDependencies: getPackageDependencies("knip"),
						scripts: {
							"lint:knip": "knip",
						},
					},
				}),
			],
			files: {
				"knip.json": JSON.stringify({
					$schema: `https://unpkg.com/knip@${getPackageDependency("knip")}/schema.json`,
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
