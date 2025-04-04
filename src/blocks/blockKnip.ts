import removeUndefinedObjects from "remove-undefined-objects";
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
import { intakeFileAsJson } from "./intake/intakeFileAsJson.js";

const zStringArray = z.array(z.string());

export const blockKnip = base.createBlock({
	about: {
		name: "Knip",
	},
	addons: {
		entry: zStringArray.optional(),
		ignoreDependencies: zStringArray.optional(),
		project: zStringArray.optional(),
	},
	intake({ files }) {
		const knipJson = intakeFileAsJson(files, ["knip.json"]);
		if (!knipJson) {
			return undefined;
		}

		return removeUndefinedObjects({
			entry: zStringArray.safeParse(knipJson.entry).data,
			ignoreDependencies: zStringArray.safeParse(knipJson.ignoreDependencies)
				.data,
			project: zStringArray.safeParse(knipJson.project).data,
		});
	},
	produce({ addons }) {
		const { entry, ignoreDependencies, project } = addons;
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
					entry: entry?.sort(),
					ignoreDependencies,
					ignoreExportsUsedInFile: {
						interface: true,
						type: true,
					},
					project: project?.sort(),
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
