import { htmlToTextSafe } from "../utils/htmlToTextSafe.mjs";
import { base } from "../base.mjs";
import { CommandPhase } from "./phases.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { z } from "zod";
import semver from "semver";
import removeUndefinedObjects from "remove-undefined-objects";
import sortPackageJson from "sort-package-json";
import { PackageJson } from "zod-package-json";
//#region src/blocks/blockPackageJson.ts
const PackageJsonWithNullableScripts = PackageJson.partial().extend({ scripts: z.record(z.string(), z.union([z.string(), z.undefined()])).optional() });
const blockPackageJson = base.createBlock({
	about: { name: "Package JSON" },
	addons: {
		cleanupCommands: z.array(z.string()).default([]),
		properties: PackageJsonWithNullableScripts.default({})
	},
	produce({ addons, offline, options }) {
		const dependencies = useLargerVersions(options.packageData?.dependencies, {
			...options.packageData?.dependencies,
			...addons.properties.dependencies
		});
		const devDependencies = useLargerVersions(options.packageData?.devDependencies, {
			...options.packageData?.devDependencies,
			...addons.properties.devDependencies
		});
		const description = htmlToTextSafe(options.description);
		return {
			files: { "package.json": sortPackageJson(JSON.stringify(removeUndefinedObjects({
				...options.packageData,
				...addons.properties,
				author: {
					email: options.email.npm,
					name: options.author
				},
				bin: options.bin,
				dependencies: Object.keys(dependencies).length ? dependencies : void 0,
				description,
				devDependencies: Object.keys(devDependencies).length ? devDependencies : void 0,
				engines: { node: /^\d/u.test(options.node.minimum) ? `>=${options.node.minimum}` : options.node.minimum },
				...options.pnpm && { packageManager: `pnpm@${options.pnpm}` },
				files: processFiles(addons.properties.files),
				keywords: options.keywords,
				name: options.repository,
				repository: {
					type: "git",
					url: `git+https://github.com/${options.owner}/${options.repository}.git`
				},
				scripts: {
					...options.packageData?.scripts,
					...addons.properties.scripts
				},
				type: options.type ?? "module",
				version: options.version ?? "0.0.0"
			}))) },
			scripts: [{
				commands: [`pnpm install ${offline ? "--offline " : ""}--no-frozen-lockfile`, ...addons.cleanupCommands],
				phase: CommandPhase.Install
			}]
		};
	},
	transition() {
		return { addons: [blockRemoveFiles({ files: ["package-lock.json yarn.lock"] })] };
	}
});
function processFiles(files) {
	if (!files?.length) return;
	const sortedByLength = files.filter(Boolean).sort((a, b) => a.length - b.length);
	return sortedByLength.filter((file, i) => !sortedByLength.slice(0, i).some((earlier) => earlier.endsWith("/") && file.startsWith(earlier))).sort();
}
function removeRangePrefix(version) {
	const raw = version.replaceAll(/[\^~><=]/gu, "").split(" ")[0];
	return semver.coerce(raw) ?? raw;
}
function useLargerVersion(existing, replacement) {
	if (!existing || existing === replacement) return replacement;
	const existingCoerced = semver.coerce(removeRangePrefix(existing));
	return existingCoerced && semver.gt(existingCoerced, removeRangePrefix(replacement)) ? existing : replacement;
}
function useLargerVersions(existing, replacements) {
	if (!existing) return replacements;
	return Object.fromEntries(Object.entries(replacements).map(([key, replacement]) => [key, useLargerVersion(existing[key], replacement)]));
}
//#endregion
export { blockPackageJson };
