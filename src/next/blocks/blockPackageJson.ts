import { z } from "zod";

import { base } from "../base.js";

export const blockPackageJson = base.createBlock({
	about: {
		name: "Package JSON",
	},
	addons: {
		// TODO: Find a zod package for this?
		properties: z
			.intersection(
				z.object({
					dependencies: z.record(z.string(), z.string()).optional(),
					devDependencies: z.record(z.string(), z.string()).optional(),
					files: z.array(z.string()).optional(),
					peerDependencies: z.record(z.string(), z.string()).optional(),
					scripts: z.record(z.string(), z.string()).optional(),
				}),
				z.record(z.string(), z.unknown()),
			)
			.default({}),
	},
	produce({ addons, options }) {
		return {
			commands: [
				{
					phase: 0, // TODO: ???
					script: "pnpm i",
				},
			],
			files: {
				"package.json": JSON.stringify({
					...Object.fromEntries(Object.entries(addons.properties)),
					author: { email: options.email.npm, name: options.author },
					bin: options.bin,
					description: options.description,
					files: [
						"package.json",
						"README.md",
						options.bin?.replace(/^\.\//, ""),
						...(addons.properties.files ?? []),
					]
						.filter(Boolean)
						.sort(),
					keywords: options.keywords?.flatMap((keyword) => keyword.split(/ /)),
					name: options.repository,
					repository: {
						type: "git",
						url: `https://github.com/${options.owner}/${options.repository}`,
					},
					type: "module",
					version: options.version ?? "0.0.0",
				}),
			},
		};
	},
});
