import { z } from "zod";

import { base } from "../base.ts";
import { codecovTokenSecret } from "../options/readCodecovToken.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { intakeFileYamlSteps } from "./actions/steps.ts";
import { blockGitHubApps } from "./blockGitHubApps.ts";
import { blockREADME } from "./blockREADME.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockVitest } from "./blockVitest.ts";

export const blockCodecov = base.createBlock({
	about: {
		name: "Codecov",
	},
	addons: {
		env: z.record(z.string(), z.string()).optional(),
	},
	intake({ files }) {
		const steps = intakeFileYamlSteps(
			files,
			[".github", "workflows", "ci.yaml"],
			["jobs", "test", "steps"],
		);
		if (!steps) {
			return undefined;
		}

		const step = steps.find(
			(step) =>
				typeof step.uses === "string" &&
				step.uses.startsWith("codecov/codecov-action"),
		);
		if (!step) {
			return undefined;
		}

		// The standard token is owned by the base codecovToken option, which is read from this file
		const { CODECOV_TOKEN, ...env } = step.env ?? {};
		if (CODECOV_TOKEN && CODECOV_TOKEN !== codecovTokenSecret) {
			env.CODECOV_TOKEN = CODECOV_TOKEN;
		}

		return {
			env: Object.keys(env).length ? env : undefined,
		};
	},
	produce({ addons, options }) {
		const env = options.codecovToken
			? { CODECOV_TOKEN: codecovTokenSecret, ...addons.env }
			: addons.env;

		return {
			addons: [
				blockGitHubApps({
					apps: [
						{
							name: "Codecov",
							url: "https://github.com/apps/codecov",
						},
					],
				}),
				blockREADME({
					badges: [
						{
							alt: "🧪 Coverage",
							href: `https://codecov.io/gh/${options.owner}/${options.repository}`,
							src: `https://img.shields.io/codecov/c/github/${options.owner}/${options.repository}?label=%F0%9F%A7%AA%20coverage`,
						},
					],
				}),
				blockVitest({
					actionSteps: [
						{
							...(env && { env }),
							if: "always()",
							uses: resolveUses(
								"codecov/codecov-action",
								"v3",
								options.workflowsVersions,
							),
						},
					],
				}),
			],
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveFiles({
					files: [".github/codecov.{yaml,yml}", "codecov.{yaml,yml}"],
				}),
			],
		};
	},
});
