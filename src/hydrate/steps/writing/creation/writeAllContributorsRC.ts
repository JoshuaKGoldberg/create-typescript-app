import { readFileSafeAsJson } from "../../../../shared/readFileSafeAsJson.js";
import { AllContributorsData } from "../../../../shared/types.js";
import { HydrationInputValues } from "../../../values/types.js";
import { formatJson } from "./formatters/formatJson.js";

export async function writeAllContributorsRC(values: HydrationInputValues) {
	const existing = (await readFileSafeAsJson(
		".all-contributorsrc",
	)) as AllContributorsData | null;

	return await formatJson({
		badgeTemplate:
			'<img alt="All Contributors: <%= contributors.length %>" src="https://img.shields.io/badge/all_contributors-<%= contributors.length %>-21bb42.svg" />',
		commit: false,
		commitConvention: "angular",
		contributors: existing?.contributors ?? [],
		contributorsPerLine: 7,
		contributorsSortAlphabetically: true,
		files: ["README.md"],
		imageSize: 100,
		projectName: values.repository,
		projectOwner: values.owner,
		repoHost: "https://github.com",
		repoType: "github",
	});
}
