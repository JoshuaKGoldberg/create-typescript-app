export function assertKnownAddons(
	blockName: string | undefined,
	knownAddons: Set<string>,
	addons: object | undefined,
) {
	const unknownAddons = Object.keys(addons ?? {}).filter(
		(addon) => !knownAddons.has(addon),
	);

	if (unknownAddons.length) {
		throw new Error(
			`Unknown Addon(s) passed to ${blockName ? `Block ${blockName}` : "a Block"}: ${unknownAddons.join(", ")}. Known Addons are: ${[...knownAddons].join(", ")}.`,
		);
	}
}
