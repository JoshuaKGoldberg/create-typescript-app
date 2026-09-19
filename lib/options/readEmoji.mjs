//#region src/options/readEmoji.ts
const graphemeSegmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
const pictographicPattern = /\p{Extended_Pictographic}|\p{Regional_Indicator}/u;
const keyCapPattern = /\p{Emoji}\uFE0F?\u20E3/u;
async function readEmoji(getDescription) {
	const description = await getDescription();
	return Array.from(graphemeSegmenter.segment(description ?? ""), ({ segment }) => segment).findLast((grapheme) => pictographicPattern.test(grapheme) || keyCapPattern.test(grapheme)) ?? "💖";
}
//#endregion
export { readEmoji };
