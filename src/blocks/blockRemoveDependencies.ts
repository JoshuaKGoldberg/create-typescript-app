import { z } from "zod";

import { base } from "../base.js";
import { resolveBin } from "../utils/resolveBin.js";
import { CommandPhase } from "./phases.js";

export const blockRemoveDependencies = base.createBlock({
	about: {
		name: "Remove Dependencies",
	},
	addons: {
		dependencies: z.array(z.string()).optional(),
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
	transition({ addons }) {
		return {
			scripts: addons.dependencies
				? [
						{
							commands: [
								`node ${resolveBin("remove-dependencies/bin/index.js")} ${addons.dependencies.join(" ")}`,
							],
							phase: CommandPhase.Process,
						},
					]
				: undefined,
		};
	},
});
