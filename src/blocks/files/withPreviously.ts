import { CreatedFileEntry } from "bingo-fs";

export function withPreviously(
	contents: false | string | undefined,
	previously: string[],
): CreatedFileEntry | false | undefined {
	return contents && [contents, { previously }];
}
