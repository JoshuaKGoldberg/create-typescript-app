import removeUndefinedObjects from "remove-undefined-objects";
import semver from "semver";
import sortPackageJson from "sort-package-json";
import { z } from "zod";
import { PackageJson } from "zod-package-json";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { htmlToTextSafe } from "../utils/htmlToTextSafe.ts";
import { resolveEmails } from "../utils/resolveEmails.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";
import { CommandPhase } from "./phases.ts";

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
		existingFiles: z.array(z.string()).default([]),
		outdatedFiles: z.array(z.string()).default([]),
		properties: PackageJsonWithNullableScripts.default({}),
	},
	intake({ files }) {
		const packageData = intakeFileAsJson(files, ["package.json"]);
		if (!Array.isArray(packageData?.files)) {
			return undefined;
		}

		return {
			existingFiles: packageData.files.filter(
				(file): file is string => typeof file === "string",
			),
		};
	},
	produce({ addons, offline, options }) {
		const dependencies = useLargerVersions(options.packageData?.dependencies, {
			...options.packageData?.dependencies,
			...addons.properties.dependencies,
		});
		const devDependencies = Object.fromEntries(
			Object.entries(
				useLargerVersions(options.packageData?.devDependencies, {
					...options.packageData?.devDependencies,
					...addons.properties.devDependencies,
				}),
			).filter(([name]) => !(name in dependencies)),
		);
		const description = htmlToTextSafe(options.description);

		return {
			files: {
				"package.json": formatFile(
					"package.json",
					sortPackageJson(
						JSON.stringify(
							removeUndefinedObjects({
								...options.packageData,
								...addons.properties,
								author: {
									email: resolveEmails(options.email).npm,
									name: options.author,
								},
								bin: options.bin,
								dependencies: Object.keys(dependencies).length
									? dependencies
									: undefined,
								description,
								devDependencies: Object.keys(devDependencies).length
									? devDependencies
									: undefined,
								engines: {
									node: /^\d/u.test(options.node.minimum)
										? `>=${options.node.minimum}`
										: options.node.minimum,
								},
								...(options.pnpm && {
									packageManager: `pnpm@${options.pnpm}`,
								}),
								files: mergeFiles(
									processFiles(addons.properties.files),
									addons.existingFiles,
									addons.outdatedFiles,
									options.bin,
								),
								keywords: options.keywords,
								name: options.repository,
								repository: {
									type: "git",
									url: `git+https://github.com/${options.owner}/${options.repository}.git`,
								},
								scripts: {
									...options.packageData?.scripts,
									...addons.properties.scripts,
								},
								type: options.type ?? "module",
								version: options.version ?? "0.0.0",
							}),
						),
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

function mergeFiles(
	addonFiles: string[],
	existingFiles: string[],
	outdatedFiles: string[],
	bin: Record<string, string | undefined> | string | undefined,
) {
	const removals = new Set(
		[
			...outdatedFiles,

			// Older versions of this template listed files npm always includes anyway
			...(typeof bin === "object" ? Object.values(bin) : [bin]),
			"LICENSE.md",
			"package.json",
			"README.md",
		]
			.filter((file) => file !== undefined)
			.map(normalizeFile),
	);
	const seen = new Set(addonFiles.map(normalizeFile));

	// Existing entries keep their order, as negations depend on earlier entries
	const files = [...addonFiles];

	for (const file of existingFiles) {
		const normalized = normalizeFile(file);
		if (normalized && !removals.has(normalized) && !seen.has(normalized)) {
			files.push(file);
			seen.add(normalized);
		}
	}

	// If no files have been specified, we can skip the property altogether
	return files.length ? files : undefined;
}

function normalizeFile(file: string) {
	return file.replace(/^(!?)\.?\//u, "$1").replace(/\/$/u, "");
}

function processFiles(files: string[] | undefined = []) {
	// First sort so that shorter entries are first (e.g. "lib/")...
	const sortedByLength = files
		.filter(Boolean)
		.sort((a, b) => a.length - b.length);

	// ...then remove entries captured by earlier directories (e.g. "lib/index.js")
	return sortedByLength
		.filter(
			(file, i) =>
				!sortedByLength
					.slice(0, i)
					.some((earlier) => earlier.endsWith("/") && file.startsWith(earlier)),
		)
		.sort();
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
