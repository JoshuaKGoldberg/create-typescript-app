import { swallowError } from "../utils/swallowError.mjs";
import { inputFromFile } from "input-from-file";
//#region src/options/readDevelopmentDocumentation.ts
const knownHeadings = /* @__PURE__ */ new Set([
	"building",
	"development",
	"formatting",
	"linting",
	"testing",
	"type checking"
]);
async function readDevelopmentDocumentation(take) {
	const existing = swallowError(await take(inputFromFile, { filePath: ".github/DEVELOPMENT.md" }));
	if (!existing) return;
	return existing.split(/\n\n(?=##\s)/).filter((section) => !knownHeadings.has(parseHeading(section))).join("\n\n");
}
function parseHeading(section) {
	return section.split("\n")[0].replace(/^#+\s+/, "").trim().toLowerCase();
}
//#endregion
export { readDevelopmentDocumentation };
