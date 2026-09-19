import { createRequire } from "node:module";
const packageData = createRequire(import.meta.url)("../../package.json");
function getPackageDependencies(...names) {
	return Object.fromEntries(names.map((name) => {
		return [name, getPackageDependency(name)];
	}));
}
function getPackageDependency(name) {
	const version = getPackageInner("devDependencies", name) ?? getPackageInner("dependencies", name);
	if (!version) throw new Error(`'${name}' is neither in package.json's dependencies nor its devDependencies.`);
	return version;
}
function getPackageInner(key, name) {
	return packageData[key][name];
}
//#endregion
export { getPackageDependencies, getPackageDependency, packageData };
