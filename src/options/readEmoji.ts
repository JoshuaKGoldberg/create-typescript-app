const graphemeSegmenter = new Intl.Segmenter(undefined, {
	granularity: "grapheme",
});

const pictographicPattern = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;
const keyCapPattern = /\p{Emoji}\uFE0F?\u20E3/u;

export async function readEmoji(
	getDescription: () => Promise<string | undefined>,
) {
	const description = await getDescription();

	return (
		Array.from(
			graphemeSegmenter.segment(description ?? ""),
			({ segment }) => segment,
		).findLast(
			(grapheme) =>
				pictographicPattern.test(grapheme) || keyCapPattern.test(grapheme),
		) ?? "💖"
	);
}
