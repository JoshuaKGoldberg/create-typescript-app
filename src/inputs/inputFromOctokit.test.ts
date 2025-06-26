import { createMockFetchers, testInput } from "bingo-testers";
import { describe, expect, it, vi } from "vitest";

import { inputFromOctokit } from "./inputFromOctokit.js";

describe("inputFromOctokit", () => {
	it("returns data when the request resolves", async () => {
		const data = JSON.stringify({ found: true });

		const actual = await testInput(inputFromOctokit, {
			args: {
				endpoint: "GET /repos/{owner}/{repo}/rulesets",
				options: {},
			},
			fetchers: createMockFetchers(
				vi.fn().mockResolvedValueOnce(new Response(data)),
			),
		});

		expect(actual).toEqual(data);
	});

	it("returns undefined when the request rejects", async () => {
		const actual = await testInput(inputFromOctokit, {
			args: {
				endpoint: "GET /repos/{owner}/{repo}/rulesets",
				options: {},
			},
			fetchers: createMockFetchers(
				vi.fn().mockResolvedValueOnce(
					new Response("", {
						status: 404,
						statusText: "Not found.",
					}),
				),
			),
		});

		expect(actual).toBe(undefined);
	});
});
