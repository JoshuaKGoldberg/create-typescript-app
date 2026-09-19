import { defaults } from "../constants.js";
import { PartialPackageData } from "../types.js";
import { swallowError } from "../utils/swallowError.js";

export async function readNode(
	getNvmrc: () => Promise<Error | string>,
	getPackageDataFull: () => Promise<PartialPackageData>,
) {
	const { engines } = await getPackageDataFull();

	return {
		minimum:
			(engines?.node && /\d/u.test(engines.node) && engines.node) ||
			defaults.node.minimum,
		pinned: swallowError(await getNvmrc())?.trim() || defaults.node.pinned,
	};
}
