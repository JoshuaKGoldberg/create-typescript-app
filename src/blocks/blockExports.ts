import { z } from "zod";

import { base } from "../base.ts";
import { blockTSDown } from "./blockTSDown.ts";
import { blockVite } from "./blockVite.ts";
import { intakeFileAsJson } from "./intake/intakeFileAsJson.ts";

const zFilePath = z.string();
const zConditions = z.record(z.string(), z.unknown());
const zExports = z.union([
	zFilePath,
	z.object({ ".": z.union([zFilePath, zConditions]) }),
]);

// Conditions that Node.js may resolve when running the entry point directly
const runnableConditions = new Set(["default", "import", "node", "require"]);

export const blockExports = base.createBlock({
	about: {
		name: "Exports",
	},
	intake({ files }) {
		const packageData = intakeFileAsJson(files, ["package.json"]);
		const exports = zExports.safeParse(packageData?.exports).data;
		const entry = typeof exports === "string" ? exports : exports?.["."];

		// Conditional exports (e.g. "browser" or "import"/"require") are kept as-is
		if (typeof entry === "object") {
			const conditions = conditionsLibToDist(entry);
			const filePath = findRunnableFilePath(conditions);

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
		const main = zFilePath.safeParse(options.packageData?.main).data;
		const runArgsText = runArgs.map((arg) => ` ${arg}`).join("");

		return {
			extensions: [
				// The entry point is built by tsdown, so it's only set when tsdown is used
				blockTSDown({
					exports:
						conditions ??
						(filePath.startsWith(".") ? filePath : `./${filePath}`),
					...(main && { main: libToDist(main) }),
					runInCI: [`node ${filePath}${runArgsText}`],
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
): string | undefined {
	for (const [condition, value] of Object.entries(conditions)) {
		if (!runnableConditions.has(condition)) {
			continue;
		}

		if (typeof value === "string") {
			return value;
		}

		const nested = zConditions.safeParse(value).data;
		const filePath = nested && findRunnableFilePath(nested);
		if (filePath) {
			return filePath;
		}
	}

	return undefined;
}

function libToDist(filePath: string) {
	return filePath.replace(/^(?:\.\/)?lib\//u, "./dist/");
}
