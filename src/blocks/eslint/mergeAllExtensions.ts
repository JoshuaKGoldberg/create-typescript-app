import { Extension, ExtensionRules } from "./schemas.ts";

export function mergeAllExtensions(...extensions: Extension[]) {
	const entries: Record<string, Extension> = {};

	for (const extension of extensions) {
		const filesKey = JSON.stringify(extension.files);

		entries[filesKey] =
			filesKey in entries
				? mergeExtensions(entries[filesKey], extension, extension.files)
				: extension;
	}

	return Object.values(entries);
}

function mergeExtensions(
	a: Extension,
	b: Extension,
	files: string[],
): Extension {
	/* eslint-disable unicorn/no-useless-fallback-in-spread -- languageOptions and linterOptions are unknown, so TypeScript needs the {} fallbacks */
	return {
		extends: Array.from(
			new Set([...(a.extends ?? []), ...(b.extends ?? [])]),
		).toSorted(),
		files,
		languageOptions: (a.languageOptions ?? b.languageOptions) && {
			...(a.languageOptions ?? {}),
			...(b.languageOptions ?? {}),
		},
		linterOptions: (a.linterOptions ?? b.linterOptions) && {
			...(a.linterOptions ?? {}),
			...(b.linterOptions ?? {}),
		},
		plugins: (a.plugins ?? b.plugins) && { ...a.plugins, ...b.plugins },
		rules: mergeExtensionsRules(a.rules, b.rules),
		settings: (a.settings ?? b.settings) && { ...a.settings, ...b.settings },
	};
	/* eslint-enable unicorn/no-useless-fallback-in-spread */
}

function mergeExtensionsRules(
	a: ExtensionRules | undefined,
	b: ExtensionRules | undefined,
): ExtensionRules | undefined {
	if (!a || !b) {
		return a ?? b;
	}

	if (Array.isArray(a)) {
		return Array.isArray(b) ? [...a, ...b] : [...a, { entries: b }];
	}

	return Array.isArray(b) ? [...b, { entries: a }] : { ...a, ...b };
}
