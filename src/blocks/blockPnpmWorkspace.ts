import _ from "lodash";
import { z } from "zod";

import { base } from "../base.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { intakeFile } from "./intake/intakeFile.ts";
import { loadYamlSafe } from "./intake/intakeFileAsYaml.ts";

const zProperties = z.record(z.string(), z.unknown());

export const blockPnpmWorkspace = base.createBlock({
	about: {
		name: "pnpm Workspace",
	},
	addons: {
		// Kept separate from properties so existing values don't conflict with them
		existing: zProperties.optional(),
		properties: zProperties.default({}),
	},
	intake({ files }) {
		const file = intakeFile(files, ["pnpm-workspace.yaml"]);
		const { data } = zProperties.safeParse(file && loadYamlSafe(file[0]));

		return data && { existing: data };
	},
	produce({ addons }) {
		const { existing = {}, properties } = addons;
		const merged = mergeProperties(properties, existing);

		// Leaving an already-complete file untouched preserves its formatting and comments
		return Object.keys(merged).length && !_.isEqual(merged, existing)
			? { files: { "pnpm-workspace.yaml": formatYaml(merged) } }
			: {};
	},
});

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeProperties(
	properties: Record<string, unknown>,
	existing: Record<string, unknown>,
) {
	const merged = { ...properties, ...existing };

	for (const [key, value] of Object.entries(properties)) {
		const existingValue = existing[key];

		// Empty YAML keys such as "allowBuilds:" are parsed as null
		if (existingValue == null) {
			merged[key] = value;
		} else if (isPlainObject(value) && isPlainObject(existingValue)) {
			merged[key] = { ...value, ...existingValue };
		}
	}

	return merged;
}
