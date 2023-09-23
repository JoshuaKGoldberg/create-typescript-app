import { Mode } from "../bin/mode.js";

export interface AllContributorContributor {
	contributions: string[];
	login: string;
}

export interface AllContributorsData {
	contributors: AllContributorContributor[];
}

export interface PartialPackageData {
	author?: { email: string; name: string } | string;
	dependencies?: Record<string, string>;
	description?: string;
	devDependencies?: Record<string, string>;
	email?: string;
	name?: string;
	repository?: { type: string; url: string } | string;
}

export type OptionsAccess = "public" | "restricted";

export type OptionsBase = "common" | "everything" | "minimum" | "prompt";

export interface OptionsEmail {
	github: string;
	npm: string;
}

export interface OptionsLogo {
	alt: string;
	src: string;
}

export interface Options {
	access: OptionsAccess;
	author?: string;
	base?: OptionsBase;
	createRepository?: boolean;
	description: string;
	email: OptionsEmail;
	excludeCompliance?: boolean;
	excludeContributors?: boolean;
	excludeLintDeprecation?: boolean;
	excludeLintESLint?: boolean;
	excludeLintJSDoc?: boolean;
	excludeLintJson?: boolean;
	excludeLintKnip?: boolean;
	excludeLintMd?: boolean;
	excludeLintPackageJson?: boolean;
	excludeLintPackages?: boolean;
	excludeLintPerfectionist?: boolean;
	excludeLintRegex?: boolean;
	excludeLintSpelling?: boolean;
	excludeLintStrict?: boolean;
	excludeLintStylistic?: boolean;
	excludeLintYml?: boolean;
	excludeReleases?: boolean;
	excludeRenovate?: boolean;
	excludeTests?: boolean;
	funding?: string;
	logo: OptionsLogo | undefined;
	mode: Mode;
	owner: string;
	repository: string;
	skipGitHubApi?: boolean;
	skipInstall?: boolean;
	skipRemoval?: boolean;
	skipRestore?: boolean;
	skipUninstall?: boolean;
	title: string;
}
