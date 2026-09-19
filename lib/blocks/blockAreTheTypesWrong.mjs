import { base } from "../base.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
//#region src/blocks/blockAreTheTypesWrong.ts
const blockAreTheTypesWrong = base.createBlock({
	about: { name: "Are The Types Wrong" },
	produce() {
		return { addons: [blockGitHubActionsCI({ jobs: [{
			name: "Are The Types Wrong?",
			steps: [{ run: "pnpm build" }, { run: "npx --yes @arethetypeswrong/cli --pack . --ignore-rules cjs-resolves-to-esm --profile esm-only" }]
		}] })] };
	}
});
//#endregion
export { blockAreTheTypesWrong };
