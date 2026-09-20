import {
	createMockFetchers,
	createMockSystems,
	testInput,
} from "bingo-testers";
import { describe, expect, it, vi } from "vitest";

import { inputFromFetchJson } from "./inputFromFetchJson.ts";

const args = { url: "https://example.com" };

describe(inputFromFetchJson, () => {
	it("returns undefined when offline", async () => {
		const fetch = vi.fn();

		const fetchers = createMockFetchers(fetch);
		const { system, take } = createMockSystems({ fetchers });

		const actual = await inputFromFetchJson({
			...system,
			args,
			offline: true,
			take,
		});

		expect(actual).toBeUndefined();
		expect(fetch).not.toHaveBeenCalled();
	});

	it("returns undefined when the request rejects", async () => {
		const actual = await testInput(inputFromFetchJson, {
			args,
			fetchers: createMockFetchers(
				vi.fn().mockRejectedValueOnce(new Error("Oh no!")),
			),
		});

		expect(actual).toBeUndefined();
	});

	it("returns undefined when the response is not ok", async () => {
		const actual = await testInput(inputFromFetchJson, {
			args,
			fetchers: createMockFetchers(
				vi.fn().mockResolvedValueOnce(new Response("{}", { status: 401 })),
			),
		});

		expect(actual).toBeUndefined();
	});

	it("returns parsed JSON when the response is ok", async () => {
		const fetch = vi
			.fn()
			.mockResolvedValueOnce(new Response(JSON.stringify({ found: true })));

		const actual = await testInput(inputFromFetchJson, {
			args: { ...args, init: { headers: { Authorization: "Bearer abc" } } },
			fetchers: createMockFetchers(fetch),
		});

		expect(actual).toEqual({ found: true });
		expect(fetch).toHaveBeenCalledWith("https://example.com", {
			headers: { Authorization: "Bearer abc" },
		});
	});
});
