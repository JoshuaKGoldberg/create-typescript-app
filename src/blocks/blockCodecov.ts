import { z } from "zod";

import { base } from "../base.js";
import { blockGitHubApps } from "./blockGitHubApps.js";
import { blockVitest } from "./blockVitest.js";
import { CommandPhase } from "./phases.js";

export const blockCodecov = base.createBlock({
	about: {
		name: "Codecov",
	},
	addons: { env: z.record(z.string(), z.string()).optional() },
	produce({ addons }) {
		const { env } = addons;
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
				blockVitest({
					actionSteps: [
						{
							...(env && { env }),
							if: "always()",
							uses: "codecov/codecov-action@v3",
						},
					],
				}),
			],
		};
	},
	transition() {
		return {
			scripts: [
				{
					commands: ["rm .github/codecov.yml codecov.yml"],
					phase: CommandPhase.Migrations,
					silent: true,
				},
			],
		};
	},
});
