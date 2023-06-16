import { $ } from "execa";

import type { PartialPackageData } from "./getHydrationDefaults.js";

import { getNpmUserInfo } from "../../shared/getNpmUserInfo.js";

export async function readEmailIfExists(existingPackage: PartialPackageData) {
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
		return await $`git config --get user.email`;
	} catch {
		return undefined;
	}
}
