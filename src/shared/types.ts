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

export type InputBase = "common" | "everything" | "minimum" | "prompt";

export interface Options {
	author?: string;
	base?: InputBase;
	createRepository?: boolean;
	description: string;
	email?: string;
	excludeCompliance?: boolean;
	excludeContributors?: boolean;
	excludeLintJson?: boolean;
	excludeLintKnip?: boolean;
	excludeLintMd?: boolean;
	excludeLintPackageJson?: boolean;
	excludeLintPackages?: boolean;
	excludeLintPerfectionist?: boolean;
	excludeLintSpelling?: boolean;
	excludeLintYml?: boolean;
	excludeReleases?: boolean;
	excludeRenovate?: boolean;
	excludeTests?: boolean;
	funding?: string;
	owner: string;
	repository: string;
	skipGitHubApi: boolean;
	skipInstall?: boolean;
	skipRemoval?: boolean;
	skipRestore?: boolean;
	skipUninstall?: boolean;
	title: string;
}
