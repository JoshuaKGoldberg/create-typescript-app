import { Options, OptionsBase } from "../types.js";

export type ExclusionKey = `exclude${string}` & keyof Options;

export interface ExclusionDescription {
	hint: string;
	label: string;
	level?: "common" | "minimal";
}

export const exclusionDescriptions: Record<ExclusionKey, ExclusionDescription> =
	{
		excludeAllContributors: {
			hint: "--exclude-all-contributors",
			label:
				"Add all-contributors to track contributions and display them in a README.md table.",
		},
		excludeBuild: {
			hint: "--exclude-build",
			label: "Add a tsup build step to generate built output files.",
			level: "minimal",
		},
		excludeCompliance: {
			hint: "--exclude-compliance",
			label:
				"Add a GitHub Actions workflow to verify that PRs match an expected format.",
			level: "common",
		},
		excludeLintESLint: {
			hint: "--exclude-lint-eslint",
			label:
				"Include eslint-plugin-eslint-comment to enforce good practices around ESLint comment directives.",
			level: "common",
		},
		excludeLintJSDoc: {
			hint: "--exclude-lint-jsdoc",
			label:
				"Include eslint-plugin-jsdoc to enforce good practices around JSDoc comments.",
			level: "common",
		},
		excludeLintJson: {
			hint: "--exclude-lint-json",
			label: "Apply linting and sorting to *.json and *.jsonc files.",
			level: "common",
		},
		excludeLintKnip: {
			hint: "--exclude-lint-knip",
			label: "Add Knip to detect unused files, dependencies, and code exports.",
		},
		excludeLintMd: {
			hint: "--exclude-lint-md",
			label: "Apply linting to *.md files.",
			level: "common",
		},
		excludeLintPackageJson: {
			hint: "--exclude-lint-package-json",
			label:
				"Add eslint-plugin-package-json to lint for package.json correctness.",
			level: "common",
		},
		excludeLintPackages: {
			hint: "--exclude-lint-packages",
			label:
				"Add a pnpm dedupe workflow to ensure packages aren't duplicated unnecessarily.",
			level: "common",
		},
		excludeLintPerfectionist: {
			hint: "--exclude-lint-perfectionist",
			label:
				"Apply eslint-plugin-perfectionist to ensure imports, keys, and so on are in sorted order.",
			level: "common",
		},
		excludeLintRegex: {
			hint: "--exclude-lint-regex",
			label:
				"Include eslint-plugin-regex to enforce good practices around regular expressions.",
			level: "common",
		},
		excludeLintSpelling: {
			hint: "--exclude-lint-spelling",
			label: "Add cspell to spell check against dictionaries of known words.",
			level: "common",
		},
		excludeLintStrict: {
			hint: "--exclude-lint-strict",
			label:
				"Include strict logical lint rules such as typescript-eslint's strict config. ",
			level: "common",
		},
		excludeLintStylistic: {
			hint: "--exclude-lint-stylistic",
			label:
				"Include stylistic lint rules such as typescript-eslint's stylistic config.",
			level: "common",
		},
		excludeLintYml: {
			hint: "--exclude-lint-yml",
			label: "Apply linting and sorting to *.yaml and *.yml files.",
			level: "common",
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
						.filter(
							(exclusion) =>
								exclusionDescriptions[exclusion].level === "common",
						)
						.map((exclusion) => [exclusion, options[exclusion] ?? true]),
				),
			};
		case "minimal":
			return {
				...Object.fromEntries(
					exclusionKeys
						.filter(
							(exclusion) =>
								exclusionDescriptions[exclusion].level !== "minimal",
						)
						.map((exclusion) => [exclusion, options[exclusion] ?? true]),
				),
			};
		// We only really care about exclusions on the common and minimal bases
		default:
			return {};
	}
}
