export async function readAuthor(
	getPackageAuthor: () => Promise<{ author?: string }>,
	getNpmDefaults: () => Promise<undefined | { name?: string }>,
	owner: string | undefined,
) {
	return (
		(await getPackageAuthor()).author ?? (await getNpmDefaults())?.name ?? owner
	);
}
