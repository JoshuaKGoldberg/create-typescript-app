import { describe, expect, it } from "vitest";

import { resolveUses } from "./resolveUses.js";

describe(resolveUses, () => {
	it("returns action@version when workflowsVersions is undefined", () => {
		const actual = resolveUses("test-action", "v1.2.3");

		expect(actual).toBe("test-action@v1.2.3");
	});

	it("returns action@version when workflowsVersions does not contain the action", () => {
		const actual = resolveUses("test-action", "v1.2.3", { other: {} });

		expect(actual).toBe("test-action@v1.2.3");
	});

	it("uses the provided version when it is greater than all the action versions in workflowsVersions", () => {
		const actual = resolveUses("test-action", "v1.2.3", {
			"test-action": {
				"v0.1.2": {
					pinned: true,
				},
				"v1.1.4": {
					pinned: true,
				},
			},
		});

		expect(actual).toBe("test-action@v1.2.3");
	});

	it("prefers a provided valid semver version when an action also has a non-semver tag", () => {
		const actual = resolveUses("test-action", "v1.2.3", {
			"test-action": {
				main: {
					pinned: true,
				},
			},
		});

		expect(actual).toBe("test-action@v1.2.3");
	});

	it("prefers an action's semver tag when the provided version is a non-semver tag", () => {
		const actual = resolveUses("test-action", "main", {
			"test-action": {
				"v1.2.3": {
					pinned: true,
				},
			},
		});

		expect(actual).toBe("test-action@v1.2.3");
	});

	it("uses the greatest version when the provided version is not bigger than all the action versions in workflowsVersions", () => {
		const actual = resolveUses("test-action", "v1.2.3", {
			"test-action": {
				"v0.1.2": {
					pinned: true,
				},
				"v1.3.5": {
					pinned: true,
				},
			},
		});

		expect(actual).toBe("test-action@v1.3.5");
	});

	it("uses a pinned hash when the greatest version contains a hash", () => {
		const actual = resolveUses("test-action", "v1.2.3", {
			"test-action": {
				"v0.1.2": {
					pinned: true,
				},
				"v1.3.5": {
					hash: "abc",
					pinned: true,
				},
			},
		});

		expect(actual).toBe("test-action@abc # v1.3.5");
	});
});
