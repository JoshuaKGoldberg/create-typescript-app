import { z } from "zod";

import { formatIgnoreFile } from "../../steps/writing/creation/formatters/formatIgnoreFile.js";
import { schema } from "../schema.js";

export const blockGitignore = schema.createBlock({
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
