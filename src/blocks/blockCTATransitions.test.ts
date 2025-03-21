import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { packageData } from "../data/packageData.js";
import { blockCTATransitions } from "./blockCTATransitions.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { optionsBase } from "./options.fakes.js";

describe("blockCTATransitions", () => {
	test("production", () => {
		const creation = testBlock(blockCTATransitions, {
			options: optionsBase,
		});

		expect(creation).toEqual({
			addons: [
				{
					addons: {
						jobs: [
							{
								checkoutWith: {
									"fetch-depth": "0",
									ref: "${{github.event.pull_request.head.ref}}",
									repository:
										"${{github.event.pull_request.head.repo.full_name}}",
									token: '"${{ secrets.ACCESS_TOKEN }}"',
								},
								if: "${{ startsWith(github.head_ref, 'renovate/') && contains(github.event.pull_request.title, 'create-typescript-app') }}",
								name: "CTA Transitions",
								steps: [
									{
										run: "pnpx create-typescript-app",
									},
									{
										uses: "stefanzweifel/git-auto-commit-action@v5",
										with: {
											commit_author:
												"The Friendly Bingo Bot <bot@create.bingo>",
											commit_message:
												"Check in changes from re-running npx create-typescript-app",
											commit_user_email: "bot@create.bingo",
											commit_user_name: "The Friendly Bingo Bot",
										},
									},
									{
										uses: "mshick/add-pr-comment@v2",
										with: {
											issue: "${{ github.event.pull_request.number }}",
											message: `|
🤖 Beep boop! I ran \`npx create-typescript-app\` and found same changes.
Please review the latest commit to see if you want to merge it.
Cheers! 💝

> This change was automatically made in CI to keep your repository up-to-date with the templating in [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).
> If you want to opt out of these automatic updates, delete the \`.github/workflows/cta-transitions.yml\` file on your \`main\` branch.`,
											"repo-token": "${{ secrets.ACCESS_TOKEN }}",
										},
									},
								],
							},
						],
					},
					block: blockGitHubActionsCI,
				},
				{
					addons: {
						properties: {
							devDependencies: {
								"create-typescript-app": packageData.version,
							},
						},
					},
					block: blockPackageJson,
				},
			],
		});
	});
});
