import chalk from "chalk";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";

import { logLine } from "./cli/lines.js";

export interface GitDefaultSettings {
	owner: string;
	repository: string;
}

export async function getGitDefaultSettings(): Promise<GitDefaultSettings> {
	try {
		const gitRemoteUrl = await gitRemoteOriginUrl();
		const { name, owner } = gitUrlParse(gitRemoteUrl);

		return { owner, repository: name };
	} catch {
		logLine();
		logLine(
			chalk.gray(
				"Could not populate default owner and repository. Did not detect an 'origin' remote.",
			),
		);

		return {
			owner: "UserName",
			repository: "my-lovely-repository",
		};
	}
}
