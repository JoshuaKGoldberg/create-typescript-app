import replaceInFile from "replace-in-file";

import { readFileAsJSON } from "../readFileAsJSON.js";

interface UpdateLocalFilesOptions {
	description: string;
	npmAuthor: string;
	owner: string;
	repository: string;
	title: string;
}

interface ExistingPackageData {
	description?: string;
	version?: string;
}

export async function updateLocalFiles({
	description,
	npmAuthor,
	owner,
	repository,
	title,
}: UpdateLocalFilesOptions) {
	const existingPackage = (await readFileAsJSON(
		"./package.json"
	)) as ExistingPackageData;

	const replacements: [string | RegExp, string, string?][] = [
		[/Template TypeScript Node Package/g, title],
		[/JoshuaKGoldberg/g, owner],
		[/template-typescript-node-package/g, repository],
		[/\/\*\n.+\*\/\n\n/gs, ``, ".eslintrc.cjs"],
		[/"setup": ".*",/g, ``, "./package.json"],
		[/"setup:test": ".*",/g, ``, "./package.json"],
		[/"author": ".+"/g, `"author": "${npmAuthor}"`, "./package.json"],

		[/## Explainer.*## Usage/gs, `## Usage`, "./README.md"],
		[/\n### Testing the Setup Script.*$/gs, "", "./.github/DEVELOPMENT.md"],
		[`,\n\t\t["src/setup/*.json"`, ``, "./cspell.json"],
		[`\t\t"src/hydrate/index.ts",\n`, ``, "./knip.jsonc"],
		[`\t\t"src/setup/index.ts",\n`, ``, "./knip.jsonc"],
		[`\t\t"ignoreDependencies": ["c8"],\n`, ``, "./knip.jsonc"],
		[
			`["src/index.ts!", "script/setup*.js"]`,
			`"src/index.ts!"`,
			"./knip.jsonc",
		],
		[`["src/**/*.ts!", "script/**/*.js"]`, `"src/**/*.ts!"`, "./knip.jsonc"],
	];

	if (existingPackage.description) {
		replacements.push([
			new RegExp(existingPackage.description, "g"),
			description,
		]);
	}

	if (existingPackage.version) {
		replacements.push([
			new RegExp(`"version": "${existingPackage.version}"`, "g"),
			`"version": "0.0.0"`,
			"./package.json",
		]);
	}

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of replacements) {
		try {
			// @ts-expect-error -- https://github.com/microsoft/TypeScript/issues/54342
			await replaceInFile({ files, from, to });
		} catch (error) {
			throw new Error(
				`Failed to replace ${from.toString()} with ${to} in ${files.toString()}`,
				{
					cause: error,
				}
			);
		}
	}
}
