import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRepositorySettings } from "./blockRepositorySettings.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRepositorySettings", () => {
	test("with a short description", () => {
		const creation = testBlock(blockRepositorySettings, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}",
			      "parameters": {
			        "allow_auto_merge": true,
			        "allow_merge_commit": false,
			        "allow_rebase_merge": false,
			        "allow_squash_merge": true,
			        "delete_branch_on_merge": true,
			        "description": "Test description",
			        "has_wiki": false,
			        "owner": "test-owner",
			        "repo": "test-repository",
			        "security_and_analysis": {
			          "secret_scanning": {
			            "status": "enabled",
			          },
			          "secret_scanning_push_protection": {
			            "status": "enabled",
			          },
			        },
			        "squash_merge_commit_message": "PR_BODY",
			        "squash_merge_commit_title": "PR_TITLE",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("with a long HTML description", () => {
		const creation = testBlock(blockRepositorySettings, {
			options: {
				...optionsBase,
				description: `A very very very very very very very very very very very very very very very very long <em><code>HTML-ish</code> description</em> ending with an emoji. 🧵`,
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}",
			      "parameters": {
			        "allow_auto_merge": true,
			        "allow_merge_commit": false,
			        "allow_rebase_merge": false,
			        "allow_squash_merge": true,
			        "delete_branch_on_merge": true,
			        "description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
			        "has_wiki": false,
			        "owner": "test-owner",
			        "repo": "test-repository",
			        "security_and_analysis": {
			          "secret_scanning": {
			            "status": "enabled",
			          },
			          "secret_scanning_push_protection": {
			            "status": "enabled",
			          },
			        },
			        "squash_merge_commit_message": "PR_BODY",
			        "squash_merge_commit_title": "PR_TITLE",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});
});
