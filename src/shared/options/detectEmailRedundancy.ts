export interface EmailValues {
	email?: boolean | string;
	"email-github"?: boolean | string;
	"email-npm"?: boolean | string;
}

export function detectEmailRedundancy(values: EmailValues) {
	if (values.email) {
		return values["email-github"] && values["email-npm"]
			? "--email should not be specified if both --email-github and --email-npm are specified."
			: undefined;
	}

	if (values["email-github"] && !values["email-npm"]) {
		return "If --email-github is specified, either --email or --email-npm should be.";
	}

	if (values["email-npm"] && !values["email-github"]) {
		return "If --email-npm is specified, either --email or --email-github should be.";
	}

	return undefined;
}
