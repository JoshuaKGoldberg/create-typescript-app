import { InputValues } from "../../../shared/inputs.js";
import { Structure } from "../types.js";
import { createDotGitHub } from "./dotGitHub/index.js";
import { createDotHusky } from "./dotHusky.js";
import { createDotVSCode } from "./dotVSCode.js";
import { createRootFiles } from "./rootFiles.js";
import { createSrc } from "./src.js";

export async function createStructure(values: InputValues): Promise<Structure> {
	return {
		".github": createDotGitHub(values),
		".husky": createDotHusky(),
		".vscode": await createDotVSCode(),
		src: await createSrc(values.unitTests),
		...(await createRootFiles(values)),
	};
}
