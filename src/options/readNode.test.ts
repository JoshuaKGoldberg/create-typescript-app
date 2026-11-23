import { describe, expect, it, vi } from "vitest";

import { defaults } from "../constants.ts";
import { readNode } from "./readNode.ts";

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
			const node = "^22.13.0 || ^24.11.0 || >=26.0.0";

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

		it.each(["18", "20.20.2", "v20.20.2", "22.15.1", "v22.17", "23.4.5"])(
			"defaults to the default pinned when nvmrc is %s, which doesn't support type stripping",
			async (nvmrc) => {
				const { pinned } = await readNode(
					() => Promise.resolve(`${nvmrc}\n`),
					getPackageDataFull,
				);

				expect(pinned).toBe(defaults.node.pinned);
			},
		);

		it.each([
			"22",
			"22.18.0",
			"23.6.0",
			"24.14.0",
			"26.13.1",
			"lts/*",
			"lts/jod",
			"node",
			"v22.18",
			"v24.14.0",
		])("uses the trimmed nvmrc text value when nvmrc is %s", async (nvmrc) => {
			const { pinned } = await readNode(
				() => Promise.resolve(`${nvmrc}\n`),
				getPackageDataFull,
			);

			expect(pinned).toBe(nvmrc);
		});
	});
});
