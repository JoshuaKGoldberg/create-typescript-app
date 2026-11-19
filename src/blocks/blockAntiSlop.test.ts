import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockAntiSlop } from "./blockAntiSlop.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockAntiSlop", () => {
	test("without options.workflowsVersions", () => {
		const creation = testBlock(blockAntiSlop, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "peakoss",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "anti-slop.yaml": "jobs:
			  anti-slop:
			    permissions:
			      contents: read
			      issues: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: peakoss/anti-slop@v0.3.0
			        with:
			          exempt-draft-prs: true
			          failure-add-pr-labels: suspected ai slop
			          failure-pr-message: Thanks for the PR! This repository's automated PR quality checks flagged it as likely low-quality or AI-generated, so it's been closed. If you believe that's a mistake, please comment with more context and a maintainer will take a look.
			          require-pr-template: true

			name: Anti-Slop

			on:
			  pull_request_target:
			    types:
			      - opened
			      - ready_for_review
			      - reopened
			",
			      },
			    },
			  },
			}
		`);
	});

	test("with options.workflowsVersions", () => {
		const creation = testBlock(blockAntiSlop, {
			options: {
				...optionsBase,
				workflowsVersions: {
					"peakoss/anti-slop": {
						"v9.9.9": {
							hash: "abc123",
						},
					},
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "words": [
			          "peakoss",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			  ],
			  "files": {
			    ".github": {
			      "workflows": {
			        "anti-slop.yaml": "jobs:
			  anti-slop:
			    permissions:
			      contents: read
			      issues: read
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - uses: peakoss/anti-slop@abc123 # v9.9.9
			        with:
			          exempt-draft-prs: true
			          failure-add-pr-labels: suspected ai slop
			          failure-pr-message: Thanks for the PR! This repository's automated PR quality checks flagged it as likely low-quality or AI-generated, so it's been closed. If you believe that's a mistake, please comment with more context and a maintainer will take a look.
			          require-pr-template: true

			name: Anti-Slop

			on:
			  pull_request_target:
			    types:
			      - opened
			      - ready_for_review
			      - reopened
			",
			      },
			    },
			  },
			}
		`);
	});
});
