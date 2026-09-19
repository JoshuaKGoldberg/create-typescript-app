import { base } from "../base.mjs";
import { resolveBin } from "../utils/resolveBin.mjs";
import { CommandPhase } from "./phases.mjs";
import { z } from "zod";
//#region src/blocks/blockRemoveFiles.ts
const blockRemoveFiles = base.createBlock({
	about: { name: "Remove Files" },
	addons: { files: z.array(z.string()).optional() },
	produce() {
		return {};
	},
	transition({ addons }) {
		return { scripts: addons.files ? [{
			commands: [`node ${resolveBin("trash-cli/cli.js")} ${addons.files.join(" ")}`],
			phase: CommandPhase.Migrations,
			silent: true
		}] : void 0 };
	}
});
//#endregion
export { blockRemoveFiles };
