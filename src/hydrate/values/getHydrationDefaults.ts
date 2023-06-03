import { $ } from "execa";

import { getNpmAuthor } from "../../shared/getNpmAuthor.js";
import { readFileSafe } from "../readFileSafe.js";
import { readFundingIfExists } from "./readFundingIfExists.js";

interface PartialPackageData {
	author?: string | { email: string; name: string };
	description?: string;
	email?: string;
	name?: string;
	repository?: string;
}

export async function getHydrationDefaults() {
	const existingReadme = await readFileSafe("./README.md", "");
	const existingPackage = JSON.parse(
		await readFileSafe("./package.json", "{}")
	) as PartialPackageData;

	return {
		author: async () => {
			const fromPackage =
				typeof existingPackage.author === "string"
					? existingPackage.author.split("<")[0].trim()
					: existingPackage.author?.name;

			return fromPackage ?? (await getNpmAuthor());
		},
		email:
			typeof existingPackage.author === "string"
				? existingPackage.author.split(/<|>/)[1]
				: existingPackage.author?.email,
		funding: readFundingIfExists,
		owner: async () =>
			(await $`git remote -v`).stdout.match(
				/origin\s+https:\/\/\S+\.\w+\/([^/]+)/
			)?.[1],
		releases: true,
		unitTests: true,
		title: existingReadme.match(/^(?:# |<h1\s+align="center">)(\S+)/)?.[1],
	};
}
