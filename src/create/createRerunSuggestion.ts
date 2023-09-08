import { Mode } from "../bin/mode.js";
import { allArgOptions } from "../shared/options/args.js";
import { Options } from "../shared/types.js";

function normalize(key: string) {
	return key.replaceAll("-", "").toLowerCase();
}

export function createRerunSuggestion(
	mode: Mode,
	options: Partial<Options>,
): string {
	const argOptionsNormalized = Object.keys(allArgOptions).map(normalize);

	const optionsNormalized = {
		...options,
		...(options.logo
			? {
					logo: options.logo.src,
					logoAlt: options.logo.alt,
			  }
			: { logo: undefined }),
	};

	const args = Object.entries(optionsNormalized)
		.filter(([, value]) => !!value)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => {
			return [
				"--",
				argOptionsNormalized.find((arg) => arg === normalize(key)),
				" ",
				`${value}`.includes(" ") ? `"${value}"` : value,
			].join("");
		})
		.join(" ");

	return `npx create-typescript-app --mode ${mode} ${args}`;
}
