import { BlockPhase, MetadataFileType } from "create";

import { formatIgnoreFile } from "../../steps/writing/creation/formatters/formatIgnoreFile.js";
import { schema } from "../schema.js";
import { removeTrailingSlash } from "../utils/removeTrailingSlash.js";

export const blockGitignore = schema.createBlock({
	about: {
		name: "Gitignore",
	},
	phase: BlockPhase.Git,
	produce({ created }) {
		return {
			files: {
				".gitignore": formatIgnoreFile(
					[
						"/node_modules",
						"/pnpm-lock.yaml",
						...created.metadata
							.filter(
								(value) =>
									value.type === MetadataFileType.Built ||
									value.type === MetadataFileType.Ignored,
							)
							.map((value) => `/${removeTrailingSlash(value.glob)}`),
					].sort(),
				),
			},
		};
	},
});
