import { BlockPhase, MetadataFileType } from "create";

import { formatIgnoreFile } from "../../steps/writing/creation/formatters/formatIgnoreFile.js";
import { schema } from "../schema.js";

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
						"node_modules/",
						...created.metadata
							.filter(
								(value) =>
									value.type === MetadataFileType.Built ||
									value.type === MetadataFileType.Ignored,
							)
							.map((value) => value.glob),
					].sort(),
				),
			},
		};
	},
});
