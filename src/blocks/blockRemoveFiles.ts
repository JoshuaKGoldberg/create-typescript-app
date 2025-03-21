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
	produce({ addons }) {
		return {
			scripts: addons.files
				? [
						{
							commands: [
								`node ${resolveBin("trash-cli/cli.js")} ${addons.files.join(" ")}`,
							],
							phase: CommandPhase.Migrations,
							// silent: true,
						},
					]
				: undefined,
		};
	},
});
