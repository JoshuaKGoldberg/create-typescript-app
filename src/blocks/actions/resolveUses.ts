import { CachedFactory } from "cached-factory";
import semver from "semver";

import { WorkflowsVersions } from "../../schemas.js";

const semverCoercions = new CachedFactory((version: string) => {
	return semver.coerce(version)?.toString() ?? "0.0.0";
});

export function resolveUses(
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
			semver.gt(
				semverCoercions.get(potentialVersion),
				semverCoercions.get(highestVersion),
			)
				? potentialVersion
				: highestVersion,
		version,
	);

	if (!(biggestVersion in workflowVersions)) {
		return `${action}@${biggestVersion}`;
	}

	const atBiggestVersion = workflowVersions[biggestVersion];

	return atBiggestVersion.hash
		? `${action}@${atBiggestVersion.hash} # ${biggestVersion}`
		: `${action}@${biggestVersion}`;
}
