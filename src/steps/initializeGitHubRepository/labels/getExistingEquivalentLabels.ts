const aliases = new Map([
	["enhancement", "type: feature"],
	["help wanted", "status: accepting prs"],
]);

export interface GhLabelData {
	color: string;
	description: null | string;
	name: string;
}

export function getExistingEquivalentLabels(
	existingLabels: GhLabelData[],
	outcomeLabelName: string,
) {
	const outcomeTrimmed = outcomeLabelName.replace(/\w+: (\w+)/, "$1");

	return existingLabels.filter(({ name: existingName }) => {
		return (
			existingName === outcomeLabelName ||
			existingName === outcomeTrimmed ||
			aliases.get(existingName) === outcomeLabelName ||
			existingName.replace(/\w+: (\w+)/, "$1") === outcomeLabelName
		);
	});
}
