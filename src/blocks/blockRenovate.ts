import { z } from "zod";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { blockGitHubApps } from "./blockGitHubApps.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

const zCustomManagers = z.array(z.record(z.string(), z.unknown())).default([]);
const zGitIgnoredAuthors = z.array(z.string()).default([]);
const zIgnoreDeps = z.array(z.string()).default([]);
const zPackageRules = z.array(z.record(z.string(), z.unknown())).default([]);

const configPathsByPrecedence = [
	["renovate.json"],
	["renovate.jsonc"],
	["renovate.json5"],
	[".github", "renovate.json"],
	[".github", "renovate.jsonc"],
	[".github", "renovate.json5"],
	[".renovaterc"],
	[".renovaterc.json"],
	[".renovaterc.jsonc"],
	[".renovaterc.json5"],
];

export const blockRenovate = base.createBlock({
	about: {
		name: "Renovate",
	},
	intake({ files }) {
		const configs = configPathsByPrecedence
			.toReversed()
			.map((filePath) => intakeFileAsJson(files, filePath));

		function collect<T>(key: string, schema: z.ZodType<T[]>) {
			const values = configs.flatMap(
				(config) => schema.safeParse(config?.[key]).data ?? [],
			);

			return Array.from(
				new Map(values.map((value) => [JSON.stringify(value), value])).values(),
			);
		}

		return {
			customManagers: collect("customManagers", zCustomManagers),
			gitIgnoredAuthors: collect("gitIgnoredAuthors", zGitIgnoredAuthors),
			ignoreDeps: collect("ignoreDeps", zIgnoreDeps),
			packageRules: collect("packageRules", zPackageRules),
		};
	},
	produce({ props }) {
		const { customManagers, gitIgnoredAuthors, ignoreDeps, packageRules } =
			props;

		return {
			extensions: [
				blockGitHubApps({
					apps: [
						{
							name: "Renovate",
							url: "https://github.com/apps/renovate",
						},
					],
				}),
			],
			files: {
				".github": {
					"renovate.json": formatFile(
						".github/renovate.json",
						JSON.stringify({
							$schema: "https://docs.renovatebot.com/renovate-schema.json",
							automerge: true,
							...(customManagers.length && { customManagers }),
							extends: [
								":preserveSemverRanges",
								"config:best-practices",
								"replacements:all",
							],
							...(gitIgnoredAuthors.length && { gitIgnoredAuthors }),
							ignoreDeps: Array.from(
								new Set(["codecov/codecov-action", ...ignoreDeps]),
							).sort(),
							labels: ["dependencies"],
							minimumReleaseAge: "7 days",
							...(packageRules.length && { packageRules }),
							patch: { enabled: false },
							postUpdateOptions: ["pnpmDedupe"],
						}),
					),
				},
			},
		};
	},
	props: {
		customManagers: zCustomManagers,
		gitIgnoredAuthors: zGitIgnoredAuthors,
		ignoreDeps: zIgnoreDeps,
		packageRules: zPackageRules,
	},
	transition() {
		return {
			extensions: [
				blockRemoveFiles({
					files: [
						".github/renovate.{json5,jsonc}",
						".renovaterc",
						".renovaterc.{json,json5,jsonc}",
						"renovate.{json,json5,jsonc}",
					],
				}),
			],
		};
	},
});
