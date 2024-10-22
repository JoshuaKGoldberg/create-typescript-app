import { createTemplate } from "create";

import { presetCommon } from "./presetCommon.js";
import { presetEverything } from "./presetEverything.js";
import { presetMinimal } from "./presetMinimal.js";

export const template = createTemplate({
	about: {
		name: "TypeScript App",
	},
	presets: {
		common: presetCommon,
		everything: presetEverything,
		minimal: presetMinimal,
	},
});

export default template;
