import chalk from "chalk";

import { logLine } from "./cli/lines.js";
import { getNpmUserInfo } from "./getNpmUserInfo.js";

export async function getNpmAuthor(): Promise<string | undefined>;
export async function getNpmAuthor(owner: string): Promise<string>;
export async function getNpmAuthor(
	owner?: string | undefined
): Promise<string | undefined> {
	const result = await getNpmUserInfo();
	if (!result.succeeded) {
		logLine();
		logLine(chalk.gray(result.reason));
		return owner;
	}

	const { email, name = owner } = result.value;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return email ? `${name!} <${email}>` : name;
}
