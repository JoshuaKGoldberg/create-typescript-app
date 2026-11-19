import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockSlopUnlinkIssues } from "./blockSlopUnlinkIssues.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockSlopUnlinkIssues, () => {
	test("without addons", () => {
		const creation = testBlock(blockSlopUnlinkIssues, {
			options: optionsBase,
		});

		expect(creation).toEqual({});
	});

	test("with labels", () => {
		const creation = testBlock(blockSlopUnlinkIssues, {
			addons: {
				labels: ["spam: b", "spam: a"],
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "workflows": {
			        "slop-unlink-issues.yaml": "concurrency:
			  cancel-in-progress: true
			  group: \${{ github.workflow }}-\${{ github.event.number }}

			jobs:
			  slop_unlink_issues:
			    if: 'github.event.pull_request.merged == false && (contains(github.event.pull_request.labels.*.name, ''spam: a'') || contains(github.event.pull_request.labels.*.name, ''spam: b''))'
			    permissions:
			      pull-requests: write
			    runs-on: ubuntu-latest
			    steps:
			      - env:
			          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
			          PR: \${{ github.event.pull_request.number }}
			          REPO: \${{ github.repository }}
			        name: Unlink issues from slop PRs
			        run: |
			          issues=$(gh pr view "$PR" --repo "$REPO" --json closingIssuesReferences --jq '.closingIssuesReferences[].number')

			          if [ -z "$issues" ]; then
			            echo 'No linked issues.'
			            exit 0
			          fi

			          echo "Unlinking: $issues"

			          body=$(gh pr view "$PR" --repo "$REPO" --json body --jq .body)

			          for issue in $issues; do
			            body=$(printf '%s' "$body" | perl -pe "s/#$issue\\b/#~$issue~/g")
			          done

			          gh pr edit "$PR" --repo "$REPO" --body "$body"

			name: Slop Unlink Issues

			on:
			  pull_request_target:
			    types:
			      - closed
			",
			      },
			    },
			  },
			}
		`);
	});
});
