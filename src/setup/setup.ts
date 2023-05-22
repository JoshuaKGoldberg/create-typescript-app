import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { $ } from "execa";

import { handlePromptCancel } from "./cli/prompts.js";
import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "./cli/spinners.js";
import { getNpmAuthor } from "./settings/getNpmAuthor.js";
import { getUser } from "./settings/getUser.js";
import { getInputValuesAndOctokit } from "./settings/inputs.js";
import { clearChangelog } from "./steps/clearChangelog.js";
import { hydrateBranchProtectionSettings } from "./steps/hydrateBranchProtectionSettings.js";
import { hydrateRepositoryLabels } from "./steps/hydrateRepositoryLabels.js";
import { hydrateRepositorySettings } from "./steps/hydrateRepositorySettings.js";
import { removeSetupScripts } from "./steps/removeSetupScripts.js";
import { resetGitTags } from "./steps/resetGitTags.js";
import { uninstallPackages } from "./steps/uninstallPackages.js";
import { updateAllContributorsFile } from "./steps/updateAllContributorsFile.js";
import { updateAllContributorsTable } from "./steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "./steps/updateLocalFiles.js";
import { updateReadme } from "./steps/updateReadme.js";

export async function setup(args: string[]) {
	let exitCode = 0;
	let skipRestore = true;

	try {
		console.clear();
		console.log(
			chalk.greenBright`Welcome to the`,
			chalk.bgGreenBright.black`template-typescript-node-package`,
			chalk.greenBright`package setup! 🎉`
		);
		console.log();

		const { octokit, values } = await getInputValuesAndOctokit(args);

		skipRestore = !!values.skipRestore;

		prompts.intro(
			chalk.blue(
				"Let's collect some information to fill out repository details..."
			)
		);
		console.log(chalk.gray("│"));

		successSpinnerBlock("Started hydrating package metadata locally.");

		await withSpinner(() => getUser(values.owner), {
			startText: "Updating existing contributors details...",
			successText: `Updated existing contributors details.`,
			stopText: `Error updating existing contributors details.`,
			errorText:
				"Failed to remove existing contributors & update '.all-contributorsrc' with new changes. ",
		});

		const npmAuthor = await getNpmAuthor(values.owner);

		await withSpinner(() => updateLocalFiles({ ...values, npmAuthor }), {
			startText: "Updating all the files with provided details...",
			successText: `Updated all the files with provided details.`,
			stopText: `Error updating all the files with provided details.`,
			errorText: "Failed to update all the files with provided details. ",
		});

		await withSpinner(() => updateAllContributorsFile(values), {
			startText:
				"Updating '.all-contributorsrc' with new repository details...",
			successText: `Updated '.all-contributorsrc' with new repository details.`,
			stopText: `Error updating '.all-contributorsrc' with new repository details.`,
			errorText:
				"Failed to update '.all-contributorsrc' with new repository details. ",
		});

		await withSpinner(updateReadme, {
			startText:
				"Appending template-typescript-node-package notice to 'README.md'...",
			successText: `Appended template-typescript-node-package notice to 'README.md'.`,
			stopText: `Error appending template-typescript-node-package notice to 'README.md'.`,
			errorText:
				"Failed to append template-typescript-node-package notice to 'README.md'. ",
		});

		successSpinnerBlock(`Finished hydrating package metadata locally.`);

		await withSpinner(clearChangelog, {
			startText: `Clearing CHANGELOG.md...`,
			successText: `Cleared CHANGELOG.md.`,
			stopText: `Error clearing CHANGELOG.md.`,
			errorText: `Could not empty 'CHANGELOG.md'. `,
		});

		await withSpinner(() => updateAllContributorsTable(values), {
			startText: `Generating all-contributors table in README.md...`,
			successText: `Generated all-contributors table in README.md.`,
			stopText: `Error generating all-contributors table in README.md.`,
			errorText: `Could not empty 'CHANGELOG.md'. `,
		});

		await withSpinner(resetGitTags, {
			startText: `Deleting local git tags...`,
			successText: `Deleted local git tags.`,
			stopText: `Error deleting local git tags.`,
			errorText: `Could not delete local git tags. `,
		});

		if (!octokit) {
			skipSpinnerBlock(`Skipping API hydration.`);
		} else {
			successSpinnerBlock(`Starting API hydration.`);

			await withSpinner(hydrateRepositoryLabels, {
				startText: `Hydrating repository labels...`,
				successText: `Hydrated repository labels.`,
				stopText: `Error hydrating repository labels.`,
				errorText: `Could not hydrate repository labels. `,
			});

			await withSpinner(() => hydrateRepositorySettings(octokit, values), {
				startText: `Hydrating initial repository settings...`,
				successText: `Hydrated initial repository settings.`,
				stopText: `Error hydrating initial repository settings.`,
				errorText: `Could not hydrate initial repository settings. `,
			});

			await withSpinner(
				() => hydrateBranchProtectionSettings(octokit, values),
				{
					startText: `Hydrating branch protection settings...`,
					successText: `Hydrated branch protection settings.`,
					stopText: `Error hydrating branch protection settings.`,
					errorText: `Could not hydrate branch protection settings. `,
					warnText: `Could not hydrate branch protection settings: private repositories require GitHub Pro for that API.`,
				}
			);

			successSpinnerBlock(`Finished API hydration.`);
		}

		await withSpinner(removeSetupScripts, {
			startText: `Removing setup scripts...`,
			successText: `Removed setup scripts.`,
			stopText: `Error removing setup scripts.`,
			errorText: `Could not remove setup scripts. `,
		});

		if (values.skipUninstalls) {
			skipSpinnerBlock(`Skipping uninstall of packages only used for setup.`);
		} else {
			await withSpinner(uninstallPackages, {
				startText: `Removing packages only used for setup...`,
				successText: `Removed packages only used for setup.`,
				stopText: `Error removing packages only used for setup.`,
				errorText: `Could not remove packages only used for setup. `,
			});
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

		if (skipRestore) {
			console.log();
			console.log(
				chalk.gray`Skipping restoring local repository, as requested.`
			);
			console.log();
		} else {
			const shouldRestore = await prompts.confirm({
				message:
					"Do you want to restore the repository to how it was before running setup?",
			});

			handlePromptCancel(shouldRestore);

			if (shouldRestore) {
				console.log();
				console.log(
					chalk.gray`Resetting repository using`,
					chalk.reset`git restore .`
				);
				await $`git restore .`;
				console.log("Repository is reset. Ready to try again?");
				console.log();
			}
		}

		exitCode = 1;
	}

	return exitCode;
}
