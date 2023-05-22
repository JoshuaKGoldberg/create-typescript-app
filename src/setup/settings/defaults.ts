import chalk from "chalk";
import { $ } from "execa";

export async function getDefaultSettings() {
	let gitRemoteFetch;
	try {
		// Grep only the origin remote and its fetch URL
		gitRemoteFetch = await $`git remote -v`
			.pipeStdout?.($({ stdin: "pipe" })`grep origin`)
			.pipeStdout?.($({ stdin: "pipe" })`grep fetch`);
	} catch {
		console.log(
			chalk.gray(
				"Could not populate default owner and repository. Did not detect a Git repository with an origin. "
			)
		);

		return {
			defaultOwner: "UserName",
			defaultRepository: "my-lovely-repository",
		};
	}

	const remoteFetchMatch = gitRemoteFetch?.stdout.match(
		/\s.+\/([^/]+)\/([^/]+) \(fetch\)/
	);
	if (!remoteFetchMatch) {
		throw new Error("Could not match a fetch remote from git.");
	}

	const [, defaultOwner, defaultRepository] = remoteFetchMatch;

	return { defaultOwner, defaultRepository };
}
