import removeUndefinedObjects from "remove-undefined-objects";
import semver from "semver";
import sortPackageJson from "sort-package-json";
import { z } from "zod";
import { PackageJson } from "zod-package-json";

import { base } from "../base.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { htmlToTextSafe } from "./html/htmlToTextSafe.js";
import { CommandPhase } from "./phases.js";

const PackageJsonWithNullableScripts = PackageJson.partial().extend({
	scripts: z
		.record(z.string(), z.union([z.string(), z.undefined()]))
		.optional(),
});

export const blockPackageJson = base.createBlock({
	about: {
		name: "Package JSON",
	},
	addons: {
		cleanupCommands: z.array(z.string()).default([]),
		properties: PackageJsonWithNullableScripts.default({}),
	},
	produce({ addons, offline, options }) {
		const dependencies = useLargerVersions(options.packageData?.dependencies, {
			...options.packageData?.dependencies,
			...addons.properties.dependencies,
		});
		const devDependencies = useLargerVersions(
			options.packageData?.devDependencies,
			{
				...options.packageData?.devDependencies,
				...addons.properties.devDependencies,
			},
		);
		const description = htmlToTextSafe(options.description);

		return {
			files: {
				"package.json": sortPackageJson(
					JSON.stringify(
						removeUndefinedObjects({
							...options.packageData,
							...addons.properties,
							author: { email: options.email.npm, name: options.author },
							bin: options.bin,
							dependencies: Object.keys(dependencies).length
								? dependencies
								: undefined,
							description,
							devDependencies: Object.keys(devDependencies).length
								? devDependencies
								: undefined,
							engines: {
								node: `>=${options.node.minimum}`,
							},
							...(options.pnpm && {
								packageManager: `pnpm@${options.pnpm}`,
							}),
							files: [
								...collectBinFiles(options.bin),
								...(addons.properties.files ?? []),
								"package.json",
								"README.md",
							]
								.filter(Boolean)
								.sort(),
							keywords: options.keywords,
							license: "MIT",
							name: options.repository,
							repository: {
								type: "git",
								url: `git+https://github.com/${options.owner}/${options.repository}.git`,
							},
							scripts: {
								...options.packageData?.scripts,
								...addons.properties.scripts,
							},
							type: "module",
							version: options.version ?? "0.0.0",
						}),
					),
				),
			},
			scripts: [
				{
					commands: [
						`pnpm install ${offline ? "--offline " : ""}--no-frozen-lockfile`,
						...addons.cleanupCommands,
					],
					phase: CommandPhase.Install,
				},
			],
		};
	},
	transition() {
		return {
			addons: [blockRemoveFiles({ files: ["package-lock.json yarn.lock"] })],
		};
	},
});

function collectBinFiles(bin: Record<string, string> | string | undefined) {
	if (!bin) {
		return [];
	}

	const files = typeof bin === "object" ? Object.values(bin) : [bin];

	return files.map((file) => file.replace(/^\.\//, ""));
}

function removeRangePrefix(version: string) {
	const raw = version.replaceAll(/[\^~><=]/gu, "").split(" ")[0];

	return semver.coerce(raw) ?? raw;
}

function useLargerVersion(existing: string | undefined, replacement: string) {
	if (!existing || existing === replacement) {
		return replacement;
	}

	const existingCoerced = semver.coerce(removeRangePrefix(existing));

	return existingCoerced &&
		semver.gt(existingCoerced, removeRangePrefix(replacement))
		? existing
		: replacement;
}

function useLargerVersions(
	existing: Record<string, string | undefined> | undefined,
	replacements: Record<string, string>,
) {
	if (!existing) {
		return replacements;
	}

	return Object.fromEntries(
		Object.entries(replacements).map(([key, replacement]) => [
			key,
			useLargerVersion(existing[key], replacement),
		]),
	);
}
