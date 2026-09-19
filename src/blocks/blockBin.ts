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
	// Bin files are bespoke per repository, so an existing one is preserved as-is.
	// The starter contents below only apply when creating a new repository.
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
		if (!primaryBin) {
			return {};
		}

		const segments = primaryBin.split("/");
		const toRoot = "../".repeat(segments.length - 1);
		const contents =
			addons.contents ??
			`#!/usr/bin/env node
import "${toRoot}lib/index.mjs";
`;

		return {
			files: segments.reduceRight<CreatedDirectory | CreatedFileEntry>(
				(nested, segment) => ({ [segment]: nested }),
				[contents, { executable: true }],
			) as CreatedDirectory,
		};
	},
});
