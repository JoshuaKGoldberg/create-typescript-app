import { sourcePackageJson } from "./sourcePackageJson.js";

export function getPackageDependencies(...names: string[]) {
	return Object.fromEntries(
		names.map((name) => {
			return [name, getPackageDependency(name)];
		}),
	);
}

export function getPackageDependency(name: string) {
	const version =
		getPackageInner("devDependencies", name) ??
		getPackageInner("dependencies", name);

	if (!version) {
		throw new Error(
			`'${name} is neither in package.json's dependencies nor its devDependencies.`,
		);
	}

	return version;
}

function getPackageInner(
	key: "dependencies" | "devDependencies",
	name: string,
) {
	const inner = sourcePackageJson[key];

	return inner[name as keyof typeof inner] as string | undefined;
}
