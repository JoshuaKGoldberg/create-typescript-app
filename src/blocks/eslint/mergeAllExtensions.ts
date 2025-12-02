import { Extension, ExtensionRules } from "./schemas.js";

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
	return {
		extends: Array.from(
			new Set([...(a.extends ?? []), ...(b.extends ?? [])]),
		).sort(),
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
}

function mergeExtensionsRules(
	a: ExtensionRules | undefined,
	b: ExtensionRules | undefined,
): ExtensionRules | undefined {
	if (!a || !b) {
		return a ?? b;
	}

	if (Array.isArray(a)) {
		if (Array.isArray(b)) {
			return [...a, ...b];
		}

		return [...a, { entries: b }];
	}

	if (Array.isArray(b)) {
		return [...b, { entries: a }];
	}

	return { ...a, ...b };
}
