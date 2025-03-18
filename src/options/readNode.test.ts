import { describe, expect, it, vi } from "vitest";

import { defaults } from "../constants.js";
import { readNode } from "./readNode.js";

describe(readNode, () => {
	describe("minimum", () => {
		const getNvmrc = vi.fn();

		it("defaults to the default minimum when engines.node does not exist", async () => {
			const { minimum } = await readNode(getNvmrc, () =>
				Promise.resolve({ engines: {} }),
			);

			expect(minimum).toBe(defaults.node.minimum);
		});

		it("defaults to the default minimum when engines.node does not contain a valid value", async () => {
			const { minimum } = await readNode(getNvmrc, () =>
				Promise.resolve({
					engines: {
						node: "invalid",
					},
				}),
			);

			expect(minimum).toBe(defaults.node.minimum);
		});

		it("uses the engines value when engines.node contains a valid value", async () => {
			const node = "23.4.5";

			const { minimum } = await readNode(getNvmrc, () =>
				Promise.resolve({
					engines: { node },
				}),
			);

			expect(minimum).toBe(node);
		});
	});

	describe("pinned", () => {
		const getPackageDataFull = vi.fn().mockResolvedValue({});

		it("defaults to the default pinned when nvmrc does not exist", async () => {
			const { pinned } = await readNode(
				() => Promise.resolve(new Error("")),
				getPackageDataFull,
			);

			expect(pinned).toBe(defaults.node.pinned);
		});

		it("defaults to the default pinned when nvmrc does not contain text", async () => {
			const { pinned } = await readNode(
				() => Promise.resolve("\n"),
				getPackageDataFull,
			);

			expect(pinned).toBe(defaults.node.pinned);
		});

		it("uses the trimmed nvmrc text value when nvmrc contains text", async () => {
			const nvmrc = "23.4.5";

			const { pinned } = await readNode(
				() => Promise.resolve(`${nvmrc}\n`),
				getPackageDataFull,
			);

			expect(pinned).toBe(nvmrc);
		});
	});
});
