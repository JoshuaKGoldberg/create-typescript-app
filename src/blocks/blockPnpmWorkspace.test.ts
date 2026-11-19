import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockPnpmWorkspace } from "./blockPnpmWorkspace.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockPnpmWorkspace, () => {
	test("without addons", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with properties", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				properties: {
					allowBuilds: { "simple-git-hooks": false },
					minimumReleaseAgeExclude: ["example@1.2.3"],
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "pnpm-workspace.yaml": "allowBuilds:
			  simple-git-hooks: false

			minimumReleaseAgeExclude:
			  - example@1.2.3
			",
			  },
			}
		`);
	});

	test("with existing values that already include properties", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				existing: {
					allowBuilds: { "simple-git-hooks": false },
					packages: ["packages/*"],
				},
				properties: {
					allowBuilds: { "simple-git-hooks": false },
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	test("with existing values that conflict with properties", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				existing: {
					allowBuilds: { esbuild: true, "simple-git-hooks": true },
					packages: ["packages/*"],
				},
				properties: {
					allowBuilds: { "simple-git-hooks": false },
					minimumReleaseAgeExclude: ["example@1.2.3"],
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "pnpm-workspace.yaml": "allowBuilds:
			  esbuild: true
			  simple-git-hooks: true

			minimumReleaseAgeExclude:
			  - example@1.2.3

			packages:
			  - packages/*
			",
			  },
			}
		`);
	});

	test("with existing values that are empty for properties", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				existing: {
					allowBuilds: null,
					packages: ["packages/*"],
				},
				properties: {
					allowBuilds: { "simple-git-hooks": false },
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "pnpm-workspace.yaml": "allowBuilds:
			  simple-git-hooks: false

			packages:
			  - packages/*
			",
			  },
			}
		`);
	});

	test("with existing scalar values that conflict with properties", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				existing: {
					packages: ["packages/*"],
					strictDepBuilds: true,
				},
				properties: {
					minimumReleaseAgeExclude: ["example@1.2.3"],
					strictDepBuilds: false,
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "pnpm-workspace.yaml": "minimumReleaseAgeExclude:
			  - example@1.2.3

			packages:
			  - packages/*

			strictDepBuilds: true
			",
			  },
			}
		`);
	});

	test("with existing text that lacks properties", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				existing: { packages: ["packages/*"] },
				existingText: "# Workspace packages\npackages:\n  - packages/*\n",
				properties: { allowBuilds: { "simple-git-hooks": false } },
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "pnpm-workspace.yaml": "# Workspace packages
			packages:
			  - packages/*

			allowBuilds:
			  simple-git-hooks: false
			",
			  },
			}
		`);
	});

	test("with existing text that needs values merged into a property", () => {
		const creation = testBlock(blockPnpmWorkspace, {
			addons: {
				existing: { allowBuilds: { esbuild: true } },
				existingText: "# Builds\nallowBuilds:\n  esbuild: true\n",
				properties: { allowBuilds: { "simple-git-hooks": false } },
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "pnpm-workspace.yaml": "allowBuilds:
			  esbuild: true
			  simple-git-hooks: false
			",
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when pnpm-workspace.yaml does not exist", () => {
			const actual = testIntake(blockPnpmWorkspace, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when pnpm-workspace.yaml does not contain an object", () => {
			const actual = testIntake(blockPnpmWorkspace, {
				files: {
					"pnpm-workspace.yaml": ["- invalid"],
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns existing values when pnpm-workspace.yaml contains an object", () => {
			const actual = testIntake(blockPnpmWorkspace, {
				files: {
					"pnpm-workspace.yaml": [
						"allowBuilds:\n  esbuild: true\n\npackages:\n  - packages/*\n",
					],
				},
			});

			expect(actual).toEqual({
				existing: {
					allowBuilds: { esbuild: true },
					packages: ["packages/*"],
				},
				existingText:
					"allowBuilds:\n  esbuild: true\n\npackages:\n  - packages/*\n",
			});
		});
	});
});
