const aliases = new Map([
	["enhancement", "type: feature"],
	["help wanted", "status: accepting prs"],
]);

export function getExistingEquivalentLabel(
	existingLabels: string[],
	outcomeLabel: string,
) {
	const outcomeTrimmed = outcomeLabel.replace(/\w+: (\w+)/, "$1");

	return existingLabels.find((existingLabel) => {
		return (
			existingLabel === outcomeLabel ||
			existingLabel === outcomeTrimmed ||
			aliases.get(existingLabel) === outcomeLabel ||
			existingLabel.replace(/\w+: (\w+)/, "$1") === outcomeLabel
		);
	});
}
