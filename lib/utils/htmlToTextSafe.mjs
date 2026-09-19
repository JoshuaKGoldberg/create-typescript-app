import { convert } from "html-to-text";
//#region src/utils/htmlToTextSafe.ts
function htmlToTextSafe(raw) {
	return convert(raw, {
		selectors: [{
			options: { ignoreHref: true },
			selector: "a"
		}],
		wordwrap: false
	});
}
//#endregion
export { htmlToTextSafe };
