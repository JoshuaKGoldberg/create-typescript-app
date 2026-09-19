import { base } from "../base.mjs";
import { blockREADME } from "./blockREADME.mjs";
//#region src/blocks/blockTemplatedWith.ts
const blockTemplatedWith = base.createBlock({
	about: { name: "Templated With" },
	produce({ options }) {
		return { addons: [blockREADME({ notices: [options.owner !== "JoshuaKGoldberg" && `
<!-- You can remove this notice if you don't want it 🙂 no worries! -->`, `> 💝 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo framework](https://create.bingo).
`].filter((notice) => typeof notice === "string") })] };
	}
});
//#endregion
export { blockTemplatedWith };
