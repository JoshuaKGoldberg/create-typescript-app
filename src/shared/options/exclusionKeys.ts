import { Options, OptionsBase } from "../types.js";

export type ExclusionKey = keyof Options & `exclude${string}`;

export interface ExclusionDescription {
	hint: string;
	label: string;
	uncommon?: true;
}

export const exclusionDescriptions: Record<ExclusionKey, ExclusionDescription> =
	{
		excludeAllContributors: {
			hint: "--exclude-all-contributors",
			label:
				"Add all-contributors to track contributions and display them in a README.md table.",
		},
		excludeCompliance: {
			hint: "--exclude-compliance",
			label:
				"Add a GitHub Actions workflow to verify that PRs match an expected format.",
			uncommon: true,
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
			label:
				"Add eslint-plugin-package-json to lint for package.json correctness.",
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

export const exclusionKeys = Object.keys(
	exclusionDescriptions,
) as ExclusionKey[];

export function getExclusions(
	options: Partial<Options>,
	base?: OptionsBase,
): Partial<Options> {
	switch (base) {
		case "common":
			return {
				...Object.fromEntries(
					exclusionKeys
						.filter((exclusion) => exclusionDescriptions[exclusion].uncommon)
						.map((exclusion) => [exclusion, options[exclusion] ?? true]),
				),
			};
		case "minimum":
			return {
				...Object.fromEntries(
					exclusionKeys.map((exclusion) => [
						exclusion,
						options[exclusion] ?? true,
					]),
				),
			};
		// We only really care about exclusions on the common and minimum bases
		default:
			return {};
	}
}
