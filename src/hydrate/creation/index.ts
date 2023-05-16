import { RepositorySettings } from "../repositorySettings.js";
import { Structure } from "../types.js";
import { createDotGitHub } from "./dotGitHub/index.js";
import { createDotHusky } from "./dotHusky.js";
import { createDotVSCode } from "./dotVSCode.js";
import { createRootFiles } from "./rootFiles.js";

export function createStructure(settings: RepositorySettings): Structure {
	return {
		".github": createDotGitHub(settings),
		".husky": createDotHusky(),
		".vscode": createDotVSCode(),
		...createRootFiles(settings),
	};
}
