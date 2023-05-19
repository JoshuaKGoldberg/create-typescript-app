export interface RepositorySettings {
	author: string;
	description: string;
	email: string;
	funding?: string;
	owner: string;
	releases: boolean;
	repository: string;
	title: string;
	unitTests: boolean;
}

type NullableProperties<T> = {
	[K in keyof T]: T[K] | undefined;
};

export function ensureSettingsAreFilledOut(
	settings: NullableProperties<RepositorySettings>
): asserts settings is RepositorySettings {
	const complaints: string[] = [];

	for (const [key, suggestion] of [
		["description", "add a 'description' to package.json"],
		["repository", "add a 'name' to package.json"],
		[
			"author",
			"add an 'author' to package.json like \"Your Name <your@email.com>\" or an { email, name } object",
		],
		[
			"email",
			"add an 'author' to package.json like \"Your Name <your@email.com>\" or an { email, name } object",
		],
		["owner", "add an 'origin' git remote"],
		["title", "add an h1 to the README.md"],
	] as const) {
		if (!settings[key]) {
			complaints.push(
				`- Could not determine ${key}. Please ${suggestion}, or provide with --${key}.`
			);
		}
	}

	if (complaints.length) {
		throw new Error(
			`Failed to determine repository settings:\n${complaints.join("\n")}`
		);
	}
}
