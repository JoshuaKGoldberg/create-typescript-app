import { z } from "zod";

import { base } from "../base.ts";
import { resolveBin } from "../utils/resolveBin.ts";
import { CommandPhase } from "./phases.ts";

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
