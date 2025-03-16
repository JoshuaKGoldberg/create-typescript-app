import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";

// TODO: gitRemoteOriginUrl does not go through take(input*), making it harder to test.
// The next refactor here should add an input.

export async function readGitDefaults() {
	try {
		return gitUrlParse(await gitRemoteOriginUrl());
	} catch {
		return undefined;
	}
}
