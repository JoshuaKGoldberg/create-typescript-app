import { CreatedFileEntry } from "bingo-fs";

/**
 * Marks file contents as having previously been created at other paths,
 * relative to the file's directory, such as before a `.yml` → `.yaml` rename.
 */
export function withPreviously(
	contents: false | string | undefined,
	previously: string[],
): CreatedFileEntry | false | undefined {
	return contents && [contents, { previously }];
}
