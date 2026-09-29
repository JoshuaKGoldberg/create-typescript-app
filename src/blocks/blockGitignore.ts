import { z } from "zod";

import { base } from "../base.ts";
import { formatIgnoreFile } from "./files/formatIgnoreFile.ts";
import { intakeFile } from "./intake/intakeFile.ts";

export const blockGitignore = base.createBlock({
	about: {
		name: "Gitignore",
	},
	addons: {
		existing: z.array(z.string()).default([]),
		ignores: z.array(z.string()).default([]),
		removals: z.array(z.string()).default([]),
	},
	intake({ files }) {
		const gitignore = intakeFile(files, [".gitignore"]);
		if (!gitignore) {
			return undefined;
		}

		return {
			existing: gitignore[0]
				.split(/\r?\n/u)
				.map((line) => line.trim())
				.filter((line) => line && !line.startsWith("#")),
		};
	},
	produce({ addons }) {
		const removals = new Set(["node_modules/", ...addons.removals]);
		const ignores = new Set([
			"/node_modules",
			...addons.existing.filter((line) => !removals.has(line)),
			...addons.ignores,
		]);

		const negations = [...ignores].filter((line) => line.startsWith("!"));
		const patterns = [...ignores].filter((line) => !line.startsWith("!"));

		return {
			files: {
				".gitignore": formatIgnoreFile([...patterns.sort(), ...negations]),
			},
		};
	},
});
