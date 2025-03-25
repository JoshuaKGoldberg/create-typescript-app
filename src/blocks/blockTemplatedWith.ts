import { base } from "../base.js";
import { blockCSpell } from "./blockCSpell.js";
import { blockREADME } from "./blockREADME.js";

export const blockTemplatedWith = base.createBlock({
	about: {
		name: "Templated With",
	},
	produce({ options }) {
		return {
			addons: [
				blockCSpell({
					words: ["joshuakgoldberg"],
				}),
				blockREADME({
					notices: [
						options.owner !== "JoshuaKGoldberg" &&
							`
<!-- You can remove this notice if you don't want it 🙂 no worries! -->`,
						`> 💝 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo engine](https://create.bingo).
`,
					].filter((notice) => typeof notice === "string"),
				}),
			],
		};
	},
});
