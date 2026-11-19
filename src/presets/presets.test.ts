import { CreatedOctokitRequest } from "bingo-requests";
import { producePreset } from "bingo-stratum";
import { load } from "js-yaml";
import { describe, expect, test } from "vitest";

import { optionsBase } from "../blocks/options.fakes.ts";
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
});
