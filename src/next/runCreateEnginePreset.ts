import { runPreset } from "create";

import { Options } from "../shared/types.js";
import { presetCommon } from "./presetCommon.js";
import { presetEverything } from "./presetEverything.js";
import { presetMinimal } from "./presetMinimal.js";

const presets = {
	common: presetCommon,
	everything: presetEverything,
	minimal: presetMinimal,
};

export async function runCreateEnginePreset(options: Options) {
	const preset =
		options.base && options.base !== "prompt" && presets[options.base];

	if (!preset) {
		throw new Error(`Cannot yet use create engine with base ${options.base}.`);
	}

	await runPreset(preset, { mode: "initialize", options });
}
