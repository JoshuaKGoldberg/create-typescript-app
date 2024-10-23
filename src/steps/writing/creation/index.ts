import { CreatedFiles, producePreset } from "create";
import prettier from "prettier";

import { presetCommon } from "../../../next/presetCommon.js";
import { presetEverything } from "../../../next/presetEverything.js";
import { presetMinimal } from "../../../next/presetMinimal.js";
import { Options } from "../../../shared/types.js";
import { Structure } from "../types.js";
import { createDotGitHub } from "./dotGitHub/index.js";
import { createDotHusky } from "./dotHusky.js";
import { createDotVSCode } from "./dotVSCode.js";
import { createRootFiles } from "./rootFiles.js";
import { createSrc } from "./src.js";

const presets = {
	common: presetCommon,
	everything: presetEverything,
	minimal: presetMinimal,
};

export async function createStructure(
	options: Options,
	useNext?: boolean,
): Promise<Structure> {
	const preset =
		useNext &&
		options.base &&
		options.base !== "prompt" &&
		presets[options.base];

	if (preset) {
		const creation = await producePreset(preset, { options });
		return await recursivelyFormat(creation.files);
	}

	return {
		".github": await createDotGitHub(options),
		".husky": createDotHusky(),
		".vscode": await createDotVSCode(options),
		...(options.mode !== "migrate" && { src: await createSrc(options) }),
		...(await createRootFiles(options)),
	};
}

async function recursivelyFormat(files: CreatedFiles): Promise<Structure> {
	const result: Structure = {};

	for (const [key, value] of Object.entries(files)) {
		switch (typeof value) {
			case "object":
				result[key] = await recursivelyFormat(value);
				break;
			case "string":
				result[key] = await formatCreatedFile(key, value);
				break;
		}
	}

	return result;
}

const asYaml = new Set([
	".gitignore",
	".markdownlintignore",
	".nvmrc",
	".prettierignore",
	"pre-commit",
]);

async function formatCreatedFile(filepath: string, entry: string) {
	return await prettier.format(
		entry,
		asYaml.has(filepath) ? { parser: "yaml" } : { filepath },
	);
}
