import { z } from "zod";
import { PackageJson } from "zod-package-json";

import { base } from "../base.ts";
import { blockTSDown } from "./blockTSDown.ts";
import { blockVite } from "./blockVite.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

const zBrowser = PackageJson.shape.browser;
const zFilePath = z.string();
const zConditions = z.record(z.string(), z.unknown());
const zExports = z.union([
	zFilePath,
	z.object({ ".": z.union([zFilePath, zConditions]) }),
]);

type Browser = NonNullable<z.infer<typeof zBrowser>>;

const runnableConditions = new Set(["default", "import", "node", "require"]);
const runnableImportConditions = new Set(["default", "import", "node"]);
const runnableRequireConditions = new Set(["default", "node", "require"]);

export const blockExports = base.createBlock({
	about: {
		name: "Exports",
	},
	intake({ files }) {
		const packageData = intakeFileAsJson(files, ["package.json"]);
		const exports = zExports.safeParse(packageData?.exports).data;
		const entry = typeof exports === "string" ? exports : exports?.["."];

		if (typeof entry === "object") {
			const conditions = conditionsLibToDist(entry);
			const filePath = findRunnableFilePath(conditions, runnableConditions);

			return { conditions, ...(filePath && { filePath }) };
		}

		const filePath =
			packageData?.exports === undefined
				? zFilePath.safeParse(packageData?.main).data
				: entry;

		return filePath ? { filePath: libToDist(filePath) } : undefined;
	},
	produce({ options, props }) {
		const { conditions, filePath = "./dist/index.mjs", runArgs } = props;
		const browser = zBrowser.safeParse(options.packageData?.browser).data;
		const main = zFilePath.safeParse(options.packageData?.main).data;
		const runArgsText = runArgs.map((arg) => ` ${arg}`).join("");

		return {
			extensions: [
				// The entry point is built by tsdown, so it's only set when tsdown is used
				blockTSDown({
					...(browser && { browser: browserLibToDist(browser) }),
					exports:
						conditions ??
						(filePath.startsWith(".") ? filePath : `./${filePath}`),
					...(main && { main: libToDist(main) }),
					runInCI: getRunnableFilePaths(filePath, conditions).map(
						(runnable) => `node ${runnable}${runArgsText}`,
					),
				}),
				blockVite({
					runInCI: [`node ./dist/index.mjs${runArgsText}`],
				}),
			],
		};
	},
	props: {
		conditions: zConditions.optional(),
		filePath: zFilePath.optional(),
		runArgs: z.array(z.string()).default([]),
	},
});

function browserLibToDist(browser: Browser) {
	return typeof browser === "string"
		? libToDist(browser)
		: Object.fromEntries(
				Object.entries(browser).map(([from, to]) => [
					libToDist(from),
					typeof to === "string" ? libToDist(to) : to,
				]),
			);
}

function conditionsLibToDist(conditions: Record<string, unknown>) {
	return Object.fromEntries(
		Object.entries(conditions).map(([condition, value]): [string, unknown] => [
			condition,
			typeof value === "string"
				? libToDist(value)
				: value && typeof value === "object" && !Array.isArray(value)
					? conditionsLibToDist(value as Record<string, unknown>)
					: value,
		]),
	);
}

function findRunnableFilePath(
	conditions: Record<string, unknown>,
	runnable: Set<string>,
): string | undefined {
	for (const [condition, value] of Object.entries(conditions)) {
		if (!runnable.has(condition)) {
			continue;
		}

		if (typeof value === "string") {
			return value;
		}

		const nested = zConditions.safeParse(value).data;
		const filePath = nested && findRunnableFilePath(nested, runnable);
		if (filePath) {
			return filePath;
		}
	}

	return undefined;
}

function getRunnableFilePaths(
	filePath: string,
	conditions: Record<string, unknown> = {},
) {
	const resolved = [runnableImportConditions, runnableRequireConditions]
		.map((runnable) => findRunnableFilePath(conditions, runnable))
		.filter((resolvedPath) => resolvedPath !== undefined);

	return resolved.includes(filePath)
		? Array.from(new Set([filePath, ...resolved]))
		: [filePath];
}

function libToDist(filePath: string) {
	return filePath.replace(/^(?:\.\/)?lib\//u, "./dist/");
}
