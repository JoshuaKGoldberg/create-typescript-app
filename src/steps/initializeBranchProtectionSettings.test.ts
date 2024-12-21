import { Octokit } from "octokit";
import { describe, expect, it, MockInstance, vi } from "vitest";

import { Options } from "../shared/types.js";
import { initializeBranchProtectionSettings } from "./initializeGitHubRepository/initializeBranchProtectionSettings.js";

const createMockOctokit = (request: MockInstance) =>
	({
		request,
	}) as unknown as Octokit;

const stubOptions = {
	access: "public",
	description: "",
	directory: "",
	email: {
		github: "",
		npm: "",
	},
	mode: "create",
	owner: "",
	repository: "",
	title: "",
} satisfies Options;

describe("migrateBranchProtectionSettings", () => {
	it("does not throw when the request receives a non-error response", async () => {
		const mockRequest = vi.fn().mockResolvedValue({ status: 200 });

		await expect(
			initializeBranchProtectionSettings(
				createMockOctokit(mockRequest),
				stubOptions,
			),
		).resolves.not.toThrow();

		expect(mockRequest.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "POST /repos/{owner}/{repo}/rulesets",
			    {
			      "bypass_actors": [
			        {
			          "actor_id": 5,
			          "actor_type": "RepositoryRole",
			          "bypass_mode": "always",
			        },
			      ],
			      "conditions": {
			        "ref_name": {
			          "exclude": [],
			          "include": [
			            "refs/heads/main",
			          ],
			        },
			      },
			      "enforcement": "active",
			      "name": "Branch protection for main",
			      "owner": "",
			      "repo": "",
			      "rules": [
			        {
			          "type": "deletion",
			        },
			        {
			          "parameters": {
			            "allowed_merge_methods": [
			              "squash",
			            ],
			            "dismiss_stale_reviews_on_push": false,
			            "require_code_owner_review": false,
			            "require_last_push_approval": false,
			            "required_approving_review_count": 0,
			            "required_review_thread_resolution": false,
			          },
			          "type": "pull_request",
			        },
			        {
			          "parameters": {
			            "required_status_checks": [
			              {
			                "context": "Build",
			              },
			              {
			                "context": "Compliance",
			              },
			              {
			                "context": "Lint",
			              },
			              {
			                "context": "Lint Knip",
			              },
			              {
			                "context": "Lint Markdown",
			              },
			              {
			                "context": "Lint Packages",
			              },
			              {
			                "context": "Lint Spelling",
			              },
			              {
			                "context": "Prettier",
			              },
			              {
			                "context": "Test",
			              },
			            ],
			            "strict_required_status_checks_policy": false,
			          },
			          "type": "required_status_checks",
			        },
			      ],
			      "target": "branch",
			    },
			  ],
			]
		`);
	});

	it("returns false when the request receives a 403 response", async () => {
		const mockRequest = vi.fn().mockRejectedValue({ status: 403 });

		const actual = await initializeBranchProtectionSettings(
			createMockOctokit(mockRequest),
			stubOptions,
		);

		expect(actual).toBe(false);
	});

	it("throws the error when the request throws with a non-403 response", async () => {
		const error = { status: 404 };
		const mockRequest = vi.fn().mockRejectedValue(error);

		await expect(() =>
			initializeBranchProtectionSettings(
				createMockOctokit(mockRequest),
				stubOptions,
			),
		).rejects.toBe(error);
	});

	it("doesn't create workflows for excluded options when specified", async () => {
		const mockRequest = vi.fn().mockResolvedValue({ status: 200 });

		await initializeBranchProtectionSettings(createMockOctokit(mockRequest), {
			...stubOptions,
			excludeCompliance: true,
			excludeLintKnip: true,
			excludeLintMd: true,
			excludeLintPackages: true,
			excludeLintSpelling: true,
			excludeTests: true,
		});

		expect(mockRequest.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "POST /repos/{owner}/{repo}/rulesets",
			    {
			      "bypass_actors": [
			        {
			          "actor_id": 5,
			          "actor_type": "RepositoryRole",
			          "bypass_mode": "always",
			        },
			      ],
			      "conditions": {
			        "ref_name": {
			          "exclude": [],
			          "include": [
			            "refs/heads/main",
			          ],
			        },
			      },
			      "enforcement": "active",
			      "name": "Branch protection for main",
			      "owner": "",
			      "repo": "",
			      "rules": [
			        {
			          "type": "deletion",
			        },
			        {
			          "parameters": {
			            "allowed_merge_methods": [
			              "squash",
			            ],
			            "dismiss_stale_reviews_on_push": false,
			            "require_code_owner_review": false,
			            "require_last_push_approval": false,
			            "required_approving_review_count": 0,
			            "required_review_thread_resolution": false,
			          },
			          "type": "pull_request",
			        },
			        {
			          "parameters": {
			            "required_status_checks": [
			              {
			                "context": "Build",
			              },
			              {
			                "context": "Lint",
			              },
			              {
			                "context": "Prettier",
			              },
			            ],
			            "strict_required_status_checks_policy": false,
			          },
			          "type": "required_status_checks",
			        },
			      ],
			      "target": "branch",
			    },
			  ],
			]
		`);
	});
});
