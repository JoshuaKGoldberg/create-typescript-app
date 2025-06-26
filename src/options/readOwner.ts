import { TakeInput } from "bingo";
import { GitUrl } from "git-url-parse";
import { inputFromScript } from "input-from-script";

import { PackageAuthor } from "./readPackageAuthor.js";

export async function readOwner(
	take: TakeInput,
	getGitDefaults: () => Promise<GitUrl | undefined>,
	getPackageAuthor: () => Promise<PackageAuthor>,
) {
	return (
		(await getGitDefaults())?.organization ??
		(await getPackageAuthor()).name ??
		(
			await take(inputFromScript, {
				command: "gh config get user -h github.com",
			})
		).stdout?.toString()
	);
}
