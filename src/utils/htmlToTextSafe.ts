import { convert } from "html-to-text";

export function htmlToTextSafe(raw: string) {
	return convert(raw, {
		selectors: [
			{
				options: { ignoreHref: true },
				selector: "a",
			},
		],
		wordwrap: false,
	});
}
