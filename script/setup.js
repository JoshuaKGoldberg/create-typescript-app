/* global $ */
import { EOL } from "node:os";
import { parseArgs } from "node:util";

import { cancel, isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { promises as fs } from "fs";
import npmUser from "npm-user";
import { Octokit } from "octokit";
import prettier from "prettier";
import replace from "replace-in-file";
import { titleCase } from "title-case";

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

	async function getDefaultSettings() {
		let gitRemoteFetch;
		try {
			gitRemoteFetch = await $`git remote -v | grep fetch`;
		} catch {
			console.log(
				chalk.gray(
					"Could not populate default owner and repository. Did not detect a Git repository with an origin. "
				)
			);
			return {
				defaultOwner: "UserName",
				defaultRepository: "my-lovely-repository",
			};
		}

		const [, defaultOwner, defaultRepository] = gitRemoteFetch.stdout.match(
			/\s.+\/([^/]+)\/([^/]+) \(fetch\)/
		);

		return { defaultOwner, defaultRepository };
	}

	const { defaultOwner, defaultRepository } = await getDefaultSettings();

	async function getPrefillOrPromptedValue(key, message, placeholder) {
		if (values[key]) {
			console.log(chalk.grey(`Pre-filling ${key} to ${values[key]}.`));
			return values[key];
		}

		const value = await text({
			message,
			placeholder,
			validate: (val) => {
				if (val.length === 0) {
					return "Please enter a value.";
				}
			},
		});

		if (isCancel(value)) {
			cancel("Operation cancelled. Exiting setup - maybe another time? 👋");
			process.exit(0);
		}

		return value;
	}

	const repository = await getPrefillOrPromptedValue(
		"repository",
		"What will the kebab-case name of the repository be?",
		defaultRepository
	);

	const title = await getPrefillOrPromptedValue(
		"title",
		"What will the Title Case title of the repository be?",
		titleCase(repository).replaceAll("-", " ")
	);

	const owner = await getPrefillOrPromptedValue(
		"owner",
		"What owner or user will the repository be under?",
		defaultOwner
	);

	const description = await getPrefillOrPromptedValue(
		"description",
		"How would you describe the new package?",
		"A very lovely package. Hooray!"
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

	async function getNpmAuthor() {
		let username;

		try {
			username = await $`npm whoami`;
		} catch {
			console.log(
				chalk.gray("Could not populate npm user. Failed to run npm whoami. ")
			);
			return owner;
		}

		let npmUserInfo;

		try {
			npmUserInfo = await npmUser(username.stdout.trim());
		} catch {
			console.log(
				chalk.gray(
					"Could not populate npm user. Failed to retrieve user info from npm. "
				)
			);
			return owner;
		}

		const { name = owner, email } = npmUserInfo;
		return email ? `${name} <${email}>` : name;
	}

	const npmAuthor = await getNpmAuthor();

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of [
		[new RegExp(existingPackage.description, "g"), description],
		[/Template TypeScript Node Package/g, title],
		[/JoshuaKGoldberg/g, owner],
		[/template-typescript-node-package/g, repository],
		[/"setup": ".*",/g, ``, "./package.json"],
		[/"setup:test": ".*",/g, ``, "./package.json"],
		[/"author": ".+"/g, `"author": "${npmAuthor}"`, "./package.json"],
		[
			new RegExp(`"version": "${existingPackage.version}"`, "g"),
			`"version": "0.0.0"`,
			"./package.json",
		],
		[/## Explainer.*## Usage/gs, `## Usage`, "./README.md"],
		[
			`["src/index.ts!", "script/setup*.js"]`,
			`"src/index.ts!"`,
			"./knip.jsonc",
		],
		[`["src/**/*.ts!", "script/**/*.js"]`, `"src/**/*.ts!"`, "./knip.jsonc"],
	]) {
		await replace({ files, from, to });
	}

	await fs.writeFile(
		".all-contributorsrc",
		prettier.format(
			JSON.stringify({
				...JSON.parse((await fs.readFile(".all-contributorsrc")).toString()),
				projectName: repository,
				projectOwner: owner,
			}),
			{ parser: "json" }
		)
	);

	const endOfReadmeNotice = [
		``,
		`<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
		``,
		`> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`,
		``,
	].join(EOL);

	await fs.appendFile("./README.md", endOfReadmeNotice);

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Clearing CHANGELOG.md...`);

	await fs.writeFile(
		"./CHANGELOG.md",
		prettier.format(`# Changelog`, { parser: "markdown" })
	);

	console.log(chalk.gray`✔️ Done.`);

	console.log();
	console.log(chalk.gray`Generating all-contributors table in README.md...`);

	await $`pnpm all-contributors generate`;

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
						{ context: "knip" },
						{ context: "lint" },
						{ context: "markdown" },
						{ context: "package" },
						{ context: "packages" },
						{ context: "prettier" },
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

	try {
		await $`pnpm remove @clack/prompts all-contributors-cli chalk octokit npm-user replace-in-file title-case -D`;
	} catch (error) {
		console.log("Error uninstalling packages:", error);
		caughtError = error;
	}

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
