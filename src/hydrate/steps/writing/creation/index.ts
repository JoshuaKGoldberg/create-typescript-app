import { HydrationInputValues } from "../../../values/types.js";
import { Structure } from "../types.js";
import { createDotGitHub } from "./dotGitHub/index.js";
import { createDotHusky } from "./dotHusky.js";
import { createDotVSCode } from "./dotVSCode.js";
import { createRootFiles } from "./rootFiles.js";

export async function createStructure(
	values: HydrationInputValues
): Promise<Structure> {
	return {
		".github": createDotGitHub(values),
		".husky": createDotHusky(),
		".vscode": createDotVSCode(),
		...(await createRootFiles(values)),
	};
}
