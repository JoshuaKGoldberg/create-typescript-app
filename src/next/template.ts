import { createTemplate } from "create";

import { presetCommon } from "./presetCommon.js";
import { presetEverything } from "./presetEverything.js";
import { presetMinimal } from "./presetMinimal.js";

export const template = createTemplate({
	about: {
		name: "TypeScript App",
	},
	presets: [presetMinimal, presetCommon, presetEverything],
	suggested: presetCommon,
});

export default template;
