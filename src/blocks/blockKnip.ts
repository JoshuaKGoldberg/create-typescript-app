import { z } from "zod";

import { base } from "../base.js";
import {
	getPackageDependencies,
	getPackageDependency,
} from "../data/packageData.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";

export const blockKnip = base.createBlock({
	about: {
		name: "Knip",
	},
	addons: {
		ignoreDependencies: z.array(z.string()).optional(),
	},
	produce({ addons }) {
		const { ignoreDependencies } = addons;
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
					entry: ["src/index.ts", "src/**/*.test.*"],
					ignoreDependencies,
					ignoreExportsUsedInFile: {
						interface: true,
						type: true,
					},
					project: ["src/**/*.ts"],
				}),
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".knip*", "knip.{c,m,t}*", "knip.js", "knip.jsonc"],
				}),
				blockRemoveWorkflows({
					workflows: ["knip", "lint-knip"],
				}),
			],
		};
	},
});
