import { z } from "zod";

import { base } from "../base.js";
import { formatIgnoreFile } from "./files/formatIgnoreFile.js";

export const blockGitignore = base.createBlock({
	about: {
		name: "Gitignore",
	},
	addons: {
		ignores: z.array(z.string()).default([]),
	},
	produce({ addons }) {
		const { ignores } = addons;

		return {
			files: {
				".gitignore": formatIgnoreFile(["/node_modules", ...ignores].sort()),
			},
		};
	},
});
