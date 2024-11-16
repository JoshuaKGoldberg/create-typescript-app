import { z } from "zod";

import { formatIgnoreFile } from "../../steps/writing/creation/formatters/formatIgnoreFile.js";
import { base } from "../base.js";

export const blockGitignore = base.createBlock({
	about: {
		name: "Gitignore",
	},
	args: {
		ignores: z.array(z.string()).optional(),
	},
	produce({ args }) {
		const { ignores = [] } = args;

		return {
			files: {
				".gitignore": formatIgnoreFile(["/node_modules", ...ignores].sort()),
			},
		};
	},
});
