import { isDeepStrictEqual } from "node:util";
import { z } from "zod";

import { base } from "../base.ts";
import { isPlainObject } from "../utils/isPlainObject.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { intakeFile } from "./intake/intakeFile.ts";
import { loadYamlSafe } from "./intake/intakeFileAsYaml.ts";

const zProperties = z.record(z.string(), z.unknown());

export const blockPnpmWorkspace = base.createBlock({
	about: {
		name: "pnpm Workspace",
	},
	addons: {
		existing: zProperties.optional(),
		existingText: z.string().optional(),
		properties: zProperties.default({}),
	},
	intake({ files }) {
		const file = intakeFile(files, ["pnpm-workspace.yaml"]);
		const [text] = file ?? [];
		const { data } = zProperties.safeParse(text && loadYamlSafe(text));

		return data && { existing: data, existingText: text };
	},
	produce({ addons }) {
		const { existing = {}, existingText, properties } = addons;
		const merged = mergeProperties(properties, existing);

		if (!Object.keys(merged).length || isDeepStrictEqual(merged, existing)) {
			return {};
		}

		const missing = Object.fromEntries(
			Object.entries(properties).filter(([key]) => !(key in existing)),
		);

		const contents =
			existingText && isDeepStrictEqual(merged, { ...existing, ...missing })
				? `${existingText.trimEnd()}\n\n${formatYaml(missing)}`
				: formatYaml(merged);

		return { files: { "pnpm-workspace.yaml": contents } };
	},
});

function mergeProperties(
	properties: Record<string, unknown>,
	existing: Record<string, unknown>,
) {
	const merged = { ...properties, ...existing };

	for (const [key, value] of Object.entries(properties)) {
		const existingValue = existing[key];

		if (existingValue == null) {
			merged[key] = value;
		} else if (isPlainObject(value) && isPlainObject(existingValue)) {
			merged[key] = { ...value, ...existingValue };
		}
	}

	return merged;
}
