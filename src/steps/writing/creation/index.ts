import { Options } from "../../../shared/types.js";
import { Structure } from "../types.js";
import { createDotGitHub } from "./dotGitHub/index.js";
import { createDotHusky } from "./dotHusky.js";
import { createDotVSCode } from "./dotVSCode.js";
import { createRootFiles } from "./rootFiles.js";
import { createSrc } from "./src.js";

export async function createStructure(options: Options): Promise<Structure> {
	return {
		".github": await createDotGitHub(options),
		".husky": createDotHusky(),
		".vscode": await createDotVSCode(options),
		...(options.mode !== "migrate" && { src: await createSrc(options) }),
		...(await createRootFiles(options)),
	};
}
