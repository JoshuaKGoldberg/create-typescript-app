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
	produce({ addons }) {
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
