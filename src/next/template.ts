import { createTemplate } from "create";

import { presetCommon } from "./presets/presetCommon.js";
import { presetEverything } from "./presets/presetEverything.js";
import { presetMinimal } from "./presets/presetMinimal.js";

export const template = createTemplate({
	about: {
		name: "TypeScript App",
	},
	presets: [presetMinimal, presetCommon, presetEverything],
	suggested: presetCommon,
});

export default template;
