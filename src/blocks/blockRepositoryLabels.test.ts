/* spellchecker:disable */
import { testBlock } from "bingo-stratum-testers";
import { githubDefaultLabels } from "github-default-labels";
import { describe, expect, test } from "vitest";

import { blockRepositoryLabels } from "./blockRepositoryLabels.js";
import { optionsBase } from "./options.fakes.js";
import { outcomeLabels } from "./outcomeLabels.js";

describe("blockRepositoryLabels", () => {
	test("when options.existingLabels is undefined", () => {
		const creation = testBlock(blockRepositoryLabels, {
			options: { ...optionsBase, existingLabels: undefined },
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'area: documentation'",
			      "parameters": {
			        "color": "0075ca",
			        "description": "Improvements or additions to docs 📝",
			        "name": "area: documentation",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'area: testing'",
			      "parameters": {
			        "color": "1177aa",
			        "description": "Improving how the repository's tests are run and/or code is tested 🧪",
			        "name": "area: testing",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'area: tooling'",
			      "parameters": {
			        "color": "f9d0c4",
			        "description": "Managing the repository's maintenance 🛠️",
			        "name": "area: tooling",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'good first issue'",
			      "parameters": {
			        "color": "5319E7",
			        "description": "Good for newcomers, please hop on! 🙌",
			        "name": "good first issue",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'invalid'",
			      "parameters": {
			        "color": "7a5901",
			        "description": "This doesn't seem right",
			        "name": "invalid",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: accepting prs'",
			      "parameters": {
			        "color": "0E8A16",
			        "description": "Please, send a pull request to resolve this! 🙏",
			        "name": "status: accepting prs",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: aged away'",
			      "parameters": {
			        "color": "eeeeee",
			        "description": "Issue is stale and/or no longer valid",
			        "name": "status: aged away",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: blocked'",
			      "parameters": {
			        "color": "ddcccc",
			        "description": "Waiting for something else to be resolved 🙅",
			        "name": "status: blocked",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: duplicate'",
			      "parameters": {
			        "color": "cfd3d7",
			        "description": "This issue or pull request already exists",
			        "name": "status: duplicate",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: in discussion'",
			      "parameters": {
			        "color": "05104F",
			        "description": "Not yet ready for implementation or a pull request",
			        "name": "status: in discussion",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: needs investigation'",
			      "parameters": {
			        "color": "D3F82D",
			        "description": "Further research required...? 🔎",
			        "name": "status: needs investigation",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: waiting for author'",
			      "parameters": {
			        "color": "E4BC82",
			        "description": "Needs an action taken by the original poster",
			        "name": "status: waiting for author",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: wontfix'",
			      "parameters": {
			        "color": "ffffff",
			        "description": "This will not be worked on",
			        "name": "status: wontfix",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'type: bug'",
			      "parameters": {
			        "color": "d73a4a",
			        "description": "Something isn't working 🐛",
			        "name": "type: bug",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'type: feature'",
			      "parameters": {
			        "color": "a2eeef",
			        "description": "New enhancement or request 🚀",
			        "name": "type: feature",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'type: question'",
			      "parameters": {
			        "color": "d876e3",
			        "description": "Further information is requested",
			        "name": "type: question",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'type: cleanup'",
			      "parameters": {
			        "color": "fde282",
			        "description": "Tech debt or other code/repository cleanups 🧹",
			        "name": "type: cleanup",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("when options.existingLabels contains default entries", () => {
		const creation = testBlock(blockRepositoryLabels, {
			options: { ...optionsBase, existingLabels: githubDefaultLabels },
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'documentation'",
			      "parameters": {
			        "color": "0075ca",
			        "description": "Improvements or additions to docs 📝",
			        "name": "documentation",
			        "new_name": "area: documentation",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'area: testing'",
			      "parameters": {
			        "color": "1177aa",
			        "description": "Improving how the repository's tests are run and/or code is tested 🧪",
			        "name": "area: testing",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'area: tooling'",
			      "parameters": {
			        "color": "f9d0c4",
			        "description": "Managing the repository's maintenance 🛠️",
			        "name": "area: tooling",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'good first issue'",
			      "parameters": {
			        "color": "5319E7",
			        "description": "Good for newcomers, please hop on! 🙌",
			        "name": "good first issue",
			        "new_name": "good first issue",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'invalid'",
			      "parameters": {
			        "color": "7a5901",
			        "description": "This doesn't seem right",
			        "name": "invalid",
			        "new_name": "invalid",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'help wanted'",
			      "parameters": {
			        "color": "0E8A16",
			        "description": "Please, send a pull request to resolve this! 🙏",
			        "name": "help wanted",
			        "new_name": "status: accepting prs",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: aged away'",
			      "parameters": {
			        "color": "eeeeee",
			        "description": "Issue is stale and/or no longer valid",
			        "name": "status: aged away",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: blocked'",
			      "parameters": {
			        "color": "ddcccc",
			        "description": "Waiting for something else to be resolved 🙅",
			        "name": "status: blocked",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'duplicate'",
			      "parameters": {
			        "color": "cfd3d7",
			        "description": "This issue or pull request already exists",
			        "name": "duplicate",
			        "new_name": "status: duplicate",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: in discussion'",
			      "parameters": {
			        "color": "05104F",
			        "description": "Not yet ready for implementation or a pull request",
			        "name": "status: in discussion",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: needs investigation'",
			      "parameters": {
			        "color": "D3F82D",
			        "description": "Further research required...? 🔎",
			        "name": "status: needs investigation",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'status: waiting for author'",
			      "parameters": {
			        "color": "E4BC82",
			        "description": "Needs an action taken by the original poster",
			        "name": "status: waiting for author",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'wontfix'",
			      "parameters": {
			        "color": "ffffff",
			        "description": "This will not be worked on",
			        "name": "wontfix",
			        "new_name": "status: wontfix",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'bug'",
			      "parameters": {
			        "color": "d73a4a",
			        "description": "Something isn't working 🐛",
			        "name": "bug",
			        "new_name": "type: bug",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'enhancement'",
			      "parameters": {
			        "color": "a2eeef",
			        "description": "New enhancement or request 🚀",
			        "name": "enhancement",
			        "new_name": "type: feature",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
			      "id": "patch label 'question'",
			      "parameters": {
			        "color": "d876e3",
			        "description": "Further information is requested",
			        "name": "question",
			        "new_name": "type: question",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/labels",
			      "id": "post label 'type: cleanup'",
			      "parameters": {
			        "color": "fde282",
			        "description": "Tech debt or other code/repository cleanups 🧹",
			        "name": "type: cleanup",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("when options.existingLabels contains duplicate entries", () => {
		const creation = testBlock(blockRepositoryLabels, {
			options: {
				...optionsBase,
				existingLabels: [
					...outcomeLabels.filter(
						(label) => !label.name.includes("documentation"),
					),
					{
						color: "0075ca",
						description: "Improvements or additions to docs 📝",
						name: "docs",
					},
					{
						color: "0075ca",
						description: "Improvements or additions to docs 📝",
						name: "area: documentation",
					},
				],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "DELETE /repos/{owner}/{repo}/labels/{name}",
			      "id": "delete label 'docs'",
			      "parameters": {
			        "name": "docs",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});
});
