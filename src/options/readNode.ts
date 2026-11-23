import semver from "semver";

import { defaults, nodeTypeStripping } from "../constants.ts";
import { PartialPackageData } from "../types.ts";
import { swallowError } from "../utils/swallowError.ts";

export async function readNode(
	getNvmrc: () => Promise<Error | string>,
	getPackageDataFull: () => Promise<PartialPackageData>,
) {
	const { engines } = await getPackageDataFull();
	const nvmrc = swallowError(await getNvmrc())?.trim();

	return {
		minimum:
			(engines?.node && /\d/u.test(engines.node) && engines.node) ||
			defaults.node.minimum,
		pinned:
			nvmrc && supportsTypeStripping(nvmrc) ? nvmrc : defaults.node.pinned,
	};
}

function supportsTypeStripping(version: string) {
	return (
		!semver.validRange(version) || semver.intersects(version, nodeTypeStripping)
	);
}
