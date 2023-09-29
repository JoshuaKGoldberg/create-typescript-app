import { allArgOptions } from "../shared/options/args.js";
import { Options } from "../shared/types.js";

function getFirstMatchingArg(key: string) {
	return Object.keys(allArgOptions).find(
		(arg) => arg.replaceAll("-", "") === key.toLowerCase(),
	);
}

export function createRerunSuggestion(options: Partial<Options>): string {
	const optionsNormalized = {
		...options,
		...(options.email
			? {
					email: undefined,
					emailGitHub: options.email.github,
					emailNpm: options.email.npm,
			  }
			: { email: undefined }),
		...(options.logo
			? {
					logo: options.logo.src,
					logoAlt: options.logo.alt,
			  }
			: { logo: undefined }),
	};

	const args = Object.entries(optionsNormalized)
		.sort(([a], [b]) =>
			a === "base" ? -1 : b === "base" ? 1 : a.localeCompare(b),
		)
		.filter(([, value]) => !!value)
		.map(([key, value]) => {
			return `--${getFirstMatchingArg(key)} ${stringifyValue(value)}`;
		})
		.join(" ");

	return `npx create-typescript-app --mode ${options.mode} ${args}`;
}

function stringifyValue(
	value: boolean | string | string[] | undefined,
): string {
	if (Array.isArray(value)) {
		return stringifyValue(value.join(" "));
	}

	const valueStringified = `${value}`;

	return valueStringified.includes(" ")
		? `"${valueStringified}"`
		: valueStringified;
}
