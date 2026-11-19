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
			"ref-version-mismatch": {
				disable: true,
				...addons.rules?.["ref-version-mismatch"],
			},
			"self-repository": {
				disable: true,
				...addons.rules?.["self-repository"],
			},
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
