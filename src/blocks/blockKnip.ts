import { z } from "zod";

import { base } from "../base.js";
import {
	getPackageDependencies,
	getPackageDependency,
} from "../data/packageData.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { CommandPhase } from "./phases.js";

export const blockKnip = base.createBlock({
	about: {
		name: "Knip",
	},
	addons: {
		ignoreDependencies: z.array(z.string()).optional(),
	},
	migrate() {
		return {
			scripts: [
				{
					commands: ["rm .knip* knip.*"],
					phase: CommandPhase.Migrations,
					silent: true,
				},
			],
		};
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
});
