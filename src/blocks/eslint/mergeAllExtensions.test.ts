import { describe, expect, test } from "vitest";

import { mergeAllExtensions } from "./mergeAllExtensions.js";

describe(mergeAllExtensions, () => {
	test("when the first provides everything", () => {
		const actual = mergeAllExtensions(
			{
				extends: ["a.configs.recommended"],
				files: ["**/*.a"],
				languageOptions: {
					languageOption: true,
				},
				linterOptions: {
					linterOption: true,
				},
				plugins: {
					"plugin-a-key": "plugin-a-value",
				},
				rules: {
					"a/b": "error",
				},
				settings: {
					react: {
						version: "detect",
					},
				},
			},
			{
				files: ["**/*.a"],
			},
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "extends": [
			      "a.configs.recommended",
			    ],
			    "files": [
			      "**/*.a",
			    ],
			    "languageOptions": {
			      "languageOption": true,
			    },
			    "linterOptions": {
			      "linterOption": true,
			    },
			    "plugins": {
			      "plugin-a-key": "plugin-a-value",
			    },
			    "rules": {
			      "a/b": "error",
			    },
			    "settings": {
			      "react": {
			        "version": "detect",
			      },
			    },
			  },
			]
		`);
	});

	test("when the second provides everything", () => {
		const actual = mergeAllExtensions(
			{
				files: ["**/*.a"],
			},
			{
				extends: ["a.configs.recommended"],
				files: ["**/*.a"],
				languageOptions: {
					languageOption: true,
				},
				linterOptions: {
					linterOption: true,
				},
				plugins: {
					"plugin-a-key": "plugin-a-value",
				},
				rules: {
					"a/b": "error",
				},
				settings: {
					react: {
						version: "detect",
					},
				},
			},
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "extends": [
			      "a.configs.recommended",
			    ],
			    "files": [
			      "**/*.a",
			    ],
			    "languageOptions": {
			      "languageOption": true,
			    },
			    "linterOptions": {
			      "linterOption": true,
			    },
			    "plugins": {
			      "plugin-a-key": "plugin-a-value",
			    },
			    "rules": {
			      "a/b": "error",
			    },
			    "settings": {
			      "react": {
			        "version": "detect",
			      },
			    },
			  },
			]
		`);
	});

	test("where neither rules group has a comment", () => {
		const actual = mergeAllExtensions(
			{
				files: ["**/*.js"],
				rules: { a: "error" },
			},
			{
				files: ["**/*.js"],
				rules: { b: "error" },
			},
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "extends": [],
			    "files": [
			      "**/*.js",
			    ],
			    "languageOptions": undefined,
			    "linterOptions": undefined,
			    "plugins": undefined,
			    "rules": {
			      "a": "error",
			      "b": "error",
			    },
			    "settings": undefined,
			  },
			]
		`);
	});

	test("where only the first rules group has a comment", () => {
		const actual = mergeAllExtensions(
			{
				files: ["**/*.js"],
				rules: [
					{
						comment: "One standalone comment",
						entries: { a: "error" },
					},
				],
			},
			{
				files: ["**/*.js"],
				rules: { b: "error" },
			},
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "extends": [],
			    "files": [
			      "**/*.js",
			    ],
			    "languageOptions": undefined,
			    "linterOptions": undefined,
			    "plugins": undefined,
			    "rules": [
			      {
			        "comment": "One standalone comment",
			        "entries": {
			          "a": "error",
			        },
			      },
			      {
			        "entries": {
			          "b": "error",
			        },
			      },
			    ],
			    "settings": undefined,
			  },
			]
		`);
	});

	test("where only the second rules group has a comment", () => {
		const actual = mergeAllExtensions(
			{
				files: ["**/*.js"],
				rules: { b: "error" },
			},
			{
				files: ["**/*.js"],
				rules: [
					{
						comment: "One standalone comment",
						entries: { a: "error" },
					},
				],
			},
		);

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "extends": [],
			    "files": [
			      "**/*.js",
			    ],
			    "languageOptions": undefined,
			    "linterOptions": undefined,
			    "plugins": undefined,
			    "rules": [
			      {
			        "comment": "One standalone comment",
			        "entries": {
			          "a": "error",
			        },
			      },
			      {
			        "entries": {
			          "b": "error",
			        },
			      },
			    ],
			    "settings": undefined,
			  },
			]
		`);
	});

	test("with identical comments in the same extension", () => {
		const actual = mergeAllExtensions({
			files: ["**/*.js"],
			rules: [
				{
					comment: "Duplicated comment",
					entries: { a: "error" },
				},
				{
					comment: "Standalone comment",
					entries: { b: "error" },
				},
				{
					comment: "Duplicated comment",
					entries: { c: "error" },
				},
			],
		});

		expect(actual).toMatchInlineSnapshot(`
			[
			  {
			    "files": [
			      "**/*.js",
			    ],
			    "rules": [
			      {
			        "comment": "Duplicated comment",
			        "entries": {
			          "a": "error",
			        },
			      },
			      {
			        "comment": "Standalone comment",
			        "entries": {
			          "b": "error",
			        },
			      },
			      {
			        "comment": "Duplicated comment",
			        "entries": {
			          "c": "error",
			        },
			      },
			    ],
			  },
			]
		`);
	});
});
