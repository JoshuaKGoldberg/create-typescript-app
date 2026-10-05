import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockGitHubIssueTemplates, () => {
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

	test("with checklists addons", () => {
		const creation = testBlock(blockGitHubIssueTemplates, {
			addons: {
				checklists: {
					bug: [
						"I have tried the latest release and the issue persists.",
						"I have checked the workflow run logs for errors.",
					],
					documentation: ["I have read the docs website."],
					tooling: ["I have tried restarting my IDE and the issue persists."],
				},
			},
			options: optionsBase,
		});

		expect(creation.files?.[".github"]).toMatchInlineSnapshot(`
			{
			  "ISSUE_TEMPLATE": {
			    "01-bug.yaml": [
			      "body:
			  - attributes:
			      description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
			      label: Bug Report Checklist
			      options:
			        - label: I have checked the workflow run logs for errors.
			          required: true
			        - label: I have tried the latest release and the issue persists.
			          required: true
			        - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
			          required: true
			    type: checkboxes
			  - attributes:
			      description: What did you expect to happen?
			      label: Expected
			    type: textarea
			    validations:
			      required: true
			  - attributes:
			      description: What happened instead?
			      label: Actual
			    type: textarea
			    validations:
			      required: true
			  - attributes:
			      description: Any additional info you'd like to provide.
			      label: Additional Info
			    type: textarea

			description: Report a bug trying to run the code

			labels:
			  - 'type: bug'

			name: 🐛 Bug

			title: '🐛 Bug: <short description of the bug>'
			",
			      {
			        "previously": [
			          "01-bug.yml",
			        ],
			      },
			    ],
			    "02-documentation.yaml": [
			      "body:
			  - attributes:
			      description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
			      label: Documentation Report Checklist
			      options:
			        - label: I have looked at the latest \`main\` branch of the repository.
			          required: true
			        - label: I have read the docs website.
			          required: true
			        - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
			          required: true
			    type: checkboxes
			  - attributes:
			      description: What would you like to report?
			      label: Overview
			    type: textarea
			    validations:
			      required: true
			  - attributes:
			      description: Any additional info you'd like to provide.
			      label: Additional Info
			    type: textarea

			description: Report a typo or missing area of documentation

			labels:
			  - 'area: documentation'

			name: 📝 Documentation

			title: '📝 Documentation: <short description of the request>'
			",
			      {
			        "previously": [
			          "02-documentation.yml",
			        ],
			      },
			    ],
			    "03-feature.yaml": [
			      "body:
			  - attributes:
			      description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
			      label: Feature Request Checklist
			      options:
			        - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
			          required: true
			    type: checkboxes
			  - attributes:
			      description: What did you expect to be able to do?
			      label: Overview
			    type: textarea
			    validations:
			      required: true
			  - attributes:
			      description: Any additional info you'd like to provide.
			      label: Additional Info
			    type: textarea

			description: Request that a new feature be added or an existing feature improved

			labels:
			  - 'type: feature'

			name: 🚀 Feature

			title: '🚀 Feature: <short description of the feature>'
			",
			      {
			        "previously": [
			          "03-feature.yml",
			        ],
			      },
			    ],
			    "04-tooling.yaml": [
			      "body:
			  - attributes:
			      description: If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!
			      label: Tooling Report Checklist
			      options:
			        - label: I have pulled in the newest version of the project.
			          required: true
			        - label: I have tried restarting my IDE and the issue persists.
			          required: true
			        - label: I have [searched for related issues](https://github.com/test-owner/test-repository/issues?q=is%3Aissue) and found none that matched my issue.
			          required: true
			    type: checkboxes
			  - attributes:
			      description: What did you expect to be able to do?
			      label: Overview
			    type: textarea
			    validations:
			      required: true
			  - attributes:
			      description: Any additional info you'd like to provide.
			      label: Additional Info
			    type: textarea

			description: Report a bug or request an enhancement in repository tooling

			labels:
			  - 'area: tooling'

			name: 🛠 Tooling

			title: '🛠 Tooling: <short description of the change>'
			",
			      {
			        "previously": [
			          "04-tooling.yml",
			        ],
			      },
			    ],
			  },
			  "ISSUE_TEMPLATE.md": "<!-- Note: Please must use one of our issue templates to file an issue! 🛑 -->
			<!-- 👉 https://github.com/test-owner/test-repository/issues/new/choose 👈 -->
			<!-- **Issues that should have been filed with a template will be closed without action, and we will ask you to use a template.** -->

			<!-- This blank issue template is only for issues that don't fit any of the templates. -->

			## Overview

			...
			",
			}
		`);
	});
});
