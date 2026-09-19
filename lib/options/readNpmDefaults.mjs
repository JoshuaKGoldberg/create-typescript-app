import { swallowErrorAsync } from "../utils/swallowErrorAsync.mjs";
import npmUser from "npm-user";
//#region src/options/readNpmDefaults.ts
async function readNpmDefaults(getNpmWhoami) {
	const whoami = await getNpmWhoami();
	return typeof whoami?.stdout === "string" ? await swallowErrorAsync(npmUser(whoami.stdout)) : void 0;
}
//#endregion
export { readNpmDefaults };
