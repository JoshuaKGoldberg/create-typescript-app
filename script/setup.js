/* global $ */
import { parseArgs } from "node:util";

import chalk from "chalk";
import { promises as fs } from "fs";
import { Octokit } from "octokit";
import prettier from "prettier";
import replace from "replace-in-file";

const { prompt } = require("enquirer");

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

	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			description: { type: "string" },
			owner: { type: "string" },
			repository: { type: "string" },
			title: { type: "string" },
			"skip-api": { type: "boolean" },
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

	const owner = await getPrefillOrPromptedValue(
		"owner",
		"What owner or user will the repository be under?"
	);

	const description = await getPrefillOrPromptedValue(
		"description",
		"How would you describe the new package?"
	);

	const skipApi = await getPrefillOrPromptedValue(
		"skip-api",
		"Whether to skip calling the GitHub API (effectively making this a local-only change)."
	);

	console.log();
	console.log(chalk.gray`Hydrating package metadata locally...`);

	async function readFileAsJSON(filePath) {
		return JSON.parse((await fs.readFile(filePath)).toString());
	}

	const [existingContributors, existingPackage, outcomeLabels] =
		await Promise.all([
			readFileAsJSON("./.all-contributorsrc"),
			readFileAsJSON("./package.json"),
			readFileAsJSON("./script/labels.json"),
		]);

	await fs.writeFile(
		"./.all-contributorsrc",
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

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of [
		[existingPackage.description, description],
		["Template TypeScript Node Package", title],
		["JoshuaKGoldberg", owner],
		["template-typescript-node-package", repository],
		[/"setup": ".*",/, ``, "./package.json"],
		[/"setup:test": ".*",/, ``, "./package.json"],
		[
			`"version": "${existingPackage.version}"`,
			`"version": "0.0.0"`,
			"./package.json",
		],
		[/## Explainer.*## Usage/s, `## Usage`, "./README.md"],
	]) {
		await replace({ files, from, to });
	}

	const endOfReadmeNotice = `

	<!-- You can remove this notice if you don't want it 🙂 no worries! -->
	
	> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`;

	if (
		!(await fs.readFile("./README.md")).toString().includes(endOfReadmeNotice)
	) {
		await fs.appendFile("./README.md", endOfReadmeNotice);
	}

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Clearing CHANGELOG.md...`);

	await fs.writeFile(
		"./CHANGELOG.md",
		prettier.format(`# Changelog`, { parser: "markdown" })
	);

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Deleting local git tags...`);

	await $`git tag -d $(git tag -l)`;

	console.log(chalk.gray`✔️ Done.`);

	console.log(chalk.gray`✔️ Done.`);
	console.log();

	if (skipApi) {
		console.log(chalk.gray`➖ Skipping API hydration.`);
	} else {
		console.log(chalk.gray`Checking gh auth status...`);
		let auth;
		try {
			await $`gh auth status`;
			auth = (await $`gh auth token`).toString().trim();
		} catch (error) {
			throw new Error(error.stderr);
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
		console.log(chalk.gray`Hydrating initial repository settings...`);

		const octokit = new Octokit({ auth });

		octokit.rest.repos.update({
			allow_auto_merge: true,
			allow_rebase_merge: false,
			allow_squash_merge: true,
			default_branch: "main",
			delete_branch_on_merge: true,
			description,
			has_wiki: false,
			owner,
			repo: repository,
		});

		console.log();
		console.log(chalk.gray`Hydrating branch protection settings...`);

		// Note: keep this inline script in sync with .github/workflows/release.yml!
		// Todo: it would be nice to not have two sources of truth...
		// https://github.com/JoshuaKGoldberg/template-typescript-node-package/issues/145
		await octokit.request(
			`PUT /repos/${owner}/${repository}/branches/main/protection`,
			{
				allow_deletions: false,
				allow_force_pushes: true,
				allow_fork_pushes: false,
				allow_fork_syncing: true,
				block_creations: false,
				branch: "main",
				enforce_admins: false,
				owner,
				repo: repository,
				required_conversation_resolution: true,
				required_linear_history: false,
				required_pull_request_reviews: null,
				required_status_checks: {
					checks: [
						{ context: "build" },
						{ context: "compliance" },
						{ context: "lint" },
						{ context: "markdown" },
						{ context: "package" },
						{ context: "packages" },
						{ context: "prettier" },
						{ context: "prune" },
						{ context: "spelling" },
						{ context: "test" },
					],
					strict: false,
				},
				restrictions: null,
			}
		);

		console.log(chalk.gray`✔️ Done.`);
	}

	console.log();
	console.log(chalk.gray`Removing setup script...`);

	await fs.rm("./script", { force: true, recursive: true });
	await fs.rm(".github/workflows/setup.yml");

	console.log(chalk.gray`✔️ Done.`);
} catch (error) {
	console.log(chalk.red(error.stack));
	caughtError = error;
} finally {
	console.log();
	console.log(
		chalk.gray`Removing devDependency packages only used for setup...`
	);
	await $`pnpm remove enquirer octokit replace-in-file -D`;
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
