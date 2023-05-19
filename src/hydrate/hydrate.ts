import { parseArgs } from "node:util";

import chalk from "chalk";
import { $ } from "execa";

import { clearUnnecessaryFiles } from "./clearUnnecessaryFiles.js";
import { createStructure } from "./creation/index.js";
import { finalize } from "./finalize.js";
import { readFileSafe } from "./readFileSafe.js";
import { readFundingIfExists } from "./readFundingIfExists.js";
import { ensureSettingsAreFilledOut } from "./repositorySettings.js";
import { writeReadme } from "./writeReadme.js";
import { writeStructure } from "./writing.js";

interface PartialPackageData {
	author?: string | { email: string; name: string };
	description?: string;
	email?: string;
	name?: string;
	repository?: string;
}

export async function hydrate(args: string[]) {
	const { values } = parseArgs({
		args,
		options: {
			author: { type: "string" },
			description: { type: "string" },
			email: { type: "string" },
			funding: { type: "string" },
			owner: { type: "string" },
			releases: { type: "boolean" },
			repository: { type: "string" },
			unitTests: { type: "boolean" },
			title: { type: "string" },
		},
		tokens: true,
		strict: false,
	});

	const existingReadme = await readFileSafe("./README.md", "");
	const existingPackage = JSON.parse(
		await readFileSafe("./package.json", "{}")
	) as PartialPackageData;

	const settings = {
		author:
			(values.author as string | undefined) ??
			(typeof existingPackage.author === "string"
				? existingPackage.author.split("<")[0].trim()
				: existingPackage.author?.name),
		description:
			(values.description as string | undefined) ?? existingPackage.description,
		email:
			(values.email as string | undefined) ??
			(typeof existingPackage.author === "string"
				? existingPackage.author.split(/<|>/)[1]
				: existingPackage.author?.email),
		funding: await readFundingIfExists(),
		owner:
			(values.owner as string | undefined) ??
			(await $`git remote -v`).stdout.match(
				/origin\s+https:\/\/\S+\.\w+\/([^/]+)/
			)?.[1],
		releases: (values.releases as boolean | undefined) ?? true,
		repository:
			(values.repository as string | undefined) ?? existingPackage.name,
		unitTests: (values.unitTests as boolean | undefined) ?? true,
		title:
			(values.title as string | undefined) ??
			existingReadme.match(/^(?:# |<h1\s+align="center">)(\S+)/)?.[1],
	};

	ensureSettingsAreFilledOut(settings);

	await clearUnnecessaryFiles();
	await writeStructure(createStructure(settings));
	await writeReadme(settings);
	await finalize(settings);

	console.log(chalk.green("Done!"));
}
