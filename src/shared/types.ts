import { z } from "zod";

import { StatusCode } from "./codes.js";

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

/**
 * All runtime options that may (or must) be specified for setup.
 */
export interface Options {
	access: OptionsAccess;
	author?: string;
	base?: OptionsBase;
	description: string;
	directory: string;
	email: OptionsEmail;
	excludeAllContributors?: boolean;
	excludeCompliance?: boolean;
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
	keywords?: string[];
	logo: OptionsLogo | undefined;
	mode: Mode;
	offline?: boolean;
	owner: string;
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

export interface ModeResult {
	code: StatusCode;
	error?: string | z.ZodError<object>;
	options: Partial<Options>;
}

export type ModeRunner = (
	args: string[],
	promptedOptions?: PromptedOptions,
) => Promise<ModeResult>;

export type Mode = "create" | "initialize" | "migrate";
