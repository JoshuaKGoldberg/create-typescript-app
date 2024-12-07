import { createTemplate } from "create";

import { presetCommon } from "./presetCommon.js";
import { presetEverything } from "./presetEverything.js";
import { presetMinimal } from "./presetMinimal.js";

export const template = createTemplate({
	about: {
		name: "TypeScript App",
	},
	default: "common",
	presets: [
		{ label: "common", preset: presetCommon },
		{ label: "everything", preset: presetEverything },
		{ label: "minimal", preset: presetMinimal },
	],
});

export default template;
