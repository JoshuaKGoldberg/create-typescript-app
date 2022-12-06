/* global $ */
import chalk from "chalk";
import { promises as fs } from "fs";
import prettier from "prettier";

import existingContributors from "../.all-contributorsrc.json" assert { type: "json" };
import existingPackage from "../package.json" assert { type: "json" };
import outcomeLabels from "./labels.json" assert { type: "json" };

let caughtError;

try {
	console.clear();
	console.log(
		chalk.greenBright`Welcome to the`,
		chalk.bgGreenBright`template-typescript-node-package`,
		chalk.greenBright`package setup!`
	);
	console.log(
		chalk.blue`This setup script will hydrate your repository based on your provided settings.`
	);
	console.log();

	console.log(chalk.gray`Setting up temporary devDependency packages...`);
	await $`pnpm add enquirer replace-in-file yargs -D`;
	console.log(chalk.gray`✔️ Done.`);
	console.log();

	console.log(chalk.gray`Checking gh auth status...`);
	try {
		await $`gh auth status`;
	} catch (error) {
		throw new Error(error.stderr);
	}

	console.log(chalk.gray`✔️ Done.`);
	console.log();

	const { parseArgs } = require("node:util");
	const { prompt } = require("enquirer");

	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			description: { type: "string" },
			organization: { type: "string" },
			repository: { type: "string" },
			title: { type: "string" },
		},
		tokens: true,
		strict: false,
	});

	async function getPrefillOrPromptedValue(key, message) {
		const { [key]: value } = values[key]
			? (console.log(chalk.grey(`Pre-filling ${key} to ${values[key]}.`)),
			  values)
			: await prompt({
					message,
					name: key,
					type: "input",
			  });

		return value;
	}

	const repository = await getPrefillOrPromptedValue(
		"repository",
		"What will the kebab-case name of the repository be?"
	);

	const title = await getPrefillOrPromptedValue(
		"title",
		"What will the Sentence Case title of the repository be?"
	);

	const organization = await getPrefillOrPromptedValue(
		"organization",
		"What organization or user will the repository be under?"
	);

	const description = await getPrefillOrPromptedValue(
		"description",
		"How would you describe the new package?"
	);

	console.log();
	console.log(chalk.gray`Hydrating package metadata locally...`);

	await fs.writeFile(
		"./.all-contributorsrc.json",
		prettier.format(
			JSON.stringify({
				...existingContributors,
				contributors: [
					{
						...existingContributors.contributors.find(
							({ login }) => login === "JoshuaKGoldberg"
						),
						contributions: ["tool"],
					},
				],
			}),
			{ parser: "json" }
		)
	);

	const replace = require("replace-in-file");

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of [
		[existingPackage.description, description],
		["Template TypeScript Node Package", title],
		["JoshuaKGoldberg", organization],
		["template-typescript-node-package", repository],
		[/"setup": ".*",/, ``, "./package.json"],
		[
			`"version": "${existingPackage.version}"`,
			`"version": "0.0.1"`,
			"./package.json",
		],
		[/## Explainer.*## Usage/s, `## Usage`, "./README.md"],
	]) {
		await replace({ files, from, to });
	}

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Hydrating repository labels...`);

	const existingLabels = JSON.parse(
		(await $`gh label list --json name`).stdout || "[]"
	);

	for (const outcome of outcomeLabels) {
		const action = existingLabels.some(
			(existing) => existing.name === outcome.name
		)
			? "edit"
			: "create";
		await $`gh label ${action} ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
	}

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Hydrating repository settings...`);

	await $`gh repo edit --delete-branch-on-merge --description "${description}" --enable-auto-merge --enable-rebase-merge=false --enable-squash-merge`;

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Removing setup script...`);

	await fs.rm("./script", { force: true, recursive: true });

	console.log(chalk.gray`✔️ Done.`);
} catch (error) {
	console.log(chalk.red(error));
	caughtError = error;
} finally {
	console.log();
	console.log(chalk.gray`Cleaning up temporary devDependency packages...`);
	await $`pnpm remove enquirer replace-in-file yargs -D`;
	console.log(chalk.gray`✔️ Done.`);
}

console.log();

if (caughtError) {
	console.log(
		chalk.yellow`Looks like there was a problem. Correct it and try again? 😕`
	);
} else {
	console.log(chalk.green`Great, looks like everything worked!`);
	console.log(chalk.blue`You may consider committing these changes:`);
	console.log(chalk.gray`\tgit add -A`);
	console.log(chalk.gray`\tgit commit -m "chore: hydrated repo"`);
	console.log(chalk.gray`\tgit push`);
	console.log(chalk.greenBright`See ya! 👋`);
}
console.log();
