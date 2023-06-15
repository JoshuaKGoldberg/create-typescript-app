import chalk from "chalk";

import { logLine } from "./cli/lines.js";
import { type UserInfo, getNpmUserInfo } from "./getNpmUserInfo.js";

export async function getNpmAuthor(): Promise<string | undefined>;
export async function getNpmAuthor(owner: string): Promise<string>;
export async function getNpmAuthor(
	owner?: string | undefined
): Promise<string | undefined> {
	let npmUserInfo: UserInfo;

	try {
		npmUserInfo = await getNpmUserInfo();
	} catch (error) {
		logLine();
		logLine(chalk.gray((error as Error).message));

		return owner;
	}

	const { email, name = owner } = npmUserInfo;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return email ? `${name!} <${email}>` : name;
}
