import { $ } from "execa";

import type { PartialPackageData } from "./types.js";

import { getNpmUserInfo } from "../../shared/getNpmUserInfo.js";

export async function readEmailIfExists(
	existingPackage: PartialPackageData
): Promise<string | undefined> {
	const fromPackage =
		typeof existingPackage.author === "string"
			? existingPackage.author.split(/<|>/)[1]
			: existingPackage.author?.email;
	if (fromPackage) {
		return fromPackage;
	}

	const result = await getNpmUserInfo();
	if (result.succeeded) {
		return result.value.email;
	}

	try {
		const { stdout } = await $`git config --get user.email`;
		return stdout;
	} catch {
		return undefined;
	}
}
