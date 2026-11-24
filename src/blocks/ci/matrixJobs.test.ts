import { describe, expect, test } from "vitest";

import { getMatrixJobCheckNames, withVersionComments } from "./matrixJobs.ts";

describe(getMatrixJobCheckNames, () => {
	test.each([
		[
			"Test (${{ matrix.os }})",
			{ os: ["macos-latest", "ubuntu-latest"] },
			["Test (macos-latest)", "Test (ubuntu-latest)"],
		],
		[
			"Test ${{matrix.os}} ${{ matrix.node }}",
			{ node: [22, 24], os: ["ubuntu-latest"] },
			["Test ubuntu-latest 22", "Test ubuntu-latest 24"],
		],
		["Test ${{ matrix.other }}", { os: ["ubuntu-latest"] }, []],
		[
			"Test",
			{ node: [22, 24], os: ["ubuntu-latest"] },
			["Test (22, ubuntu-latest)", "Test (24, ubuntu-latest)"],
		],
		["Test", { os: "${{ fromJSON(needs.setup.outputs.os) }}" }, []],
		["Test", { include: [{ os: "ubuntu-latest" }] }, []],
		["Test", { exclude: [], os: ["ubuntu-latest"] }, []],
	])("%s with %j", (name, matrix, expected) => {
		expect(
			getMatrixJobCheckNames({ name, steps: [], strategy: { matrix } }),
		).toEqual(expected);
	});
});

describe(withVersionComments, () => {
	const job = {
		name: "Test",
		steps: [{ run: "pnpm test" }, { uses: "example/action@abc123" }],
		strategy: { matrix: { os: ["ubuntu-latest"] } },
	};

	test.each([
		[undefined, "example/action@abc123"],
		[{}, "example/action@abc123"],
		[{ "example/action": { v1: { hash: "other" } } }, "example/action@abc123"],
		[
			{ "example/action": { v1: { hash: "other" }, v2: { hash: "abc123" } } },
			"example/action@abc123 # v2",
		],
	])("%j", (workflowsVersions, expected) => {
		expect(withVersionComments(job, workflowsVersions)).toEqual({
			...job,
			steps: [{ run: "pnpm test" }, { uses: expected }],
		});
	});
});
