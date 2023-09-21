import { Mode } from "../bin/mode.js";
import { allArgOptions } from "../shared/options/args.js";
import { Options } from "../shared/types.js";

function getFirstMatchingArg(key: string) {
	return Object.keys(allArgOptions).find(
		(arg) => arg.replaceAll("-", "") === key.toLowerCase(),
	);
}

export function createRerunSuggestion(
	mode: Mode,
	options: Partial<Options>,
): string {
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
		.map(([key, value]) => {
			const valueStringified = `${value}`;
			return `--${getFirstMatchingArg(key)} ${
				valueStringified.includes(" ") ? `"${value}"` : value
			}`;
		})
		.join(" ");

	return `npx create-typescript-app --mode ${mode} ${args}`;
}
