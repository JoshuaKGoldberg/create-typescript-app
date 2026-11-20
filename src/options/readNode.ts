import { defaults } from "../constants.ts";
import { PartialPackageData } from "../types.ts";
import { swallowError } from "../utils/swallowError.ts";

export async function readNode(
	getNvmrc: () => Promise<Error | string>,
	getPackageDataFull: () => Promise<PartialPackageData>,
) {
	const { devEngines, engines } = await getPackageDataFull();

	return {
		minimum:
			(engines?.node && /\d/u.test(engines.node) && engines.node) ||
			defaults.node.minimum,
		pinned:
			(devEngines?.runtime?.name === "node" && devEngines.runtime.version) ||
			swallowError(await getNvmrc())?.trim() ||
			defaults.node.pinned,
	};
}
