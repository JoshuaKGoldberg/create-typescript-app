import { Block, producePreset } from "bingo-stratum";
import { describe, expect, test } from "vitest";

import { BaseOptions } from "./base.ts";
import { optionsBase } from "./blocks/options.fakes.ts";
import { getPackageDependencies, packageData } from "./data/packageData.ts";
import {
	blockNcc,
	blockNextJs,
	blockReleaseIt,
	blockTSDown,
	blockVite,
	blockWebExt,
	presets,
} from "./index.ts";
import { template } from "./template.ts";

// Renovate only updates dependency versions it can see in a package.json.
// This test ensures every dependency version a block adds comes from either
// this repository's package.json or src/data/blockDependencies/package.json,
// rather than being hardcoded in the block's source where it'd go stale.
//
// If the test fails, add the dependency to src/data/blockDependencies/package.json
// (unless this repository uses it) and read it with getPackageDependencies().

type AnyBlock = Block<object | undefined, BaseOptions>;

// Some blocks replace blocks in the everything preset, as described in docs/Examples.md.
const exclusions = new Map<AnyBlock, AnyBlock[]>([
	[blockNcc, [blockTSDown]],
	[blockNextJs, [blockTSDown]],
	[blockVite, [blockTSDown]],
	[blockWebExt, [blockReleaseIt, blockTSDown]],
]);

function getExpectedVersions(actual: Record<string, string>) {
	const { [packageData.name]: ownVersion, ...others } = actual;

	return {
		...(ownVersion && { [packageData.name]: packageData.version }),
		...getPackageDependencies(...Object.keys(others)),
	};
}

function produceDependencies(block: AnyBlock) {
	const { files } = producePreset(presets.everything, {
		options: optionsBase,
		refinements: {
			blocks: { add: [block], exclude: exclusions.get(block) },
		},
	});

	const { dependencies, devDependencies, peerDependencies } = JSON.parse(
		files["package.json"] as string,
	) as Record<string, Record<string, string> | undefined>;

	return { ...dependencies, ...devDependencies, ...peerDependencies };
}

describe("dependency versions", () => {
	test.each(
		template.blocks.map((block) => [block.about?.name, block] as const),
	)("everything preset with %s", (_, block) => {
		const actual = produceDependencies(block);

		expect(actual).toEqual(getExpectedVersions(actual));
	});
});
