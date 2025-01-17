export function createJobName(label: string) {
	return label.toLowerCase().replaceAll("?", "").replaceAll(" ", "_");
}
