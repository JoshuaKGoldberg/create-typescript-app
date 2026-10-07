import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { formatYaml } from "./files/formatYaml.ts";
import { withPreviously } from "./files/withPreviously.ts";
import { intakeFileAsYaml } from "./intake/intakeFileAsYaml.ts";

const zRule = z.object({
	config: z.record(z.string(), z.unknown()).optional(),
	disable: z.boolean().optional(),
	ignore: z.array(z.string()).optional(),
	remap: z.record(z.string(), z.unknown()).optional(),
});

type Rule = z.infer<typeof zRule>;

export const blockZizmor = base.createBlock({
	about: {
		name: "zizmor",
	},
	addons: {
		rules: z.record(z.string(), zRule).optional(),
	},
	intake({ files }) {
		const zizmorYaml =
			intakeFileAsYaml(files, [".github", "zizmor.yaml"]) ??
			intakeFileAsYaml(files, ["zizmor.yaml"]);
		const rawRules = z
			.object({ rules: z.record(z.string(), z.unknown()) })
			.safeParse(zizmorYaml).data?.rules;
		if (!rawRules) {
			return undefined;
		}

		const rules = Object.fromEntries(
			Object.entries(rawRules).flatMap(([audit, rawRule]) => {
				const { data } = zRule.safeParse(rawRule);
				return data ? [[audit, data]] : [];
			}),
		);

		return Object.keys(rules).length ? { rules } : undefined;
	},
	produce({ addons, options }) {
		const rules: Record<string, Rule> = {
			...addons.rules,
			// blockGitHubActionsCI's pr-review-labels.yaml needs pull_request_target
			// and workflow_run to label PRs from forks, and doesn't run any PR code.
			// It's listed here to avoid a circular import with blockGitHubActionsCI.
			"dangerous-triggers": {
				...addons.rules?.["dangerous-triggers"],
				ignore: [
					"pr-review-labels.yaml",
					...(addons.rules?.["dangerous-triggers"]?.ignore ?? []),
				],
			},
			// Renovate's hash pins have floating version comments, such as "# v4".
			// Those are flagged online whenever their upstream tags move, until
			// Renovate's digest updates land (which minimumReleaseAge can delay).
			"ref-version-mismatch": {
				disable: true,
				...addons.rules?.["ref-version-mismatch"],
			},
			// Generated workflows and composite actions still reference local actions
			// with ./ rather than GitHub's newer $/ self-repository syntax.
			"self-repository": {
				disable: true,
				...addons.rules?.["self-repository"],
			},
			// Generated workflows reference actions by tag rather than commit hash.
			// Hash pins, such as from Renovate's config:best-practices, still pass.
			"unpinned-uses": {
				config: {
					policies: {
						"*": "ref-pin",
					},
				},
				...addons.rules?.["unpinned-uses"],
			},
		};

		return {
			addons: [
				blockCSpell({
					words: ["zizmor", "zizmorcore"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Lint GitHub Actions",
							steps: [
								{
									uses: resolveUses(
										"zizmorcore/zizmor-action",
										"v0.6.4",
										options.workflowsVersions,
									),
									with: {
										"advanced-security": "false",
										annotations: "true",
									},
								},
							],
						},
					],
				}),
			],
			files: {
				".github": {
					"zizmor.yaml": withPreviously(
						formatYaml({
							rules: Object.fromEntries(
								Object.entries(rules).map(([audit, rule]) => [
									audit,
									{
										...rule,
										ignore:
											rule.ignore && Array.from(new Set(rule.ignore)).sort(),
									},
								]),
							),
						}),
						["zizmor.yml"],
					),
				},
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: ["zizmor.{yaml,yml}"],
				}),
			],
		};
	},
});
