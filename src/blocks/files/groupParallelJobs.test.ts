import { describe, expect, test } from "vitest";

import { groupParallelJobs } from "./groupParallelJobs.ts";

const lint = { name: "Lint", steps: [{ run: "pnpm lint" }] };
const typeCheck = { name: "Type Check", steps: [{ run: "pnpm tsc" }] };

describe(groupParallelJobs, () => {
	test("returns jobs unchanged when fewer than two can run in parallel", () => {
		const jobs = [
			lint,
			{ name: "Test", steps: [{ run: "pnpm test" }, { uses: "codecov" }] },
		];

		expect(groupParallelJobs(jobs)).toBe(jobs);
	});

	test("groups single-step jobs without building when none build", () => {
		expect(groupParallelJobs([lint, typeCheck])).toEqual([
			{
				name: "CI",
				steps: [
					{
						parallel: [
							{ name: "Lint", run: "pnpm lint" },
							{ name: "Type Check", run: "pnpm tsc" },
						],
					},
				],
			},
		]);
	});

	test("builds once before the group when a job starts with pnpm build", () => {
		expect(
			groupParallelJobs([
				{ name: "Build", steps: [{ run: "pnpm build" }] },
				{
					name: "Lint",
					steps: [{ run: "pnpm build" }, { run: "pnpm lint" }],
				},
				typeCheck,
			]),
		).toEqual([
			{
				name: "CI",
				steps: [
					{ run: "pnpm build" },
					{
						parallel: [
							{ name: "Lint", run: "pnpm lint" },
							{ name: "Type Check", run: "pnpm tsc" },
						],
					},
				],
			},
		]);
	});

	test.each([
		["checkoutWith", { checkoutWith: { "fetch-depth": "0" } }, [lint.steps[0]]],
		["if", { if: "github.event_name == 'push'" }, [lint.steps[0]]],
		["permissions", { permissions: { contents: "read" } }, [lint.steps[0]]],
		["no steps", {}, []],
		["a step with if", {}, [{ if: "always()", run: "pnpm lint" }]],
		["a later pnpm build", {}, [{ run: "pnpm lint" }, { run: "pnpm build" }]],
		[
			"a pnpm build with env",
			{},
			[{ env: { CI: "true" }, run: "pnpm build" }, { run: "pnpm lint" }],
		],
	])("keeps a job with %s separate", (_, options, steps) => {
		const separate = { name: "Separate", ...options, steps };

		expect(groupParallelJobs([lint, separate, typeCheck])).toEqual([
			{
				name: "CI",
				steps: [
					{
						parallel: [
							{ name: "Lint", run: "pnpm lint" },
							{ name: "Type Check", run: "pnpm tsc" },
						],
					},
				],
			},
			separate,
		]);
	});

	test("names each parallel step after its job", () => {
		expect(
			groupParallelJobs([
				{ name: "Lint", steps: [{ name: "Other", run: "pnpm lint" }] },
				typeCheck,
			]),
		).toEqual([
			{
				name: "CI",
				steps: [
					{
						parallel: [
							{ name: "Lint", run: "pnpm lint" },
							{ name: "Type Check", run: "pnpm tsc" },
						],
					},
				],
			},
		]);
	});

	test("keeps jobs past the concurrency limit separate", () => {
		const jobs = Array.from({ length: 11 }, (_, i) => ({
			name: `Check ${String(i).padStart(2, "0")}`,
			steps: [{ run: `pnpm check:${i}` }],
		}));

		expect(groupParallelJobs(jobs)).toEqual([
			jobs[10],
			{
				name: "CI",
				steps: [
					{
						parallel: jobs
							.slice(0, 10)
							.map((job) => ({ name: job.name, ...job.steps[0] })),
					},
				],
			},
		]);
	});
});
