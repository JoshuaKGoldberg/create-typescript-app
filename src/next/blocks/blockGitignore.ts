import { formatIgnoreFile } from "../../steps/writing/creation/formatters/formatIgnoreFile.js";
import { schema } from "../schema.js";
import { removeTrailingSlash } from "../utils/removeTrailingSlash.js";
import { MetadataFileType } from "./metadata.js";

export const blockGitignore = schema.createBlock({
	about: {
		name: "Gitignore",
	},
	produce({ created }) {
		return {
			files: {
				".gitignore": formatIgnoreFile(
					[
						"/node_modules",
						...created.metadata.files
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
