import { allArgOptions } from "../shared/options/args.js";
import {
	ExclusionKey,
	getExclusions,
} from "../shared/options/exclusionKeys.js";
import { Options } from "../shared/types.js";

function getFirstMatchingArg(key: string) {
	return Object.keys(allArgOptions).find(
		(arg) => arg.replaceAll("-", "") === key.toLowerCase(),
	);
}

const defaultValues = new Map([["access", "public"]]);

export function createRerunSuggestion(options: Partial<Options>): string {
	const optionsNormalized = {
		...options,
		email: undefined,
		...(options.email && {
			emailGitHub: options.email.github,
			emailNpm: options.email.npm,
		}),
		...(options.guide
			? {
					guide: options.guide.href,
					guideTitle: options.guide.title,
				}
			: { guide: undefined }),
		...(options.logo
			? {
					logo: options.logo.src,
					logoAlt: options.logo.alt,
				}
			: { logo: undefined }),
		...(options.offline && {
			skipAllContributorsApi: undefined,
			skipGitHubApi: undefined,
		}),
	};

	const args = Object.entries(optionsNormalized)
		// Sort so the base is first, then the rest are sorted alphabetically
		.sort(([a], [b]) =>
			a === "base" ? -1 : b === "base" ? 1 : a.localeCompare(b),
		)
		// Filter out entries with an excluded key or a default or falsy value
		.filter(
			([key, value]) =>
				getExclusions(options, optionsNormalized.base)[key as ExclusionKey] ==
					undefined &&
				!!value &&
				value !== defaultValues.get(key),
		)
		.map(([key, value]) => {
			return `--${getFirstMatchingArg(key)}${stringifyValue(value)}`;
		})
		.join(" ");

	return ["npx create-typescript-app", args].filter(Boolean).join(" ");
}

function stringifyValue(
	value: boolean | string | string[] | undefined,
): string {
	if (Array.isArray(value)) {
		return stringifyValue(value.join(" "));
	}

	if (typeof value === "boolean" && value) {
		return "";
	}

	const valueStringified = `${value}`;

	return valueStringified.includes(" ")
		? ` "${valueStringified}"`
		: ` ${valueStringified}`;
}
