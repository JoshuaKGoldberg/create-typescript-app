import { dump } from "js-yaml";
import { describe, expect, it, vi } from "vitest";

import { readCodecovToken } from "./readCodecovToken.ts";

const mockTake = vi.fn();

function ciWithCodecovStep(step: object) {
	return dump({ jobs: { test: { steps: [{ run: "pnpm test" }, step] } } });
}

describe(readCodecovToken, () => {
	it("resolves with undefined when neither ci.yaml nor ci.yml can be read", async () => {
		mockTake
			.mockResolvedValueOnce(new Error("Oh no!"))
			.mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBeUndefined();
	});

	it("resolves with undefined when ci.yaml contains invalid YAML", async () => {
		mockTake.mockResolvedValueOnce("jobs: [");

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBeUndefined();
	});

	it("resolves with undefined when ci.yaml has no test steps", async () => {
		mockTake.mockResolvedValueOnce(dump({ jobs: { lint: {} } }));

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBeUndefined();
	});

	it("resolves with undefined when ci.yaml has no codecov step", async () => {
		mockTake.mockResolvedValueOnce(
			ciWithCodecovStep({ uses: "actions/checkout@v4" }),
		);

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBeUndefined();
	});

	it("resolves with false when the codecov step has no CODECOV_TOKEN env", async () => {
		mockTake.mockResolvedValueOnce(
			ciWithCodecovStep({ uses: "codecov/codecov-action@v3" }),
		);

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBe(false);
	});

	it("resolves with false when the codecov step has a non-standard CODECOV_TOKEN env", async () => {
		mockTake.mockResolvedValueOnce(
			ciWithCodecovStep({
				env: { CODECOV_TOKEN: "${{ secrets.OTHER_TOKEN }}" },
				uses: "codecov/codecov-action@v3",
			}),
		);

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBe(false);
	});

	it("resolves with true when the codecov step has the standard CODECOV_TOKEN env", async () => {
		mockTake.mockResolvedValueOnce(
			ciWithCodecovStep({
				env: { CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}" },
				uses: "codecov/codecov-action@v3",
			}),
		);

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBe(true);
	});

	it("falls back to ci.yml when ci.yaml cannot be read", async () => {
		mockTake.mockResolvedValueOnce(new Error("Oh no!")).mockResolvedValueOnce(
			ciWithCodecovStep({
				env: { CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}" },
				uses: "codecov/codecov-action@v3",
			}),
		);

		const actual = await readCodecovToken(mockTake);

		expect(actual).toBe(true);
	});
});
