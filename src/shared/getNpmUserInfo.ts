import { $ } from "execa";
import npmUser, { type UserInfo } from "npm-user";

export type { UserInfo };
interface ErrorResult {
	reason: string;
	succeeded: false;
}
interface SuccessResult {
	succeeded: true;
	value: UserInfo;
}
type Result = ErrorResult | SuccessResult;

export async function getNpmUserInfo(): Promise<Result> {
	let username;

	try {
		const { stdout } = await $`npm whoami`;
		username = stdout;
	} catch {
		return {
			reason: "Could not populate npm user. Failed to run npm whoami.",
			succeeded: false,
		};
	}

	try {
		const user = await npmUser(username);
		return { succeeded: true, value: user };
	} catch {
		return {
			reason:
				"Could not populate npm user. Failed to retrieve user info from npm.",
			succeeded: false,
		};
	}
}
