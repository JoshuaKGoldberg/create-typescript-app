import { swallowError } from "../utils/swallowError.mjs";
import { defaults } from "../constants.mjs";
//#region src/options/readNode.ts
async function readNode(getNvmrc, getPackageDataFull) {
	const { engines } = await getPackageDataFull();
	return {
		minimum: engines?.node && /\d/u.test(engines.node) && engines.node || defaults.node.minimum,
		pinned: swallowError(await getNvmrc())?.trim() || defaults.node.pinned
	};
}
//#endregion
export { readNode };
