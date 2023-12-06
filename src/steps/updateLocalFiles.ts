import replaceInFile from "replace-in-file";

import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";
import { Options } from "../shared/types.js";
import { endOfReadmeTemplateLine } from "./updateReadme.js";

interface ExistingPackageData {
	description?: string;
	version?: string;
}

export async function updateLocalFiles(options: Options) {
	const existingPackage = ((await readFileSafeAsJson("./package.json")) ??
		{}) as ExistingPackageData;

	const replacements = [
		[/Create TypeScript App/g, options.title],
		[
			/JoshuaKGoldberg(?:\/(.+))?/g,
			(full: string, capture: string | undefined) =>
				capture
					? // If this was a "JoshuaKGoldberg/..." repository link,
					  // swap the owner if it's the repository being migrated.
					  capture.startsWith(options.repository)
						? `${options.owner}/${capture}`
						: full
					: // Otherwise it's just "JoshuaKGoldberg" standalone,
					  // so swap to the new owner.
					  options.owner,
		],
		[/create-typescript-app/g, options.repository],
		[/\/\*\n.+\*\/\n\n/gs, ``, ".eslintrc.cjs"],
		[/"author": ".+"/g, `"author": "${options.author}"`, "./package.json"],
		...(options.mode === "migrate"
			? []
			: [[/"bin": ".+\n/g, ``, "./package.json"]]),
		[/"test:create": ".+\n/g, ``, "./package.json"],
		[/"test:initialize": ".*/g, ``, "./package.json"],
		[/"initialize": ".*/g, ``, "./package.json"],
		[/"test:migrate": ".+\n/g, ``, "./package.json"],
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
		// Edge case: migration scripts will rewrite README.md attribution
		[
			/> 💙 This package was templated with .+\./g,
			endOfReadmeTemplateLine,
			"./README.md",
		],
	];

	if (existingPackage.description) {
		replacements.push([existingPackage.description, options.description]);
	}

	if (options.mode === "initialize" && existingPackage.version) {
		replacements.push([
			new RegExp(`"version": "${existingPackage.version}"`, "g"),
			`"version": "0.0.0"`,
			"./package.json",
		]);
	}

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of replacements) {
		try {
			// @ts-expect-error -- https://github.com/microsoft/TypeScript/issues/54342
			await replaceInFile({
				allowEmptyPaths: true,
				files,
				from,
				to,
			});
		} catch (error) {
			const toString = typeof to === "function" ? "(function)" : to;
			throw new Error(
				`Failed to replace ${from.toString()} with ${toString} in ${files.toString()}`,
				{
					cause: error,
				},
			);
		}
	}
}
