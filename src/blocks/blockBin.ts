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
		entry: z.string().optional(),
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
		const { entry = "dist/index.mjs" } = addons;
		const outDir = entry.slice(0, entry.lastIndexOf("/"));
		const primaryBin = getPrimaryBin(options.bin, options.repository);

		// A bin inside the build output is produced by the build, not by this block.
		if (!primaryBin || primaryBin.startsWith(`${outDir}/`)) {
			return {};
		}

		const segments = primaryBin.split("/");
		const toRoot = "../".repeat(segments.length - 1);
		const contents = (
			addons.contents ??
			`#!/usr/bin/env node
import "${toRoot}${entry}";
`
		)
			// lib was the default before build output moved to tsdown's dist
			.replaceAll(/((?:\.\.\/)+)lib\//gu, `$1${outDir}/`);

		return {
			files: segments.reduceRight<CreatedDirectory | CreatedFileEntry>(
				(nested, segment) => ({ [segment]: nested }),
				[contents, { executable: true }],
			) as CreatedDirectory,
		};
	},
});
