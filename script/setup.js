import { appendFile, readFile, rm, writeFile } from "node:fs/promises";
import { EOL } from "node:os";
import { parseArgs } from "node:util";

import {
	cancel,
	confirm,
	intro,
	isCancel,
	outro,
	spinner,
	text,
} from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";
import gitRemoteOriginUrl from "git-remote-origin-url";
import gitUrlParse from "git-url-parse";
import { loadJsonFile } from "load-json-file";
import npmUser from "npm-user";
import { Octokit } from "octokit";
import prettier from "prettier";
import { readPackageUp } from "read-pkg-up";
import replace from "replace-in-file";
import titleize from "titleize";

const s = spinner();
let exitCode = 0;

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
		},
		tokens: true,
		strict: false,
	});

	async function getDefaultSettings() {
		try {
			const gitRemoteUrl = await gitRemoteOriginUrl();
			const { name, owner } = gitUrlParse(gitRemoteUrl);

			return { defaultOwner: owner, defaultRepository: name };
		} catch {
			console.log(
				chalk.red(
					"Could not populate default owner and repository. Did not detect a Git repository with an origin."
				)
			);

			return {
				defaultOwner: "UserName",
				defaultRepository: "my-lovely-repository",
			};
		}
	}

	const { defaultOwner, defaultRepository } = await getDefaultSettings();

	intro(
		chalk.blue(
			"Enter the details to hydrate your repository for your new package!"
		)
	);
	console.log();

	const getPrefillOrPromptedValue =
		(promptType = "text") =>
		async (key, message, placeholder) => {
			if (values[key]) {
				console.log(chalk.grey(`  Pre-filling ${key} to ${values[key]}.`));
				return values[key];
			}

			let value;

			if (promptType === "text") {
				value = await text({
					message,
					placeholder,
					validate: (val) => {
						if (val.length === 0) {
							return "Please enter a value.";
						}
					},
				});
			}

			if (promptType === "confirm") {
				value = await confirm({ message });
			}

			if (isCancel(value)) {
				cancel("Operation cancelled. Exiting setup - maybe another time? 👋");
				process.exit(0);
			}

			return value;
		};

	const getPrefillOrPromptedTextValue = getPrefillOrPromptedValue();

	const repository = await getPrefillOrPromptedTextValue(
		"repository",
		"What will the kebab-case name of the repository be?",
		defaultRepository
	);

	const title = await getPrefillOrPromptedTextValue(
		"title",
		"What will the Title Case title of the repository be?",
		titleize(repository).replaceAll("-", " ")
	);

	const owner = await getPrefillOrPromptedTextValue(
		"owner",
		"What owner or user will the repository be under?",
		defaultOwner
	);

	const description = await getPrefillOrPromptedTextValue(
		"description",
		"How would you describe the new package?",
		"A very lovely package. Hooray!"
	);

	const getPrefillOrPromptedConfirmValue = getPrefillOrPromptedValue("confirm");

	const skipApi = await getPrefillOrPromptedConfirmValue(
		"skip-api",
		"Whether to skip calling the GitHub API (effectively making this a local-only change)."
	);

	s.start(`Hydrating package metadata locally...`);

	const existingContributors = await loadJsonFile("./.all-contributorsrc");

	try {
		await writeFile(
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
	} catch (error) {
		s.stop(chalk.red`❌ Error hydrating package metadata locally.`);

		throw new Error(
			"Could not remove existing contributors & update '.all-contributorsrc' with new changes. ",
			{ cause: error }
		);
	}

	async function getNpmAuthor() {
		let username;

		try {
			const { stdout } = await $`npm whoami`.pipeStdout($`cat`);

			username = stdout;
		} catch (error) {
			console.log(
				chalk.yellow("Could not populate npm user. Failed to run npm whoami. ")
			);

			return owner;
		}

		let npmUserInfo;

		try {
			npmUserInfo = await npmUser(username);
		} catch {
			console.log(
				chalk.yellow(
					"Could not populate npm user. Failed to retrieve user info from npm. "
				)
			);

			return owner;
		}

		const { name = owner, email } = npmUserInfo;

		return email ? `${name} <${email}>` : name;
	}

	const npmAuthor = await getNpmAuthor();

	const { packageJson: existingPackage } = await readPackageUp();

	for (const [from, to, files = ["./.github/**/*", "./*.*"]] of [
		[new RegExp(existingPackage.description, "g"), description],
		[/Template TypeScript Node Package/g, title],
		[/JoshuaKGoldberg/g, owner],
		[/template-typescript-node-package/g, repository],
		[/"author": ".+"/g, `"author": "${npmAuthor}"`, "./package.json"],
		[/"setup": ".*",/g, ``, "./package.json"],
		[/"setup:test": ".*",/g, ``, "./package.json"],
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
		try {
			await replace({ files, from, to });
		} catch (error) {
			s.stop(chalk.red`❌ Error hydrating package metadata locally.`);

			throw new Error(`Failed to replace ${from} with ${to} in ${files}`, {
				cause: error,
			});
		}
	}

	try {
		await writeFile(
			".all-contributorsrc",
			prettier.format(
				JSON.stringify({
					...JSON.parse((await readFile(".all-contributorsrc")).toString()),
					projectName: repository,
					projectOwner: owner,
				}),
				{ parser: "json" }
			)
		);
	} catch (error) {
		s.stop(chalk.red`❌ Error hydrating package metadata locally.`);

		throw new Error(
			"Could not update to '.all-contributorsrc' with new repository details. ",
			{ cause: error }
		);
	}

	try {
		const endOfReadmeNotice = [
			``,
			`<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
			``,
			`> 💙 This package is based on [@JoshuaKGoldberg](https://github.com/JoshuaKGoldberg)'s [template-typescript-node-package](https://github.com/JoshuaKGoldberg/template-typescript-node-package).`,
			``,
		].join(EOL);

		await appendFile("./README.md", endOfReadmeNotice);
	} catch (error) {
		s.stop(chalk.red`❌ Error hydrating package metadata locally.`);

		throw new Error(
			"Could not append template-typescript-node-package details to 'README.md'. ",
			{ cause: error }
		);
	}

	s.stop(chalk.green`✅ Hydrated all the provided details.`);

	s.start(`Clearing CHANGELOG.md...`);

	try {
		await writeFile(
			"./CHANGELOG.md",
			prettier.format(`# Changelog`, { parser: "markdown" })
		);
	} catch (error) {
		s.stop(chalk.red`❌ Error clearing CHANGELOG.md.`);

		throw new Error("Could not empty 'CHANGELOG.md'. ", { cause: error });
	}

	s.stop(chalk.green`✅ Cleared CHANGELOG.md.`);

	s.start(`Generating all-contributors table in README.md...`);

	try {
		await $`pnpm all-contributors generate`;
	} catch (error) {
		s.stop(chalk.red`❌ Error generating all-contributors table in README.md.`);

		throw new Error("Could not empty 'CHANGELOG.md'. ", { cause: error });
	}

	s.stop(chalk.green`✅ Generated all-contributors table in README.md.`);

	s.start(`Deleting local git tags...`);

	try {
		const { stdout: allLocalTags } = await $`git tag -l`;
		const allLocalTagsArray = allLocalTags.split("\n").filter(Boolean);

		if (allLocalTagsArray.length !== 0) {
			await $`git tag -d ${allLocalTagsArray}`;
		}
	} catch (error) {
		s.stop(chalk.red`❌ Error deleting local git tags.`);

		throw new Error("Could not delete local git tags. ", { cause: error });
	}

	s.stop(chalk.green`✅ Deleted local git tags.`);

	s.start(`Starting API hydration....`);
	if (skipApi) {
		s.stop(chalk.yellow`➖ Skipping API hydration.`);
	} else {
		s.stop(chalk.green`✅ Starting API hydration.`);

		s.start(`Fetching gh auth status...`);

		const getAuthToken = async () => {
			try {
				await $`gh auth status`;
				const { stdout: auth } = await $`gh auth token`;

				return auth;
			} catch (error) {
				s.stop(chalk.red`❌ Error fetching gh auth status.`);

				throw new Error("Could not fetch github auth token. ", {
					cause: error,
				});
			}
		};

		const auth = await getAuthToken();

		s.stop(chalk.green`✅ Fetched gh auth status.`);

		s.start(`Hydrating repository labels...`);

		try {
			const { stdout } = await $`gh label list --json name`;
			const existingLabels = JSON.parse(stdout) ?? [];
			const outcomeLabels = await loadJsonFile("./script/labels.json");

			for (const outcome of outcomeLabels) {
				const action = existingLabels.some(
					(existing) => existing.name === outcome.name
				)
					? "edit"
					: "create";

				await $`gh label ${action} ${outcome.name} --color ${outcome.color} --description ${outcome.description}`;
			}
		} catch (error) {
			s.stop(chalk.red`❌ Error hydrating repository labels.`);

			throw new Error("Could not hydrate repository labels. ", {
				cause: error,
			});
		}

		s.stop(chalk.green`✅ Hydrated repository labels.`);

		s.start(`Hydrating initial repository settings...`);

		let octokit;

		try {
			octokit = new Octokit({ auth });

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
		} catch (error) {
			s.stop(chalk.red`❌ Error hydrating initial repository settings.`);

			throw new Error("Could not hydrate initial repository settings. ", {
				cause: error,
			});
		}

		s.stop(chalk.green`✅ Hydrated initial repository settings.`);

		s.start(`Hydrated branch protection settings...`);

		try {
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
		} catch (error) {
			s.stop(chalk.red`❌ Error hydrating branch protection settings.`);

			throw new Error("Could not hydrate branch protection settings. ", {
				cause: error,
			});
		}

		s.stop(chalk.green`✅ Hydrated branch protection settings.`);

		s.start(`Finishing API hydration...`);
		s.stop(chalk.green`✅ Finished API hydration.`);
	}

	s.start(`Removing setup script...`);

	try {
		await rm("./script", { force: true, recursive: true });
		await rm(".github/workflows/setup.yml");
	} catch (error) {
		s.stop(chalk.red`❌ Error removing setup script.`);

		throw new Error("Could not remove setup script. ", {
			cause: error,
		});
	}

	s.stop(chalk.green`✅ Removed setup script.`);

	s.start(`Removing devDependency packages only used for setup...`);

	try {
		await $`pnpm remove @clack/prompts all-contributors-cli chalk octokit npm-user replace-in-file titleize read-pkg-up load-json-file git-remote-origin-url git-url-parse execa -D`;
	} catch (error) {
		s.stop(
			chalk.red`❌ Error removing devDependency packages only used for setup`
		);

		throw new Error("Could not uninstalling packages. ", {
			cause: error,
		});
	}

	s.stop(chalk.green`✅ Removed devDependency packages only used for setup. `);

	outro(chalk.green`Great, looks like everything worked! 🎉`);

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
	s.start(`Restoring the changes done... `);

	await $`git restore .`;

	s.stop(`↩️  Restored the changes done.`);

	outro(
		chalk.red`Looks like there was a problem. Correct it and try again? 😕`
	);

	console.log();
	console.log(error);
	console.log();

	exitCode = 1;
} finally {
	process.exit(exitCode);
}
