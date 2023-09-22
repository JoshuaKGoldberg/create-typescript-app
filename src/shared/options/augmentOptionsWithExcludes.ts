import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { filterPromptCancel } from "../prompts.js";
import { Options, OptionsBase } from "../types.js";

interface ExclusionDescription {
	hint: string;
	label: string;
	uncommon?: true;
}

type ExclusionKey = keyof Options & `exclude${string}`;

const exclusionDescriptions: Record<ExclusionKey, ExclusionDescription> = {
	excludeCompliance: {
		hint: "--exclude-compliance",
		label:
			"Add a GitHub Actions workflow to verify that PRs match an expected format.",
		uncommon: true,
	},
	excludeContributors: {
		hint: "--exclude-contributors",
		label:
			"Add all-contributors to track contributions and display them in a README.md table.",
	},
	excludeLintDeprecation: {
		hint: "--exclude-lint-deprecation",
		label:
			"Include an eslint-plugin-deprecation to reports on usage of code marked as @deprecated.",
		uncommon: true,
	},
	excludeLintESLint: {
		hint: "--exclude-lint-eslint",
		label:
			"Include eslint-plugin-eslint-comment to enforce good practices around ESLint comment directives.",
		uncommon: true,
	},
	excludeLintJSDoc: {
		hint: "--exclude-lint-jsdoc",
		label:
			"Include eslint-plugin-jsdoc to enforce good practices around JSDoc comments.",
		uncommon: true,
	},
	excludeLintJson: {
		hint: "--exclude-lint-json",
		label: "Apply linting and sorting to *.json and *.jsonc files.",
		uncommon: true,
	},
	excludeLintKnip: {
		hint: "--exclude-lint-knip",
		label: "Add Knip to detect unused files, dependencies, and code exports.",
	},
	excludeLintMd: {
		hint: "--exclude-lint-md",
		label: "Apply linting to *.md files.",
		uncommon: true,
	},
	excludeLintPackageJson: {
		hint: "--exclude-lint-package-json",
		label: "Add npm-package-json-lint to lint for package.json correctness.",
		uncommon: true,
	},
	excludeLintPackages: {
		hint: "--exclude-lint-packages",
		label:
			"Add a pnpm dedupe workflow to ensure packages aren't duplicated unnecessarily.",
		uncommon: true,
	},
	excludeLintPerfectionist: {
		hint: "--exclude-lint-perfectionist",
		label:
			"Apply eslint-plugin-perfectionist to ensure imports, keys, and so on are in sorted order.",
		uncommon: true,
	},
	excludeLintRegex: {
		hint: "--exclude-lint-regex",
		label:
			"Include eslint-plugin-regex to enforce good practices around regular expressions.",
		uncommon: true,
	},
	excludeLintSpelling: {
		hint: "--exclude-lint-spelling",
		label: "Add cspell to spell check against dictionaries of known words.",
		uncommon: true,
	},
	excludeLintStrict: {
		hint: "--exclude-lint-strict",
		label:
			"Include strict logical lint rules such as typescript-eslint's strict config. ",
		uncommon: true,
	},
	excludeLintStylistic: {
		hint: "--exclude-lint-stylistic",
		label:
			"Include stylistic lint rules such as typescript-eslint's stylistic config.",
		uncommon: true,
	},
	excludeLintYml: {
		hint: "--exclude-lint-yml",
		label: "Apply linting and sorting to *.yaml and *.yml files.",
		uncommon: true,
	},
	excludeReleases: {
		hint: "--exclude-releases",
		label:
			"Add release-it to generate changelogs, package bumps, and publishes based on conventional commits.",
	},
	excludeRenovate: {
		hint: "--exclude-renovate",
		label: "Add a Renovate config to keep dependencies up-to-date with PRs.",
	},
	excludeTests: {
		hint: "--exclude-tests",
		label:
			"Add Vitest tooling for fast unit tests, configured with coverage tracking.",
	},
};

const exclusionKeys = Object.keys(exclusionDescriptions) as ExclusionKey[];

export async function augmentOptionsWithExcludes(
	options: Options,
): Promise<Options | undefined> {
	if (
		Object.keys(options).some(
			(key) =>
				key in exclusionDescriptions &&
				options[key as keyof typeof options] !== undefined,
		)
	) {
		return options;
	}

	const base =
		options.base ??
		filterPromptCancel<OptionsBase | symbol>(
			await prompts.select({
				initialValue: "common" as OptionsBase,
				message: `How much tooling would you like the template to set up for you?`,
				options: [
					{
						label: makeLabel(
							"everything",
							"The most comprehensive tooling imaginable: sorting, spellchecking, and more!",
						),
						value: "everything",
					},
					{
						hint: "recommended",
						label: makeLabel(
							"common",
							"Bare starters plus testing and automation for all-contributors and releases.",
						),
						value: "common",
					},
					{
						label: makeLabel(
							"minimum",
							"Just bare starter tooling: building, formatting, linting, and type checking.",
						),
						value: "minimum",
					},
					{
						label: makeLabel("prompt", "(allow me to customize)"),
						value: "prompt",
					},
				],
			}),
		);

	switch (base) {
		case undefined:
			return undefined;

		case "common":
			return {
				...options,
				...Object.fromEntries(
					exclusionKeys
						.filter((exclusion) => exclusionDescriptions[exclusion].uncommon)
						.map((exclusion) => [exclusion, options[exclusion] ?? true]),
				),
			};

		case "everything":
			return options;

		case "minimum":
			return {
				...options,
				...Object.fromEntries(
					exclusionKeys.map((exclusion) => [
						exclusion,
						options[exclusion] ?? true,
					]),
				),
			};

		case "prompt":
			const exclusionsNotEnabled = new Set(
				filterPromptCancel(
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
				...options,
				...Object.fromEntries(
					exclusionKeys.map(
						(exclusionKey) =>
							[exclusionKey, !exclusionsNotEnabled.has(exclusionKey)] as const,
					),
				),
			};
	}
}

function makeLabel(label: string, message: string) {
	return [chalk.bold(label), message].join("\t ");
}
