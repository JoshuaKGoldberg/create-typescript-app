export function createJobName(label: string) {
	return label.replaceAll(/[?()]/g, "").replaceAll(" ", "_").toLowerCase();
}
