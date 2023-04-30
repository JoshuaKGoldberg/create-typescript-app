import { EOL } from "node:os";
import { parseArgs } from "node:util";

import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";
import { promises as fs } from "fs";
import npmUser from "npm-user";
import { Octokit } from "octokit";
import prettier from "prettier";
import replace from "replace-in-file";
import { titleCase } from "title-case";

let exitCode = 0;
const s = prompts.spinner();

try {
	console.clear();
	console.log(
		chalk.greenBright`Welcome to the`,
		chalk.bgGreenBright.black`template-typescript-node-package`,
		chalk.greenBright`package setup! 🎉`
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
			"skip-uninstalls": { type: "boolean" },
		},
		tokens: true,
		strict: false,
	});

	async function getDefaultSettings() {
		let gitRemoteFetch;
		try {
			// grep only the origin remote and it's fetch URL
			gitRemoteFetch = await $`git remote -v`
				.pipeStdout($({ stdin: "pipe" })`grep origin`)
				.pipeStdout($({ stdin: "pipe" })`grep fetch`);
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

	prompts.intro(
		chalk.blue(
			"Let's collect some information to fill out repository details..."
		)
	);
	console.log(chalk.gray("│"));

	async function getPrefillOrPromptedValue(key, message, placeholder) {
		if (values[key]) {
			console.log(chalk.gray(`│  Pre-filling ${key} to ${values[key]}.`));

			return values[key];
		}

		const value = await prompts.text({
			message,
			placeholder,
			validate: (val) => {
				if (val.length === 0) {
					return "Please enter a value.";
				}
			},
		});

		if (prompts.isCancel(value)) {
			prompts.cancel(
				"Operation cancelled. Exiting setup - maybe another time? 👋"
			);
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

	const skipApi = values["skip-api"];
	const skipUninstalls = values["skip-uninstalls"];

	const successSpinnerBlock = (blockText) => {
		s.start(chalk.green("✅ " + blockText));
		s.stop(chalk.green("✅ " + blockText));
	};

	const skipSpinnerBlock = (blockText) => {
		s.start(chalk.gray("➖ " + blockText));
		s.stop(chalk.gray("➖ " + blockText));
	};

	successSpinnerBlock("Started hydrating package metadata locally.");

	async function readFileAsJSON(filePath) {
		try {
			return JSON.parse((await fs.readFile(filePath)).toString());
		} catch (error) {
			throw new Error(
				`Could not read file from ${filePath} as JSON. Please ensure the file exists and is valid JSON.`,
				{ cause: error }
			);
		}
	}

	const withSpinner = async (
		callback,
		{ startText, successText, stopText, errorText }
	) => {
		s.start(startText);

		try {
			await callback();

			s.stop(chalk.green("✅ " + successText));
		} catch (error) {
			s.stop(chalk.red("❌ " + stopText));

			throw new Error(errorText, { cause: error });
		}
	};

	await withSpinner(
		async () => {
			const existingContributors = await readFileAsJSON(
				"./.all-contributorsrc"
			);

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
		},
		{
			startText: "Updating existing contributors details...",
			successText: `Updated existing contributors details.`,
			stopText: `Error updating existing contributors details.`,
			errorText:
				"Failed to remove existing contributors & update '.all-contributorsrc' with new changes. ",
		}
	);

	async function getNpmAuthor() {
		let username;

		try {
			const { stdout } = await $`npm whoami`;

			username = stdout;
		} catch {
			console.log(chalk.gray("│"));
			console.log(
				chalk.gray("│  Could not populate npm user. Failed to run npm whoami. ")
			);

			return owner;
		}

		let npmUserInfo;

		try {
			npmUserInfo = await npmUser(username);
		} catch {
			console.log(chalk.gray("│"));
			console.log(
				chalk.gray(
					"│  Could not populate npm user. Failed to retrieve user info from npm. "
				)
			);

			return owner;
		}

		const { name = owner, email } = npmUserInfo;
		return email ? `${name} <${email}>` : name;
	}

	const npmAuthor = await getNpmAuthor();

	await withSpinner(
		async () => {
			const existingPackage = await readFileAsJSON("./package.json");

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
				[
					`["src/**/*.ts!", "script/**/*.js"]`,
					`"src/**/*.ts!"`,
					"./knip.jsonc",
				],
			]) {
				try {
					await replace({ files, from, to });
				} catch (error) {
					throw new Error(`Failed to replace ${from} with ${to} in ${files}`, {
						cause: error,
					});
				}
			}
		},
		{
			startText: "Updating all the files with provided details...",
			successText: `Updated all the files with provided details.`,
			stopText: `Error updating all the files with provided details.`,
			errorText: "Failed to update all the files with provided details. ",
		}
	);

	await withSpinner(
		async () => {
			await fs.writeFile(
				".all-contributorsrc",
				prettier.format(
					JSON.stringify({
						...JSON.parse(
							(await fs.readFile(".all-contributorsrc")).toString()
						),
						projectName: repository,
						projectOwner: owner,
					}),
					{ parser: "json" }
				)
			);
		},
		{
			startText:
				"Updating '.all-contributorsrc' with new repository details...",
			successText: `Updated '.all-contributorsrc' with new repository details.`,
			stopText: `Error updating '.all-contributorsrc' with new repository details.`,
			errorText:
				"Failed to update '.all-contributorsrc' with new repository details. ",
		}
	);

	await withSpinner(
		async () => {
			const endOfReadmeNotice = [
				``,
				`<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
				``,
				`> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`,
				``,
			].join(EOL);

			await fs.appendFile("./README.md", endOfReadmeNotice);
		},
		{
			startText:
				"Appending template-typescript-node-package notice to 'README.md'...",
			successText: `Appended template-typescript-node-package notice to 'README.md'.`,
			stopText: `Error appending template-typescript-node-package notice to 'README.md'.`,
			errorText:
				"Failed to append template-typescript-node-package notice to 'README.md'. ",
		}
	);

	successSpinnerBlock(`Finished hydrating package metadata locally.`);

	await withSpinner(
		async () => {
			await fs.writeFile(
				"./CHANGELOG.md",
				prettier.format(`# Changelog`, { parser: "markdown" })
			);
		},
		{
			startText: `Clearing CHANGELOG.md...`,
			successText: `Cleared CHANGELOG.md.`,
			stopText: `Error clearing CHANGELOG.md.`,
			errorText: `Could not empty 'CHANGELOG.md'. `,
		}
	);

	await withSpinner(
		async () => {
			await $`pnpm all-contributors generate`;
		},
		{
			startText: `Generating all-contributors table in README.md...`,
			successText: `Generated all-contributors table in README.md.`,
			stopText: `Error generating all-contributors table in README.md.`,
			errorText: `Could not empty 'CHANGELOG.md'. `,
		}
	);

	await withSpinner(
		async () => {
			const { stdout: allLocalTags } = await $`git tag -l`;

			// Create array of local tags by splitting the string at each new line and filtering out empty strings
			const allLocalTagsArray = allLocalTags.split("\n").filter(Boolean);

			// Delete all local tags if there are any
			if (allLocalTagsArray.length !== 0) {
				await $`git tag -d ${allLocalTagsArray}`;
			}
		},
		{
			startText: `Deleting local git tags...`,
			successText: `Deleted local git tags.`,
			stopText: `Error deleting local git tags.`,
			errorText: `Could not delete local git tags. `,
		}
	);

	if (skipApi) {
		skipSpinnerBlock(`Skipping API hydration.`);
	} else {
		successSpinnerBlock(`Starting API hydration.`);

		let octokit;

		await withSpinner(
			async () => {
				await $`gh auth status`;
				const auth = (await $`gh auth token`).stdout.trim();

				octokit = new Octokit({ auth });
			},
			{
				startText: `Fetching gh auth status...`,
				successText: `Fetched gh auth status.`,
				stopText: `Error fetching gh auth status.`,
				errorText: `Could not fetch github auth token. `,
			}
		);

		await withSpinner(
			async () => {
				const existingLabels = JSON.parse(
					(await $`gh label list --json name`).stdout || "[]"
				);

				const outcomeLabels = await readFileAsJSON("./script/labels.json");

				for (const outcome of outcomeLabels) {
					const action = existingLabels.some(
						(existing) => existing.name === outcome.name
					)
						? "edit"
						: "create";
					await $`gh label ${action} ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
				}
			},
			{
				startText: `Hydrating repository labels...`,
				successText: `Hydrated repository labels.`,
				stopText: `Error hydrating repository labels.`,
				errorText: `Could not hydrate repository labels. `,
			}
		);

		await withSpinner(
			async () => {
				await octokit.rest.repos.update({
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
			},
			{
				startText: `Hydrating initial repository settings...`,
				successText: `Hydrated initial repository settings.`,
				stopText: `Error hydrating initial repository settings.`,
				errorText: `Could not hydrate initial repository settings. `,
			}
		);

		await withSpinner(
			async () => {
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
			},
			{
				startText: `Hydrating branch protection settings...`,
				successText: `Hydrated branch protection settings.`,
				stopText: `Error hydrating branch protection settings.`,
				errorText: `Could not hydrate branch protection settings. `,
			}
		);

		successSpinnerBlock(`Finished API hydration.`);
	}

	if (skipUninstalls) {
		skipSpinnerBlock(
			`Skipping uninstall of devDependencies only used for setup.`
		);
	} else {
		await withSpinner(
			async () => {
				await fs.rm("./script", { force: true, recursive: true });
				await fs.rm(".github/workflows/setup.yml");
			},
			{
				startText: `Removing setup script...`,
				successText: `Removed setup script.`,
				stopText: `Error removing setup script.`,
				errorText: `Could not remove setup script. `,
			}
		);

		await withSpinner(
			async () => {
				await $`pnpm remove execa globby @clack/prompts all-contributors-cli chalk octokit npm-user replace-in-file title-case -D`;
			},
			{
				startText: `Removing devDependency packages only used for setup...`,
				successText: `Removed devDependency packages only used for setup.`,
				stopText: `Error removing devDependency packages only used for setup.`,
				errorText: `Could not remove devDependency packages only used for setup. `,
			}
		);
	}

	prompts.outro(chalk.blue`Great, looks like everything worked! 🎉`);

	console.log(chalk.blue`You may consider committing these changes:`);
	console.log();
	console.log(chalk.gray`git add -A`);
	console.log(chalk.gray`git commit -m "chore: hydrated repo"`);
	console.log(chalk.gray`git push`);
	console.log();
	console.log(chalk.greenBright`See ya! 👋`);
	console.log();

	exitCode = 0;
} catch (error) {
	prompts.outro(
		chalk.red`Looks like there was a problem. Correct it and try again? 😕`
	);

	console.log();
	console.log(error);
	console.log();

	exitCode = 1;
} finally {
	process.exit(exitCode);
}
