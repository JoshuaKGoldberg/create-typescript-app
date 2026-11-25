import { IntakeDirectory } from "bingo-fs";
import removeUndefinedObjects from "remove-undefined-objects";
import { z } from "zod";

import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.ts";
import { blockVSCode } from "./blockVSCode.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";
import { intakeFileExportObject } from "./intake/intakeFileExportObject.ts";

const zStringArray = z.array(z.string());

const zIgnoreIssues = z.record(z.string(), zStringArray);

export const blockKnip = base.createBlock({
	about: {
		name: "Knip",
	},
	intake({ files }) {
		const knipJson =
			intakeFileExportObject(files, ["knip.config.ts"]) ??
			intakeFileAsJson(files, ["knip.json"]) ??
			intakeFileAsJson(files, ["knip.jsonc"]);
		if (!knipJson) {
			return undefined;
		}

		return removeUndefinedObjects({
			entry: removeRedundantIndexEntry(
				files,
				zStringArray.safeParse(knipJson.entry).data,
			),
			ignore: zStringArray.safeParse(knipJson.ignore).data,
			ignoreDependencies: zStringArray.safeParse(knipJson.ignoreDependencies)
				.data,
			ignoreIssues: zIgnoreIssues.safeParse(knipJson.ignoreIssues).data,
			project: zStringArray.safeParse(knipJson.project).data,
		});
	},
	produce({ props }) {
		const { entry, ignore, ignoreDependencies, ignoreIssues, project } = props;
		return {
			extensions: [
				blockDevelopmentDocs({
					sections: {
						Linting: {
							contents: {
								items: [
									`- \`pnpm lint:knip\` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports`,
									`- \`pnpm lint:knip:production\` ([knip](https://knip.dev/features/production-mode)): Detects unused files, dependencies, and code exports in production code, not counting usage from tests`,
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
						{
							name: "Lint Knip Production",
							steps: [{ run: "pnpm lint:knip:production" }],
						},
					],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("knip"),
						scripts: {
							"lint:knip": "knip",
							"lint:knip:production": "knip --production",
						},
					},
				}),
				blockRemoveFiles({
					files: [".ts-prunerc*"],
				}),
				blockVSCode({
					extensions: ["webpro.vscode-knip"],
				}),
			],
			files: {
				"knip.config.ts": withPreviously(
					formatFile(
						"knip.config.ts",
						`import type { KnipConfig } from "knip";

export default ${JSON.stringify({
							entry: entry?.sort(),
							ignore: ignore?.sort(),
							ignoreDependencies,
							ignoreExportsUsedInFile: {
								interface: true,
								type: true,
							},
							ignoreIssues,
							project: project && dedupeProductionPatterns(project).sort(),
							treatConfigHintsAsErrors: true,
						})} satisfies KnipConfig;`,
					),
					["knip.json"],
				),
			},
		};
	},
	props: {
		entry: zStringArray.optional(),
		ignore: zStringArray.optional(),
		ignoreDependencies: zStringArray.optional(),
		ignoreIssues: zIgnoreIssues.optional(),
		project: zStringArray.optional(),
	},
	transition() {
		return {
			extensions: [
				blockRemoveFiles({
					files: [
						".knip*",
						"knip.{cjs,js,mjs}",
						"knip.config.{c,j,m}*",
						"knip.json*",
					],
				}),
				blockRemoveWorkflows({
					workflows: ["knip", "lint-knip"],
				}),
			],
		};
	},
});

// Patterns ending in ! are also used in --production mode, so they replace
// any older copies of the same pattern without the suffix
function dedupeProductionPatterns(patterns: string[]) {
	const unique = new Set(patterns);

	return Array.from(unique).filter((pattern) => !unique.has(`${pattern}!`));
}

function hasBuiltIndexEntryPoint(files: IntakeDirectory) {
	const packageData = intakeFileAsJson(files, ["package.json"]);
	const exports = packageData?.exports;
	const entryPoint =
		typeof exports === "string"
			? exports
			: ((exports as Record<string, unknown> | undefined)?.["."] ??
				packageData?.main);

	return (
		typeof entryPoint === "string" &&
		/^(?:\.\/)?(?:dist|lib)\/index\.js$/u.test(entryPoint)
	);
}

function removeRedundantIndexEntry(
	files: IntakeDirectory,
	entry: string[] | undefined,
) {
	if (!entry?.includes("src/index.ts") || !hasBuiltIndexEntryPoint(files)) {
		return entry;
	}

	const filtered = entry.filter((pattern) => pattern !== "src/index.ts");

	return filtered.length ? filtered : undefined;
}
