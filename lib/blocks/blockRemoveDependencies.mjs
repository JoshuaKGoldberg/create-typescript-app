import { base } from "../base.mjs";
import { resolveBin } from "../utils/resolveBin.mjs";
import { CommandPhase } from "./phases.mjs";
import { z } from "zod";
//#region src/blocks/blockRemoveDependencies.ts
const blockRemoveDependencies = base.createBlock({
	about: { name: "Remove Dependencies" },
	addons: { dependencies: z.array(z.string()).optional() },
	produce() {
		return {};
	},
	transition({ addons }) {
		return { scripts: addons.dependencies ? [{
			commands: [`node ${resolveBin("remove-dependencies/bin/index.js")} ${addons.dependencies.join(" ")}`],
			phase: CommandPhase.Process
		}] : void 0 };
	}
});
//#endregion
export { blockRemoveDependencies };
