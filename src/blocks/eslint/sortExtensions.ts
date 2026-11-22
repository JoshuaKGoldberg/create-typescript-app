import { minimatch } from "minimatch";

import { Extension, ExtensionRules } from "./schemas.ts";

export function sortExtensions(extensions: Extension[]) {
	const sorted = extensions.toSorted((a, b) =>
		processForSort(a.files).localeCompare(processForSort(b.files)),
	);

	for (let i = 0, moves = 0; i < sorted.length; i += 1) {
		const lastBroaderIndex = sorted.findLastIndex(
			(other, j) =>
				j > i &&
				isOverriddenBy(sorted[i], other) &&
				!isOverriddenBy(other, sorted[i]),
		);

		if (lastBroaderIndex !== -1 && moves < sorted.length ** 2) {
			sorted.splice(lastBroaderIndex, 0, ...sorted.splice(i, 1));
			i -= 1;
			moves += 1;
		}
	}

	return sorted;
}

function getRuleNames(rules: ExtensionRules | undefined) {
	return Array.isArray(rules)
		? rules.flatMap((group) => Object.keys(group.entries))
		: Object.keys(rules ?? {});
}

function isOverriddenBy(specific: Extension, broader: Extension) {
	return (
		mayOverrideRules(specific, broader) &&
		specific.files.every(
			(pattern) =>
				!pattern.startsWith("!") &&
				minimatch
					.braceExpand(pattern)
					.every((expanded) =>
						broader.files.some(
							(broaderPattern) =>
								!broaderPattern.startsWith("!") &&
								minimatch(expanded, broaderPattern, { dot: true }),
						),
					),
		)
	);
}

function mayOverrideRules(specific: Extension, broader: Extension) {
	const specificRuleNames = getRuleNames(specific.rules);
	if (!specificRuleNames.length) {
		return false;
	}

	if (broader.extends?.length) {
		return true;
	}

	const broaderRuleNames = new Set(getRuleNames(broader.rules));
	return specificRuleNames.some((ruleName) => broaderRuleNames.has(ruleName));
}

function processForSort(files: string[]) {
	return files.join("").replaceAll("{", "");
}
