import { base } from "../base.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockPrettier } from "./blockPrettier.ts";

export const blockAreTheTypesWrong = base.createBlock({
	about: {
		name: "Are The Types Wrong",
	},
	produce() {
		return {
			extensions: [
				blockCSpell({
					ignorePaths: ["/*.tgz"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Are The Types Wrong?",
							steps: [
								{ run: "pnpm build" },
								{
									run: "npx --yes @arethetypeswrong/cli --pack . --ignore-rules cjs-resolves-to-esm --profile esm-only",
								},
							],
						},
					],
				}),
				blockPrettier({
					ignores: ["/*.tgz"],
				}),
			],
		};
	},
});
