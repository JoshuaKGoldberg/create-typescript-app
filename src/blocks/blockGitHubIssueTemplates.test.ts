import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { optionsBase } from "./options.fakes.js";

describe("blockGitHubIssueTemplates", () => {
	test("transition mode", () => {
		const creation = testBlock(blockGitHubIssueTemplates, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation.addons).toContainEqual(
			blockRemoveFiles({
				files: [
					".github/ISSUE_TEMPLATE/01-bug.yml",
					".github/ISSUE_TEMPLATE/02-documentation.yml",
					".github/ISSUE_TEMPLATE/03-feature.yml",
					".github/ISSUE_TEMPLATE/04-tooling.yml",
				],
			}),
		);
	});
});
