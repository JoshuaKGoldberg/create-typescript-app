import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.js";
import { optionsBase } from "./options.fakes.js";

describe("blockRepositoryBranchRuleset", () => {
	test("without addons when mode is undefined", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("without addons when mode is setup", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/rulesets",
			      "parameters": {
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
			        "owner": "test-owner",
			        "repo": "test-repository",
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
			              "required_status_checks": [],
			              "strict_required_status_checks_policy": false,
			            },
			            "type": "required_status_checks",
			          },
			        ],
			        "ruleset_id": undefined,
			        "target": "branch",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("without addons when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
			      "parameters": {
			        "branch": "main",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "silent": true,
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/rulesets",
			      "parameters": {
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
			        "owner": "test-owner",
			        "repo": "test-repository",
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
			              "required_status_checks": [],
			              "strict_required_status_checks_policy": false,
			            },
			            "type": "required_status_checks",
			          },
			        ],
			        "ruleset_id": undefined,
			        "target": "branch",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("with addons when mode is undefined", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with addons when mode is setup", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "setup",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/rulesets",
			      "parameters": {
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
			        "owner": "test-owner",
			        "repo": "test-repository",
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
			                  "context": "build",
			                },
			                {
			                  "context": "test",
			                },
			              ],
			              "strict_required_status_checks_policy": false,
			            },
			            "type": "required_status_checks",
			          },
			        ],
			        "ruleset_id": undefined,
			        "target": "branch",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("with addons when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
			      "parameters": {
			        "branch": "main",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "silent": true,
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/rulesets",
			      "parameters": {
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
			        "owner": "test-owner",
			        "repo": "test-repository",
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
			                  "context": "build",
			                },
			                {
			                  "context": "test",
			                },
			              ],
			              "strict_required_status_checks_policy": false,
			            },
			            "type": "required_status_checks",
			          },
			        ],
			        "ruleset_id": undefined,
			        "target": "branch",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("with addons and no rulesetId option when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
			      "parameters": {
			        "branch": "main",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "silent": true,
			      "type": "octokit",
			    },
			    {
			      "endpoint": "POST /repos/{owner}/{repo}/rulesets",
			      "parameters": {
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
			        "owner": "test-owner",
			        "repo": "test-repository",
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
			                  "context": "build",
			                },
			                {
			                  "context": "test",
			                },
			              ],
			              "strict_required_status_checks_policy": false,
			            },
			            "type": "required_status_checks",
			          },
			        ],
			        "ruleset_id": undefined,
			        "target": "branch",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});

	test("with addons and a rulesetId option when mode is transition", () => {
		const creation = testBlock(blockRepositoryBranchRuleset, {
			addons: {
				requiredStatusChecks: ["build", "test"],
			},
			mode: "transition",
			options: {
				...optionsBase,
				rulesetId: "1234",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "DELETE /repos/{owner}/{repo}/branches/{branch}/protection",
			      "parameters": {
			        "branch": "main",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "silent": true,
			      "type": "octokit",
			    },
			    {
			      "endpoint": "PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}",
			      "parameters": {
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
			        "owner": "test-owner",
			        "repo": "test-repository",
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
			                  "context": "build",
			                },
			                {
			                  "context": "test",
			                },
			              ],
			              "strict_required_status_checks_policy": false,
			            },
			            "type": "required_status_checks",
			          },
			        ],
			        "ruleset_id": 1234,
			        "target": "branch",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
	});
});
