import { presetMinimal } from "./minimal.mjs";
import { presetCommon } from "./common.mjs";
import { presetEverything } from "./everything.mjs";
//#region src/presets/index.ts
const presets = {
	common: presetCommon,
	everything: presetEverything,
	minimal: presetMinimal
};
//#endregion
export { presetCommon, presetEverything, presetMinimal, presets };
