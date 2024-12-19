import { createTemplate } from "create";

import { presetCommon } from "./presetCommon.js";
import { presetEverything } from "./presetEverything.js";
import { presetMinimal } from "./presetMinimal.js";

export const template = createTemplate({
	about: {
		name: "TypeScript App",
	},
	default: "common",
	presets: {
		common: { label: "Common", preset: presetCommon },
		everything: { label: "Everything", preset: presetEverything },
		minimal: { label: "Minimal", preset: presetMinimal },
	},
});

export default template;
