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
	produce({ options, props }) {
		const rules: Record<string, Rule> = {
			...props.rules,
			"ref-version-mismatch": {
				disable: true,
				...props.rules?.["ref-version-mismatch"],
			},
			"self-repository": {
				disable: true,
				...props.rules?.["self-repository"],
			},
			"unpinned-uses": {
				config: {
					policies: {
						"*": "ref-pin",
					},
				},
				...props.rules?.["unpinned-uses"],
			},
		};

		return {
			extensions: [
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
	props: {
		rules: z.record(z.string(), zRule).optional(),
	},
	transition() {
		return {
			extensions: [
				blockRemoveFiles({
					files: ["zizmor.{yaml,yml}"],
				}),
			],
		};
	},
});
