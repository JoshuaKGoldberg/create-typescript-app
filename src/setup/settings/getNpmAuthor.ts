import chalk from "chalk";
import { $ } from "execa";
import npmUser from "npm-user";

export async function getNpmAuthor(owner: string) {
	let username;

	try {
		const { stdout } = await $`npm whoami`;

		username = stdout;
	} catch {
		console.log(chalk.gray("│"));
		console.log(
			chalk.gray("│  Could not populate npm user. Failed to run npm whoami.")
		);

		return owner;
	}

	let npmUserInfo;

	try {
		npmUserInfo = await npmUser(username);
	} catch {
		console.log(chalk.gray("│"));
		console.log(
			chalk.gray(
				"│  Could not populate npm user. Failed to retrieve user info from npm."
			)
		);

		return owner;
	}

	const { name = owner, email } = npmUserInfo;
	return email ? `${name} <${email}>` : name;
}
