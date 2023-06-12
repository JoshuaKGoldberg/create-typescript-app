import chalk from "chalk";
import { $ } from "execa";
import npmUser from "npm-user";

import { logLine } from "./cli/lines.js";

export async function getNpmAuthor(): Promise<string | undefined>;
export async function getNpmAuthor(owner: string): Promise<string>;
export async function getNpmAuthor(
	owner?: string | undefined
): Promise<string | undefined> {
	let username;

	try {
		const { stdout } = await $`npm whoami`;

		username = stdout;
	} catch {
		logLine();
		logLine(
			chalk.gray("Could not populate npm user. Failed to run npm whoami.")
		);

		return owner;
	}

	let npmUserInfo;

	try {
		npmUserInfo = await npmUser(username);
	} catch {
		logLine();
		logLine(
			chalk.gray(
				"Could not populate npm user. Failed to retrieve user info from npm."
			)
		);

		return owner;
	}

	const { email, name = owner } = npmUserInfo;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return email ? `${name!} <${email}>` : name;
}
