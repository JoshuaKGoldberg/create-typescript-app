import { base } from "../base.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.mjs";
//#region src/blocks/blockPnpmDedupe.ts
const blockPnpmDedupe = base.createBlock({
	about: { name: "pnpm Dedupe" },
	produce() {
		return { addons: [blockGitHubActionsCI({ jobs: [{
			name: "Dedupe Check",
			steps: [{ run: "pnpm dedupe --check" }]
		}] }), blockPackageJson({ cleanupCommands: ["pnpm dedupe"] })] };
	},
	transition() {
		return { addons: [blockRemoveWorkflows({ workflows: ["lint-packages"] })] };
	}
});
//#endregion
export { blockPnpmDedupe };
