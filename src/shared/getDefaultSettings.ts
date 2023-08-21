import chalk from "chalk";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";

import { logLine } from "./cli/lines.js";

export async function getDefaultSettings() {
	try {
		const gitRemoteUrl = await gitRemoteOriginUrl();
		const { name, owner } = gitUrlParse(gitRemoteUrl);

		return { defaultOwner: owner, defaultRepository: name };
	} catch {
		logLine();
		logLine(
			chalk.gray(
				"Could not populate default owner and repository. Did not detect an 'origin' remote. ",
			),
		);

		return {
			defaultOwner: "UserName",
			defaultRepository: "my-lovely-repository",
		};
	}
}
