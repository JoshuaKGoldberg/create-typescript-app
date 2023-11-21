import { describe, expect, test } from "vitest";

import { generateNextSteps } from "./generateNextSteps.js";
import { Options } from "./types.js";

const options = {
	access: "public",
	base: "everything",
	description: "Test description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	mode: "create",
	owner: "TestOwner",
	repository: "test-repository",
	title: "Test Title",
} satisfies Options;

describe("generateNextSteps", () => {
	for (const excludeAllContributors of [false, true]) {
		for (const excludeReleases of [false, true]) {
			for (const excludeRenovate of [false, true]) {
				for (const excludeTests of [false, true]) {
					test(
						// eslint-disable-next-line vitest/valid-title
						JSON.stringify({
							excludeAllContributors,
							excludeReleases,
							excludeRenovate,
							excludeTests,
						}),
						() => {
							expect(
								generateNextSteps({
									...options,
									excludeAllContributors,
									excludeReleases,
									excludeRenovate,
									excludeTests,
								}),
							).toMatchSnapshot();
						},
					);
				}
			}
		}
	}
});
