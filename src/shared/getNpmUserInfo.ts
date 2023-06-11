import { $ } from "execa";
import npmUser, { type UserInfo } from "npm-user";

export type { UserInfo };
export async function getNpmUserInfo(): Promise<UserInfo> {
	let username;

	try {
		const { stdout } = await $`npm whoami`;

		username = stdout;
	} catch {
		throw new Error("Could not populate npm user. Failed to run npm whoami.");
	}

	try {
		return npmUser(username);
	} catch {
		throw new Error(
			"Could not populate npm user. Failed to retrieve user info from npm."
		);
	}
}
