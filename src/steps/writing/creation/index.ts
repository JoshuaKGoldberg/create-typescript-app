import { InputValues } from "../../../shared/types.js";
import { Structure } from "../types.js";
import { createDotGitHub } from "./dotGitHub/index.js";
import { createDotHusky } from "./dotHusky.js";
import { createDotVSCode } from "./dotVSCode.js";
import { createRootFiles } from "./rootFiles.js";
import { createSrc } from "./src.js";

export async function createStructure(values: InputValues): Promise<Structure> {
	return {
		".github": await createDotGitHub(values),
		".husky": createDotHusky(),
		".vscode": await createDotVSCode(values),
		src: await createSrc(values),
		...(await createRootFiles(values)),
	};
}
