import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const packageData =
	// Importing from above src/ would expand the TS build rootDir

	require("../../../package.json") as typeof import("../../../package.json");

const getPackageInner = (
	key: "dependencies" | "devDependencies",
	name: string,
) => {
	const inner = packageData[key];

	return inner[name as keyof typeof inner] as string | undefined;
};

export const getPackageDependencies = (...names: string[]) =>
	Object.fromEntries(
		names.map((name) => {
			const version =
				getPackageInner("devDependencies", name) ??
				getPackageInner("dependencies", name);

			if (!version) {
				throw new Error(
					`'${name} is neither in package.json's dependencies nor its devDependencies.`,
				);
			}

			return [name, version];
		}),
	);
