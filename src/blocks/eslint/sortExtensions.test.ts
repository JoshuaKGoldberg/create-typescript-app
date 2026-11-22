import { describe, expect, test } from "vitest";

import { sortExtensions } from "./sortExtensions.ts";

const ymlBase = {
	extends: ['yml.configs["flat/standard"]'],
	files: ["**/*.{yml,yaml}"],
	rules: { "yml/file-extension": "error" as const },
};

describe(sortExtensions, () => {
	test("sorts unrelated extensions alphabetically by files", () => {
		const actual = sortExtensions([
			{ files: ["package.json"] },
			{ files: ["**/*.md"] },
			{ files: ["**/*.{js,ts}"] },
		]);

		expect(actual.map((extension) => extension.files)).toEqual([
			["**/*.{js,ts}"],
			["**/*.md"],
			["package.json"],
		]);
	});

	test("moves a specific override after the broader extension it overrides", () => {
		const override = {
			files: [".github/foo.yml"],
			rules: { "yml/file-extension": "off" as const },
		};

		const actual = sortExtensions([override, ymlBase]);

		expect(actual).toEqual([ymlBase, override]);
	});

	test("moves a brace-expanded override after the broader extension it overrides", () => {
		const override = {
			files: [".github/{dependabot,release}.yml"],
			rules: [{ entries: { "yml/file-extension": "off" as const } }],
		};

		const actual = sortExtensions([ymlBase, override]);

		expect(actual).toEqual([ymlBase, override]);
	});

	test("does not move a specific extension without rules", () => {
		const specific = {
			files: [".github/foo.yml"],
			languageOptions: { parserOptions: {} },
		};

		const actual = sortExtensions([ymlBase, specific]);

		expect(actual).toEqual([specific, ymlBase]);
	});

	test("does not move a specific extension whose rules don't overlap a broader extension without extends", () => {
		const broader = {
			files: ["**/*.test.*", "eslint.config.*"],
			rules: { "n/no-unsupported-features/node-builtins": "off" as const },
		};
		const specific = {
			extends: ["vitest.configs.recommended"],
			files: ["**/*.test.*"],
			rules: { "@typescript-eslint/no-unsafe-assignment": "off" as const },
		};

		const actual = sortExtensions([broader, specific]);

		expect(actual).toEqual([specific, broader]);
	});

	test("does not move an extension only partially matched by a later one", () => {
		const partial = {
			files: [".github/foo.yml", "other.json"],
			rules: { "yml/file-extension": "off" as const },
		};

		const actual = sortExtensions([ymlBase, partial]);

		expect(actual).toEqual([partial, ymlBase]);
	});
});
