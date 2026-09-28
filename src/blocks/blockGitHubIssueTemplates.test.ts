import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockGitHubIssueTemplates", () => {
	test("marks its templates as previously .yml files", () => {
		const creation = testBlock(blockGitHubIssueTemplates, {
			options: optionsBase,
		});

		expect(creation.files?.[".github"]).toMatchObject({
			ISSUE_TEMPLATE: {
				"01-bug.yaml": [expect.any(String), { previously: ["01-bug.yml"] }],
				"02-documentation.yaml": [
					expect.any(String),
					{ previously: ["02-documentation.yml"] },
				],
				"03-feature.yaml": [
					expect.any(String),
					{ previously: ["03-feature.yml"] },
				],
				"04-tooling.yaml": [
					expect.any(String),
					{ previously: ["04-tooling.yml"] },
				],
			},
		});
	});
});
