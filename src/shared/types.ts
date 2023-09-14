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

export type InputBase = "everything" | "minimum" | "prompt";

export interface Options {
	author: string | undefined;
	base: InputBase | undefined;
	createRepository: boolean | undefined;
	description: string;
	email: string | undefined;
	excludeCompliance: boolean | undefined;
	excludeContributors: boolean | undefined;
	excludeLintJson: boolean | undefined;
	excludeLintKnip: boolean | undefined;
	excludeLintMd: boolean | undefined;
	excludeLintPackageJson: boolean | undefined;
	excludeLintPackages: boolean | undefined;
	excludeLintPerfectionist: boolean | undefined;
	excludeLintSpelling: boolean | undefined;
	excludeLintYml: boolean | undefined;
	excludeReleases: boolean | undefined;
	excludeRenovate: boolean | undefined;
	excludeTests: boolean | undefined;
	funding: string | undefined;
	owner: string;
	repository: string;
	skipGitHubApi: boolean;
	skipInstall: boolean | undefined;
	skipRemoval: boolean | undefined;
	skipRestore: boolean | undefined;
	skipUninstall: boolean | undefined;
	title: string;
}
