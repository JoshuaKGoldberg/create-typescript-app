import {
	skipSpinnerBlock,
	successSpinnerBlock,
	withSpinner,
} from "../shared/cli/spinners.js";
import { getNpmAuthor } from "../shared/getNpmAuthor.js";
import { InputValuesAndOctokit } from "../shared/inputs.js";
import { addOwnerAsAllContributor } from "./settings/addOwnerAsAllContributor.js";
import { clearChangelog } from "./steps/clearChangelog.js";
import { hydrateBranchProtectionSettings } from "./steps/hydrateBranchProtectionSettings.js";
import { hydrateRepositorySettings } from "./steps/hydrateRepositorySettings.js";
import { hydrateRepositoryLabels } from "./steps/labels/hydrateRepositoryLabels.js";
import { removeSetupScripts } from "./steps/removeSetupScripts.js";
import { resetGitTags } from "./steps/resetGitTags.js";
import { uninstallPackages } from "./steps/uninstallPackages.js";
import { updateAllContributorsFile } from "./steps/updateAllContributorsFile.js";
import { updateAllContributorsTable } from "./steps/updateAllContributorsTable.js";
import { updateLocalFiles } from "./steps/updateLocalFiles.js";
import { updateReadme } from "./steps/updateReadme.js";

export async function setupWithInformation({
	octokit,
	values,
}: InputValuesAndOctokit) {
	successSpinnerBlock("Started hydrating package metadata locally.");

	await withSpinner(
		() => addOwnerAsAllContributor(values.owner),
		"updating existing contributors details..."
	);

	const npmAuthor = await getNpmAuthor(values.owner);

	await withSpinner(
		() => updateLocalFiles({ ...values, npmAuthor }),
		"Updating all the files with provided details."
	);

	await withSpinner(
		() => updateAllContributorsFile(values),
		"Updating '.all-contributorsrc' with new repository details."
	);

	await withSpinner(
		updateReadme,
		"Appending template-typescript-node-package notice to 'README.md'"
	);

	successSpinnerBlock(`Finished hydrating package metadata locally.`);

	await withSpinner(clearChangelog, "clearing CHANGELOG.md");

	await withSpinner(
		() => updateAllContributorsTable(values),
		"generating all-contributors table in README.md"
	);

	await withSpinner(resetGitTags, "deleting local git tags...");

	if (!octokit) {
		skipSpinnerBlock(`Skipping API hydration.`);
	} else {
		successSpinnerBlock(`Starting API hydration.`);

		await withSpinner(hydrateRepositoryLabels, "hydrating repository labels");

		await withSpinner(
			() => hydrateRepositorySettings(octokit, values),
			"hydrating initial repository settings"
		);

		await withSpinner(
			() => hydrateBranchProtectionSettings(octokit, values),
			"hydrating branch protection settings",
			"private repositories require GitHub Pro for that API."
		);

		successSpinnerBlock(`Finished API hydration.`);
	}

	if (values.skipRemoval) {
		skipSpinnerBlock(`Skipping removal of setup scripts.`);
	} else {
		await withSpinner(removeSetupScripts, "removing setup scripts");
	}

	if (values.skipUninstalls) {
		skipSpinnerBlock(`Skipping uninstall of packages only used for setup.`);
	} else {
		await withSpinner(uninstallPackages, "removing packages only");
	}
}
