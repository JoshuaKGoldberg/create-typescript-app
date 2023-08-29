import { Mode } from "../bin/mode.js";
import { allArgOptions } from "../shared/options/args.js";
import { Options } from "../shared/types.js";

function getFirstMatchingArg(key: string) {
	return Object.keys(allArgOptions).find(
		(arg) => arg.replaceAll("-", "") === key.toLowerCase(),
	);
}

export function createRerunSuggestion(mode: Mode, options: Options): string {
	const args = Object.entries(options)
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
