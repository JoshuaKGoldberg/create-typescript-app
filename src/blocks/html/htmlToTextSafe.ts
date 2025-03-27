import { convert } from "html-to-text";

export function htmlToTextSafe(raw: string) {
	return convert(raw, { wordwrap: false });
}
