const packageData =
	// Importing from above src/ would expand the TS build rootDir
	// eslint-disable-next-line @typescript-eslint/no-require-imports
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
