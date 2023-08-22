import replaceInFile from "replace-in-file";

import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";

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
	const existingPackage = ((await readFileSafeAsJson("./package.json")) ??
		{}) as ExistingPackageData;

	const replacements = [
		[/Template TypeScript Node Package/g, title],
		[/JoshuaKGoldberg/g, owner],
		[/template-typescript-node-package/g, repository],
		[/\/\*\n.+\*\/\n\n/gs, ``, ".eslintrc.cjs"],
		[/"author": ".+"/g, `"author": "${npmAuthor}"`, "./package.json"],
		[/"bin": ".+\n/g, ``, "./package.json"],
		[/"create:test": ".+\n/g, ``, "./package.json"],
		[/"initialize:test": ".*/g, ``, "./package.json"],
		[/"initialize": ".*/g, ``, "./package.json"],
		[/"migrate:test": ".+\n/g, ``, "./package.json"],
		[/## Getting Started.*## Development/gs, `## Development`, "./README.md"],
		[/\n## Setup Scripts.*$/gs, "", "./.github/DEVELOPMENT.md"],
		[`\t\t"src/initialize/index.ts",\n`, ``, "./knip.jsonc"],
		[`\t\t"src/migrate/index.ts",\n`, ``, "./knip.jsonc"],
		[
			`["src/index.ts!", "script/initialize*.js"]`,
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
				},
			);
		}
	}
}
