import { z } from "zod";

import { StatusCode } from "./codes.js";

export interface AllContributorContributor {
	avatar_url: string;
	contributions: string[];
	login: string;
	name: string;
	profile: string;
}

export interface AllContributorsData {
	contributors: AllContributorContributor[];
}

export type OptionsAccess = "public" | "restricted";

export type OptionsBase = "common" | "everything" | "minimal" | "prompt";

export interface OptionsEmail {
	github: string;
	npm: string;
}

export interface OptionsGuide {
	href: string;
	title: string;
}

export interface OptionsLogo {
	alt: string;
	src: string;
}

export interface PartialPackageData {
	author?: string | { email: string; name: string };
	bin?: string;
	dependencies?: Record<string, string>;
	description?: string;
	devDependencies?: Record<string, string>;
	email?: string;
	engines?: { node?: string };
	name?: string;
	repository?: string | { type: string; url: string };
	scripts?: Record<string, string>;
	version?: string;
}

/**
 * All runtime options that may (or must) be specified for setup.
 */
export interface Options {
	access: OptionsAccess;
	author?: string;
	base?: OptionsBase;
	bin?: string;
	description: string;
	directory: string;
	email: OptionsEmail;
	excludeAllContributors?: boolean;
	excludeBuild?: boolean;
	excludeCompliance?: boolean;
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
	excludeTemplatedBy?: boolean;
	excludeTests?: boolean;
	funding?: string;
	guide?: OptionsGuide;
	keywords?: string[];
	logo?: OptionsLogo;
	mode: Mode;
	offline?: boolean;
	owner: string;
	preserveGeneratedFrom?: boolean;
	repository: string;
	skipAllContributorsApi?: boolean;
	skipGitHubApi?: boolean;
	skipInstall?: boolean;
	skipRemoval?: boolean;
	skipRestore?: boolean;
	skipUninstall?: boolean;
	title: string;
}

/**
 * Options that might be suggested by how the user is running setup.
 */
export type Mode = "create" | "initialize" | "migrate";

export interface ModeResult {
	code: StatusCode;
	error?: string | z.ZodError<object>;
	options: Partial<Options>;
}

export type ModeRunner = (
	args: string[],
	promptedOptions?: PromptedOptions,
) => Promise<ModeResult>;

export interface PromptedOptions {
	/**
	 * Directory for the repository, if it may differ from the repository name.
	 */
	directory?: string;

	/**
	 * Repository name, if it may differ from the current directory.
	 */
	repository?: string;
}
