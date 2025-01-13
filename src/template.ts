import { base } from "./base.js";
import { presetCommon } from "./presets/common.js";
import { presetEverything } from "./presets/everything.js";
import { presetMinimal } from "./presets/minimal.js";

export const template = base.createTemplate({
	about: {
		name: "TypeScript App",
	},
	presets: [presetMinimal, presetCommon, presetEverything],
	suggested: presetCommon,
});

export default template;
