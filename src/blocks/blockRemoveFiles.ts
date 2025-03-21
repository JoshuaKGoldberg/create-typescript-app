import { z } from "zod";

import { base } from "../base.js";
import { resolveBin } from "../utils/resolveBin.js";
import { CommandPhase } from "./phases.js";

export const blockRemoveFiles = base.createBlock({
	about: {
		name: "Remove Files",
	},
	addons: {
		files: z.array(z.string()).optional(),
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
	transition({ addons }) {
		return {
			scripts: addons.files
				? [
						{
							commands: [
								`node ${resolveBin("trash-cli/cli.js")} ${addons.files.join(" ")}`,
							],
							phase: CommandPhase.Migrations,
							silent: true,
						},
					]
				: undefined,
		};
	},
});
