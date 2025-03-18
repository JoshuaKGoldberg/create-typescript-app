export async function readEmoji(
	getDescription: () => Promise<string | undefined>,
) {
	return (
		(await getDescription())?.match(/\p{Extended_Pictographic}/gu)?.at(-1) ??
		"💖"
	);
}
