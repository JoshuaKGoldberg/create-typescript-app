import { z } from "zod";

import { base } from "../base.ts";
import { resolveUses } from "./actions/resolveUses.ts";
import { intakeFileYamlSteps } from "./actions/steps.ts";
import { blockGitHubApps } from "./blockGitHubApps.ts";
import { blockREADME } from "./blockREADME.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";
import { blockRepositorySecrets } from "./blockRepositorySecrets.ts";
import { blockVitest } from "./blockVitest.ts";
import {
	codecovTokenSecret,
	findCodecovStep,
} from "./codecov/findCodecovStep.ts";

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

		const step = findCodecovStep(steps);
		if (!step) {
			return undefined;
		}

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
				...(options.codecovToken && !options.codecovSecret
					? [
							blockRepositorySecrets({
								secrets: [
									{
										description:
											"upload token from the repository's Codecov settings",
										name: "CODECOV_TOKEN",
									},
								],
							}),
						]
					: []),
			],
			...(options.codecovSecret && {
				requests: [
					{
						endpoint: "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
						parameters: {
							encrypted_value: options.codecovSecret.encryptedValue,
							key_id: options.codecovSecret.keyId,
							owner: options.owner,
							repo: options.repository,
							secret_name: "CODECOV_TOKEN",
						},
						type: "octokit",
					},
				],
			}),
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
