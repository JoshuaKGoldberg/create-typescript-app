import * as prompts from "@clack/prompts";

import { handlePromptCancel } from "./prompts.js";
import { InputValues } from "./readInputs.js";

type Basis = "everything" | "minimum" | "prompt";

const exclusionDescriptions = {
	excludeCompliance: {
		hint: "--exclude-compliance",
		label:
			"Add a GitHub Actions workflow to verify that PRs match an expected format.",
	},
	excludeContributors: {
		hint: "--exclude-contributors",
		label:
			"Add all-contributors to track contributions and display them in a README.md table.",
	},
	excludeLintJson: {
		hint: "--exclude-lint-json",
		label: "Apply linting and sorting to *.json and *.jsonc files.",
	},
	excludeLintKnip: {
		hint: "--exclude-lint-knip",
		label: "Add Knip to detect unused files, dependencies, and code exports.",
	},
	excludeLintMd: {
		hint: "--exclude-lint-md",
		label: "Apply linting to *.md files.",
	},
	excludeLintPackageJson: {
		hint: "--exclude-lint-package-json",
		label: "Add npm-package-json-lint to lint for package.json correctness.",
	},
	excludeLintPackages: {
		hint: "--exclude-lint-packages",
		label:
			"Add a pnpm dedupe workflow to ensure packages aren't duplicated unnecessarily.",
	},
	excludeLintPerfectionist: {
		hint: "--exclude-lint-perfectionist",
		label:
			"Apply eslint-plugin-perfectionist to ensure imports, keys, and so on are in sorted order.",
	},
	excludeLintSpelling: {
		hint: "--exclude-lint-spelling",
		label: "Add cspell to spell check against dictionaries of known words.",
	},
	excludeLintYml: {
		hint: "--exclude-lint-yml",
		label: "Apply linting and sorting to *.yaml and *.yml files.",
	},
	excludeReleases: {
		hint: "--exclude-releases",
		label:
			"Add release-it to generate changelogs, package bumps, and publishes based on conventional commits.",
	},
	excludeRenovate: {
		hint: "--exclude-renovate",
		label: "Add a Renovate config to dependencies up-to-date with PRs.",
	},
	excludeTests: {
		hint: "--exclude-tests",
		label:
			"Add Vitest tooling for fast unit tests, configured with coverage tracking.",
	},
} as const;

type ExclusionKey = keyof typeof exclusionDescriptions;

const exclusionKeys = Object.keys(exclusionDescriptions) as ExclusionKey[];

export async function augmentValuesWithExcludes(
	values: InputValues,
): Promise<InputValues> {
	const alreadyExcluded = exclusionKeys.filter(
		(exclusionKey) => values[exclusionKey],
	);

	if (alreadyExcluded.length) {
		return {
			...values,
			...Object.fromEntries(
				alreadyExcluded.map((exclusion) => [exclusion, true]),
			),
		};
	}

	const base =
		values.base ??
		handlePromptCancel<Basis | symbol>(
			await prompts.select({
				message: `How much tooling would you like the template to set up for you?`,
				options: [
					{
						hint: "recommended",
						label: "Everything! 🙌",
						value: "everything",
					},
					{
						label: "Just the bare essentials, please.",
						value: "minimum",
					},
					{
						label: "Allow me to customize.",
						value: "prompt",
					},
				],
			}),
		);

	switch (base) {
		case "everything":
			return values;

		case "minimum":
			return {
				...values,
				...Object.fromEntries(
					exclusionKeys.map((exclusion) => [
						exclusion,
						values[exclusion] ?? true,
					]),
				),
			};

		case "prompt":
			const exclusionsNotEnabled = new Set(
				handlePromptCancel(
					await prompts.multiselect({
						initialValues: exclusionKeys,
						message:
							"Select the tooling portions you'd like to remove. All are enabled by default.",
						options: Object.entries(exclusionDescriptions).map(
							([value, { hint, label }]) => ({
								hint,
								label,
								value: value as ExclusionKey,
							}),
						),
					}),
				),
			);

			return {
				...values,
				...Object.fromEntries(
					exclusionKeys.map(
						(exclusionKey) =>
							[exclusionKey, !exclusionsNotEnabled.has(exclusionKey)] as const,
					),
				),
			};
	}
}
