import { CachedFactory } from "cached-factory";
import semver from "semver";

import { WorkflowsVersions } from "../../schemas.js";

const coerced = new CachedFactory((version: string) => {
	if (!semver.valid(version)) {
		return "0.0.0";
	}

	return semver.coerce(version)?.raw ?? version;
});

export function printUses(
	action: string,
	version: string,
	workflowsVersions?: WorkflowsVersions,
) {
	if (!workflowsVersions || !(action in workflowsVersions)) {
		return `${action}@${version}`;
	}
	const workflowVersions = workflowsVersions[action];

	const biggestVersion = Object.keys(workflowVersions).reduce(
		(highestVersion, potentialVersion) =>
			semver.gt(coerced.get(potentialVersion), coerced.get(highestVersion))
				? potentialVersion
				: highestVersion,
		version,
	);
	const atBiggestVersion = workflowVersions[biggestVersion];

	return atBiggestVersion.hash
		? `${action}@${atBiggestVersion.hash} # ${biggestVersion}`
		: `${action}@${biggestVersion}`;
}
