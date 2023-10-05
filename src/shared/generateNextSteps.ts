import { OutroGroup } from "./cli/outro.js";
import { Options } from "./types.js";

export function generateNextSteps(options: Options): OutroGroup[] {
	const lines = [
		joinedMessage(
			"enable the",
			[
				options.excludeTests || ["Codecov", "https://github.com/apps/codecov"],
				options.excludeRenovate || [
					"Renovate",
					"https://github.com/apps/renovate",
				],
			],
			"GitHub app",
		),
		joinedMessage(
			"populate the",
			[
				(options.excludeAllContributors && options.excludeReleases) || [
					"ACCESS_TOKEN",
					"a GitHub PAT with repo and workflow permissions",
				],
				options.excludeReleases || [
					"NPM_TOKEN",
					"an npm access token with automation permissions",
				],
			],
			"secret",
		),
	].filter((line): line is string => !!line);

	switch (lines.length) {
		case 0:
			return [];
		case 1:
			return [{ label: `Be sure to ${lines[0]}` }];
		default:
			return [
				{
					label: "Be sure to:",
					lines: lines.map((line) => `- ${line}`),
				},
			];
	}
}

const itemBreak = "\n   - ";

function joinedMessage(
	prefix: string,
	entries: ([string, string] | true)[],
	suffix: string,
) {
	const realEntries = entries.filter(
		(entry): entry is [string, string] => entry !== true,
	);

	switch (realEntries.length) {
		case 0:
			return undefined;
		case 1:
			return `${prefix} ${realEntries[0][0]} ${suffix} (${realEntries[0][1]}).`;
		default:
			return `${prefix} ${suffix}s: ${itemBreak}${realEntries
				.map((entry) => `${entry[0]} (${entry[1]})`)
				.join(itemBreak)}`;
	}
}
