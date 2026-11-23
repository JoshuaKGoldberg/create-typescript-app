import { CreatedOctokitRequest } from "bingo-requests";
import { producePreset } from "bingo-stratum";
import { load } from "js-yaml";
import { describe, expect, test } from "vitest";

import { optionsBase } from "../blocks/options.fakes.ts";
import { template } from "../template.ts";
import { presets } from "./index.ts";

interface RulesetParameters {
	rules: {
		parameters?: { required_status_checks?: { context: string }[] };
	}[];
}

interface Workflow {
	jobs: Record<string, { name?: string }>;
}

describe("presets", () => {
	test.each(Object.entries(presets))(
		"%s requires only status checks that its workflows run",
		(_, preset) => {
			const { files, requests } = producePreset(preset, {
				mode: "setup",
				options: optionsBase,
			});

			const ruleset = requests.find(
				(request): request is CreatedOctokitRequest =>
					request.type === "octokit" &&
					request.endpoint === "POST /repos/{owner}/{repo}/rulesets",
			);
			const contexts = (
				ruleset?.parameters as RulesetParameters | undefined
			)?.rules
				.flatMap((rule) => rule.parameters?.required_status_checks ?? [])
				.map((check) => check.context);

			const workflows = Object.values(
				(files[".github"] as { workflows: object }).workflows,
			) as ([string, unknown] | string)[];
			const jobNames = workflows.flatMap((workflow) =>
				Object.values(
					(load(Array.isArray(workflow) ? workflow[0] : workflow) as Workflow)
						.jobs,
				).map((job) => job.name),
			);

			expect(contexts).not.toHaveLength(0);
			expect(jobNames).toEqual(expect.arrayContaining(contexts ?? []));
		},
	);

	test.each([
		["minimal", { "add-vitest": true }, true, false],
		[
			"minimal",
			{ "add-console-fail-test": true, "add-vitest": true },
			true,
			true,
		],
		["common", {}, true, true],
		["common", { "exclude-console-fail-test": true }, true, false],
		["everything", {}, true, true],
		["everything", { "exclude-vitest": true }, false, false],
	] as const)(
		"%s with %j generates Vitest and Console Fail Test as selected",
		(preset, flags, hasVitest, hasConsoleFailTest) => {
			const { files } = producePreset(presets[preset], {
				mode: "setup",
				options: { ...optionsBase, ...flags },
				template,
			});
			const packageJson = JSON.parse(files["package.json"] as string) as {
				devDependencies: Record<string, string>;
			};
			const vitestConfig = files["vitest.config.ts"];
			const development = (files[".github"] as Record<string, string>)[
				"DEVELOPMENT.md"
			];

			expect("vitest" in packageJson.devDependencies).toBe(hasVitest);
			expect(typeof vitestConfig === "string").toBe(hasVitest);
			expect("console-fail-test" in packageJson.devDependencies).toBe(
				hasConsoleFailTest,
			);
			expect(
				typeof vitestConfig === "string" &&
					vitestConfig.includes('"console-fail-test/setup"'),
			).toBe(hasConsoleFailTest);
			expect(development.includes("console-fail-test")).toBe(
				hasConsoleFailTest,
			);
		},
	);
});
