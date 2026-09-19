//#region src/blocks/getInstallationSuggestions.ts
function getInstallationSuggestions(description, entries, url) {
	return entries.length ? [[
		`- ${description}`,
		entries.length === 1 ? "" : "s",
		` on ${url}:\n`,
		entries.map((entry) => `   - ${entry}`).join("\n")
	].join("")] : void 0;
}
//#endregion
export { getInstallationSuggestions };
