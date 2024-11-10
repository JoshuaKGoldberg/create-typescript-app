import { BlockPhase, MetadataFileType } from "create";

import { schema } from "../schema.js";
import { sortObject } from "../utils/sortObject.js";

export const blockPackageJson = schema.createBlock({
	about: {
		name: "Package JSON",
	},
	phase: BlockPhase.Package,
	produce({ created, options }) {
		return {
			files: {
				"package.json": JSON.stringify(
					sortObject({
						...Object.fromEntries(
							Object.entries(created.package).map(([key, value]) =>
								typeof value === "object" && value
									? [key, sortObject(value)]
									: [key, value],
							),
						),
						author: { email: options.email.npm, name: options.author },
						bin: options.bin,
						description: options.description,
						files: [
							"package.json",
							"README.md",
							options.bin?.replace(/^\.\//, ""),
							...created.metadata
								.filter(
									(value) =>
										value.type === MetadataFileType.Built ||
										value.type === MetadataFileType.License,
								)
								.map((value) => value.glob),
						]
							.filter(Boolean)
							.sort(),
						keywords: options.keywords?.flatMap((keyword) =>
							keyword.split(/ /),
						),
						name: options.repository,
						repository: {
							type: "git",
							url: `https://github.com/${options.owner}/${options.repository}`,
						},
						type: "module",
						version: options.version ?? "0.0.0",
					}),
				),
			},
		};
	},
});
