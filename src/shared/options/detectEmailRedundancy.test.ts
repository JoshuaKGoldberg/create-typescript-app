import { describe, expect, it, test } from "vitest";

import { detectEmailRedundancy, EmailValues } from "./detectEmailRedundancy.js";

describe("detectEmailRedundancy", () => {
	test.each<[(keyof EmailValues)[], string | undefined]>([
		[[], undefined],
		[["email"], undefined],
		[["email", "email-git"], undefined],
		[["email", "email-github"], undefined],
		[["email", "email-npm"], undefined],
		[["email", "email-git", "email-github"], undefined],
		[["email", "email-git", "email-npm"], undefined],
		[["email", "email-github", "email-npm"], undefined],
		[
			["email", "email-git", "email-github", "email-npm"],
			"If --email-git, --email-github, and --email-npm are specified, --email should not be.",
		],
		[
			["email-git"],
			"If --email-git is specified, either --email or both --email-github and --email-npm should be.",
		],
		[
			["email-github"],
			"If --email-github is specified, either --email or both --email-git and --email-npm should be.",
		],
		[
			["email-npm"],
			"If --email-npm is specified, either --email or both --email-git and --email-github should be.",
		],
		[
			["email-git", "email-github"],
			"If --email-git and --email-github are specified, either --email or --email-npm should be.",
		],
		[
			["email-git", "email-npm"],
			"If --email-git and --email-npm are specified, either --email or --email-github should be.",
		],
		[
			["email-github", "email-npm"],
			"If --email-github and --email-npm are specified, either --email or --email-git should be.",
		],
	])("%o", (keys, expected) => {
		expect(
			detectEmailRedundancy(
				Object.fromEntries(keys.map((key) => [key, `${key}@test.com`])),
			),
		).toBe(expected);
	});
});
