import { TakeInput } from "bingo";
import { GitUrl } from "git-url-parse";
import { inputFromScript } from "input-from-script";

export async function readOwner(
	take: TakeInput,
	getGitDefaults: () => Promise<GitUrl | undefined>,
	getPackageAuthor: () => Promise<{ author?: string }>,
) {
	return (
		(await getGitDefaults())?.organization ??
		(await getPackageAuthor()).author ??
		(
			await take(inputFromScript, {
				command: "gh config get user -h github.com",
			})
		).stdout?.toString()
	);
}
