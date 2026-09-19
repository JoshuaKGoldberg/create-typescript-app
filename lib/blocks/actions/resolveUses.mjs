import { CachedFactory } from "cached-factory";
import semver from "semver";
//#region src/blocks/actions/resolveUses.ts
const semverCoercions = new CachedFactory((version) => {
	return semver.coerce(version)?.toString() ?? "0.0.0";
});
function resolveUses(action, version, workflowsVersions) {
	if (!workflowsVersions || !(action in workflowsVersions)) return `${action}@${version}`;
	const workflowVersions = workflowsVersions[action];
	const biggestVersion = Object.keys(workflowVersions).reduce((highestVersion, potentialVersion) => semver.gt(semverCoercions.get(potentialVersion), semverCoercions.get(highestVersion)) ? potentialVersion : highestVersion, version);
	if (!(biggestVersion in workflowVersions)) return `${action}@${biggestVersion}`;
	const atBiggestVersion = workflowVersions[biggestVersion];
	return atBiggestVersion.hash ? `${action}@${atBiggestVersion.hash} # ${biggestVersion}` : `${action}@${biggestVersion}`;
}
//#endregion
export { resolveUses };
