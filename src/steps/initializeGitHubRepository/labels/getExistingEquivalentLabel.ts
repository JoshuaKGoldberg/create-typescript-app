const aliases = new Map([
	["enhancement", "type: feature"],
	["help wanted", "status: accepting prs"],
]);

export interface GhLabelData {
	color: string;
	description: string;
	name: string;
}

export function getExistingEquivalentLabel(
	existingLabels: GhLabelData[],
	outcomeLabel: string,
) {
	const outcomeTrimmed = outcomeLabel.replace(/\w+: (\w+)/, "$1");

	return existingLabels.find(({ name: existingName }) => {
		return (
			existingName === outcomeLabel ||
			existingName === outcomeTrimmed ||
			aliases.get(existingName) === outcomeLabel ||
			existingName.replace(/\w+: (\w+)/, "$1") === outcomeLabel
		);
	});
}
