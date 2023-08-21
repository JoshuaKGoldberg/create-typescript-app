import { HydrationInputValues } from "../../../../values/types.js";
import { formatYaml } from "../formatters/formatYaml.js";

export function createDotGitHubIssueTemplate({
	owner,
	repository,
}: Pick<HydrationInputValues, "owner" | "repository">) {
	return {
		"01-bug.yml": formatYaml({
			body: [
				{
					attributes: {
						description:
							"If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
						label: "Bug Report Checklist",
						options: [
							{
								label: "I have tried restarting my IDE and the issue persists.",
								required: true,
							},
							{
								label:
									"I have pulled the latest `main` branch of the repository.",
								required: true,
							},
							{
								label: `I have [searched for related issues](https://github.com/${owner}/${repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
								required: true,
							},
						],
					},
					type: "checkboxes",
				},
				{
					attributes: {
						description: "What did you expect to happen?",
						label: "Expected",
					},
					type: "textarea",
					validations: {
						required: true,
					},
				},
				{
					attributes: {
						description: "What happened instead?",
						label: "Actual",
					},
					type: "textarea",
					validations: {
						required: true,
					},
				},
				{
					attributes: {
						description: "Any additional info you'd like to provide.",
						label: "Additional Info",
					},
					type: "textarea",
				},
			],
			description: "Report a bug trying to run the code",
			labels: ["type: bug"],
			name: "🐛 Report a Bug",
			title: "🐛 Bug: <short description of the bug>",
		}),
		"02-documentation.yml": formatYaml({
			body: [
				{
					attributes: {
						description:
							"If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
						label: "Bug Report Checklist",
						options: [
							{
								label:
									"I have pulled the latest `main` branch of the repository.",
								required: true,
							},
							{
								label: `I have [searched for related issues](https://github.com/${owner}/${repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
								required: true,
							},
						],
					},
					type: "checkboxes",
				},
				{
					attributes: {
						description: "What would you like to report?",
						label: "Overview",
					},
					type: "textarea",
					validations: {
						required: true,
					},
				},
				{
					attributes: {
						description: "Any additional info you'd like to provide.",
						label: "Additional Info",
					},
					type: "textarea",
				},
			],
			description: "Report a typo or missing area of documentation",
			labels: ["area: documentation"],
			name: "📝 Documentation",
			title: "📝 Documentation: <short description of the request>",
		}),
		"03-feature.yml": formatYaml({
			body: [
				{
					attributes: {
						description:
							"If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
						label: "Bug Report Checklist",
						options: [
							{
								label: "I have tried restarting my IDE and the issue persists.",
								required: true,
							},
							{
								label:
									"I have pulled the latest `main` branch of the repository.",
								required: true,
							},
							{
								label: `I have [searched for related issues](https://github.com/${owner}/${repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
								required: true,
							},
						],
					},
					type: "checkboxes",
				},
				{
					attributes: {
						description: "What did you expect to be able to do?",
						label: "Overview",
					},
					type: "textarea",
					validations: {
						required: true,
					},
				},
				{
					attributes: {
						description: "Any additional info you'd like to provide.",
						label: "Additional Info",
					},
					type: "textarea",
				},
			],
			description:
				"Request that a new feature be added or an existing feature improved",
			labels: ["type: feature"],
			name: "🚀 Request a Feature",
			title: "🚀 Feature: <short description of the feature>",
		}),
		"04-tooling.yml": formatYaml({
			body: [
				{
					attributes: {
						description:
							"If any of these required steps are not taken, we may not be able to review your issue. Help us to help you!",
						label: "Bug Report Checklist",
						options: [
							{
								label: "I have tried restarting my IDE and the issue persists.",
								required: true,
							},
							{
								label:
									"I have pulled the latest `main` branch of the repository.",
								required: true,
							},
							{
								label: `I have [searched for related issues](https://github.com/${owner}/${repository}/issues?q=is%3Aissue) and found none that matched my issue.`,
								required: true,
							},
						],
					},
					type: "checkboxes",
				},
				{
					attributes: {
						description: "What did you expect to be able to do?",
						label: "Overview",
					},
					type: "textarea",
					validations: {
						required: true,
					},
				},
				{
					attributes: {
						description: "Any additional info you'd like to provide.",
						label: "Additional Info",
					},
					type: "textarea",
				},
			],
			description:
				"Report a bug or request an enhancement in repository tooling",
			labels: ["area: tooling"],
			name: "🛠 Tooling",
			title: "🛠 Tooling: <short description of the change>",
		}),
	};
}
