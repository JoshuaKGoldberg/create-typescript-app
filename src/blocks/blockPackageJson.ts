import removeUndefinedObjects from "remove-undefined-objects";
import semver from "semver";
import sortPackageJson from "sort-package-json";
import { z } from "zod";
import { PackageJson } from "zod-package-json";

import { base } from "../base.ts";
import { formatFile } from "../utils/formatFile.ts";
import { htmlToTextSafe } from "../utils/htmlToTextSafe.ts";
import { resolveEmails } from "../utils/resolveEmails.ts";
import { trimPrecedingSlash } from "../utils/trimPrecedingSlash.ts";
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
								files: processFiles([
									...filterExistingFiles(
										addons.existingFiles,
										addons.outdatedFiles,
										options.bin,
									),
									...(addons.properties.files ?? []),
								]),
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

function filterExistingFiles(
	existingFiles: string[],
	outdatedFiles: string[],
	bin: Record<string, string | undefined> | string | undefined,
) {
	const removals = new Set([
		...outdatedFiles,

		// Older versions of this template listed files npm always includes anyway
		...(typeof bin === "object" ? Object.values(bin) : [bin]).map(
			trimPrecedingSlash,
		),
		"LICENSE.md",
		"package.json",
		"README.md",
	]);

	return existingFiles.filter(
		(file) => !removals.has(trimPrecedingSlash(file)),
	);
}

function processFiles(files: string[]) {
	const unique = Array.from(new Set(files.filter(Boolean)));

	// If no files have been specified, we can skip the property altogether
	if (!unique.length) {
		return undefined;
	}

	// Negated entries only exclude files from earlier entries, so they go last
	const negations = unique.filter((file) => file.startsWith("!"));

	// First sort so that shorter entries are first (e.g. "lib/")...
	const sortedByLength = unique
		.filter((file) => !file.startsWith("!"))
		.sort((a, b) => a.length - b.length);

	// ...then remove entries captured by earlier directories (e.g. "lib/index.js")
	const patterns = sortedByLength.filter(
		(file, i) =>
			!sortedByLength
				.slice(0, i)
				.some((earlier) => earlier.endsWith("/") && file.startsWith(earlier)),
	);

	return [...patterns.sort(), ...negations];
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
