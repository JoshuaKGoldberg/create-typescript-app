import { From, replaceInFile, To } from "replace-in-file";

import { readFileSafeAsJson } from "../shared/readFileSafeAsJson.js";
import { Options } from "../shared/types.js";
import { createJoshuaKGoldbergReplacement } from "./createJoshuaKGoldbergReplacement.js";
import { endOfReadmeTemplateLine } from "./updateReadme.js";

interface ExistingPackageData {
	description?: string;
	version?: string;
}

export async function updateLocalFiles(options: Options) {
	const existingPackage = ((await readFileSafeAsJson("./package.json")) ??
		{}) as ExistingPackageData;

	const replacements: [From, To, (string | string[])?][] = [
		[/Create TypeScript App/g, options.title],
		createJoshuaKGoldbergReplacement(options),
		[/JoshuaKGoldberg/g, options.owner, "package.json"],
		[/create-typescript-app/g, options.repository],
		[/\/\*\n.+\*\/\n\n/gs, ``, "eslint.config.js"],
		[/"author": ".+"/g, `"author": "${options.author}"`, "./package.json"],
		...(options.mode === "migrate"
			? []
			: ([
					// Only creating a new repository should remove these parts.
					// Existing ones might coincidentally have them too.
					[/"test:create": ".+\n/g, ``, "./package.json"],
					[/"test:initialize": ".*/g, ``, "./package.json"],
					[/"initialize": ".*/g, ``, "./package.json"],
					[/"test:migrate": ".+\n/g, ``, "./package.json"],
					[
						/## Getting Started.*## Development/gs,
						`## Development`,
						"./README.md",
					],
					[/\n## Setup Scripts.*$/gs, "", "./.github/DEVELOPMENT.md"],
					[`\t\t"src/initialize/index.ts",\n`, ``, "./knip.json"],
					[`\t\t"src/migrate/index.ts",\n`, ``, "./knip.json"],
					[
						`["src/index.ts!", "script/initialize*.js"]`,
						`"src/index.ts!"`,
						"./knip.json",
					],
					[
						`["src/**/*.ts!", "script/**/*.js"]`,
						`"src/**/*.ts!"`,
						"./knip.json",
					],
					// Edge case: migration scripts will rewrite README.md attribution
					[
						/> 💙 This package was templated with .+\./g,
						endOfReadmeTemplateLine,
						"./README.md",
					],
				] as typeof replacements)),
	];

	if (existingPackage.description) {
		replacements.push([existingPackage.description, options.description]);
	}

	if (options.mode !== "migrate") {
		replacements.push([/"bin": ".+\n/g, ``, "./package.json"]);

		if (options.mode === "initialize" && existingPackage.version) {
			replacements.push([
				new RegExp(`"version": "${existingPackage.version}"`, "g"),
				`"version": "0.0.0"`,
				"./package.json",
			]);
		}
	}

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of replacements) {
		try {
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
