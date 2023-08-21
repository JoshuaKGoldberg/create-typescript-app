import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "../shared/cli/spinners.js";
import { getNpmAuthor } from "../shared/getNpmAuthor.js";
import { InputValuesAndOctokit } from "../shared/inputs.js";
import { addOwnerAsAllContributor } from "./settings/addOwnerAsAllContributor.js";
import { clearChangelog } from "./steps/clearChangelog.js";
import { migrateRepositoryLabels } from "./steps/labels/migrateRepositoryLabels.js";
import { migrateBranchProtectionSettings } from "./steps/migrateBranchProtectionSettings.js";
import { migrateRepositorySettings } from "./steps/migrateRepositorySettings.js";
import { removeSetupScripts } from "./steps/removeSetupScripts.js";
import { resetGitTags } from "./steps/resetGitTags.js";
import { uninstallPackages } from "./steps/uninstallPackages.js";
import { updateAllContributorsTable } from "./steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "./steps/updateLocalFiles.js";
import { updateReadme } from "./steps/updateReadme.js";

export async function initializeWithInformation({
	octokit,
	values,
}: InputValuesAndOctokit) {
	successSpinnerBlock("Started migrating package metadata locally.");

	await withSpinner(async () => {
		await addOwnerAsAllContributor(values.owner);
	}, "updating existing contributors details...");

	const npmAuthor = await getNpmAuthor(values.owner);

	await withSpinner(async () => {
		await updateLocalFiles({ ...values, npmAuthor });
	}, "Updating all the files with provided details.");

	await withSpinner(
		updateReadme,
		"Appending template-typescript-node-package notice to 'README.md'",
	);

	successSpinnerBlock(`Finished migrating package metadata locally.`);

	await withSpinner(clearChangelog, "clearing CHANGELOG.md");

	await withSpinner(async () => {
		await updateAllContributorsTable(values);
	}, "generating all-contributors table in README.md");

	await withSpinner(resetGitTags, "deleting local git tags...");

	if (!octokit) {
		skipSpinnerBlock(`Skipping API migration.`);
	} else {
		successSpinnerBlock(`Starting API migration.`);

		await withSpinner(migrateRepositoryLabels, "migrating repository labels");

		await withSpinner(async () => {
			await migrateRepositorySettings(octokit, values);
		}, "migrating initial repository settings");

		await withSpinner(
			() => migrateBranchProtectionSettings(octokit, values),
			"migrating branch protection settings",
			"private repositories require GitHub Pro for that API.",
		);

		successSpinnerBlock(`Finished API migration.`);
	}

	if (values.skipRemoval) {
		skipSpinnerBlock(`Skipping removal of setup scripts.`);
	} else {
		await withSpinner(removeSetupScripts, "removing setup scripts");
	}

	if (values.skipUninstalls) {
		skipSpinnerBlock(`Skipping uninstall of packages only used for setup.`);
	} else {
		await withSpinner(
			uninstallPackages,
			"removing packages only used for setup",
		);
	}
}
