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
