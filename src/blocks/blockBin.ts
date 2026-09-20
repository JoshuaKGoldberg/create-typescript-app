import { CreatedDirectory, CreatedFileEntry } from "bingo-fs";
import { z } from "zod";

import { base } from "../base.ts";
import { getPrimaryBin } from "./bin/getPrimaryBin.ts";
import { intakeFile } from "./intake/intakeFile.ts";

export const blockBin = base.createBlock({
	about: {
		name: "Bin",
	},
	addons: {
		contents: z.string().optional(),
	},
	intake({ files, options }) {
		const primaryBin = getPrimaryBin(options.bin, options.repository);
		if (!primaryBin) {
			return undefined;
		}

		const existing = intakeFile(files, primaryBin.split("/"));

		return existing ? { contents: existing[0] } : undefined;
	},
	produce({ addons, options }) {
		const primaryBin = getPrimaryBin(options.bin, options.repository);

		// A bin inside the build output is produced by the build, not by this block.
		if (!primaryBin || primaryBin.startsWith("dist/")) {
			return {};
		}

		const segments = primaryBin.split("/");
		const toRoot = "../".repeat(segments.length - 1);
		const contents = (
			addons.contents ??
			`#!/usr/bin/env node
import "${toRoot}dist/index.mjs";
`
		).replaceAll(/((?:\.\.\/)+)lib\//gu, "$1dist/");

		return {
			files: segments.reduceRight<CreatedDirectory | CreatedFileEntry>(
				(nested, segment) => ({ [segment]: nested }),
				[contents, { executable: true }],
			) as CreatedDirectory,
		};
	},
});
