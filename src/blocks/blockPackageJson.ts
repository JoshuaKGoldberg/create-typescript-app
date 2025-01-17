import * as htmlToText from "html-to-text";
import removeUndefinedObjects from "remove-undefined-objects";
import sortPackageJson from "sort-package-json";
import { z } from "zod";

import { base } from "../base.js";
import { CommandPhase } from "./phases.js";

export const blockPackageJson = base.createBlock({
	about: {
		name: "Package JSON",
	},
	addons: {
		cleanupCommands: z.array(z.string()).default([]),
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
	migrate() {
		return {
			scripts: [
				{
					commands: ["rm package-lock.json yarn.lock"],
					phase: CommandPhase.Migrations,
					silent: true,
				},
			],
		};
	},
	produce({ addons, offline, options }) {
		const dependencies = {
			...options.packageData?.dependencies,
			...addons.properties.dependencies,
		};
		const devDependencies = {
			...options.packageData?.devDependencies,
			...addons.properties.devDependencies,
		};
		const description = htmlToText.convert(options.description, {
			wordwrap: false,
		});

		return {
			files: {
				"package.json": sortPackageJson(
					JSON.stringify(
						removeUndefinedObjects({
							...addons.properties,
							author: { email: options.email.npm, name: options.author },
							bin: options.bin,
							dependencies: Object.keys(dependencies).length
								? dependencies
								: undefined,
							description,
							devDependencies: Object.keys(devDependencies).length
								? devDependencies
								: undefined,
							...(options.node && {
								engines: {
									node: `>=${options.node.minimum}`,
								},
							}),
							files: [
								options.bin?.replace(/^\.\//, ""),
								...(addons.properties.files ?? []),
								"package.json",
								"README.md",
							]
								.filter(Boolean)
								.sort(),
							keywords: options.keywords?.flatMap((keyword) =>
								keyword.split(/ /),
							),
							license: "MIT",
							main: "lib/index.js",
							name: options.repository,
							repository: {
								type: "git",
								url: `git+https://github.com/${options.owner}/${options.repository}.git`,
							},
							scripts: {
								...options.packageData?.scripts,
								...addons.properties.scripts,
							},
							type: "module",
							version: options.version ?? "0.0.0",
						}),
					),
				),
			},
			scripts: [
				{
					commands: [
						offline ? "pnpm install --offline" : "pnpm install",
						...addons.cleanupCommands,
					],
					phase: CommandPhase.Install,
				},
			],
		};
	},
});
