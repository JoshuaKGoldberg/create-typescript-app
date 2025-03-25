import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { packageData } from "../data/packageData.js";
import { blockCTATransitions } from "./blockCTATransitions.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockRepositoryBranchRuleset } from "./blockRepositoryBranchRuleset.js";
import { optionsBase } from "./options.fakes.js";

describe("blockCTATransitions", () => {
	test("production", () => {
		const creation = testBlock(blockCTATransitions, {
			options: optionsBase,
		});

		expect(creation.addons).toEqual([
			blockPackageJson({
				properties: {
					devDependencies: {
						"create-typescript-app": packageData.version,
					},
				},
			}),
			blockRepositoryBranchRuleset({
				requiredStatusChecks: ["CTA Transitions"],
			}),
		]);
		expect(creation.files).toMatchInlineSnapshot(`
			{
			  ".github": {
			    "workflows": {
			      "cta-transitions.yml": "jobs:
			  cta_transitions:
			    if: (github.actor == 'test-owner' || github.actor == 'renovate[bot]') && startsWith(github.head_ref, 'renovate/') && contains(github.event.pull_request.title, 'create-typescript-app')
			    runs-on: ubuntu-latest
			    steps:
			      - uses: actions/checkout@v4
			        with:
			          fetch-depth: 0
			          ref: \${{github.event.pull_request.head.ref}}
			          repository: \${{github.event.pull_request.head.repo.full_name}}
			          token: \${{ secrets.ACCESS_TOKEN }}
			      - uses: ./.github/actions/prepare
			      - run: pnpx create-typescript-app
			      - uses: stefanzweifel/git-auto-commit-action@v5
			        with:
			          commit_author: The Friendly Bingo Bot <bot@create.bingo>
			          commit_message: Check in changes from re-running npx create-typescript-app
			          commit_user_email: bot@create.bingo
			          commit_user_name: The Friendly Bingo Bot
			      - uses: mshick/add-pr-comment@v2
			        with:
			          issue: \${{ github.event.pull_request.number }}
			          message: |-
			            🤖 Beep boop! I ran \`pnpx create-typescript-app\` and it updated some files.

			            I went ahead and checked those changes into this PR for you. Please review the latest commit to see if you want to merge it.

			            Cheers!
			             — _The Friendly Bingo Bot_ 💝

			            > ℹ️ These automatic commits keep your repository up-to-date with new versions of [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app). If you want to opt out, delete your \`.github/workflows/cta-transitions.yml\` file.

			name: CTA Transitions

			on:
			  pull_request:
			    branches:
			      - main

			permissions:
			  pull-requests: write
			",
			    },
			  },
			}
		`);
	});
});
