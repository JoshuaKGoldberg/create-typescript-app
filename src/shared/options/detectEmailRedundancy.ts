export interface EmailValues {
	email?: boolean | string;
	"email-git"?: boolean | string;
	"email-github"?: boolean | string;
	"email-npm"?: boolean | string;
}

const specificKeys = ["email-git", "email-github", "email-npm"] as const;

export function detectEmailRedundancy(values: EmailValues) {
	const present = specificKeys
		.filter((key) => !!values[key])
		.map((key) => `--${key}`);

	if (values.email) {
		return present.length === 3
			? "If --email-git, --email-github, and --email-npm are specified, --email should not be."
			: undefined;
	}

	if (!values.email && !present.length) {
		return undefined;
	}

	if (present.length === specificKeys.length) {
		return undefined;
	}

	const specified =
		present.length === 1 ? `${present[0]} is` : `${present.join(" and ")} are`;

	const missing = specificKeys
		.filter((key) => !values[key])
		.map((key) => `--${key}`);

	const required =
		missing.length === 1 ? missing[0] : `both ${missing.join(" and ")}`;

	return `If ${specified} specified, either --email or ${required} should be.`;
}
