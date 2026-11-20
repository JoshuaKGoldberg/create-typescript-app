import { base } from "../base.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockRemoveFiles } from "./blockRemoveFiles.ts";

export const blockPnpmDevEngines = base.createBlock({
	about: {
		name: "pnpm Dev Engines",
	},
	produce({ options }) {
		return {
			addons: [
				...(options.node.pinned
					? [
							blockPackageJson({
								properties: {
									devEngines: {
										runtime: {
											name: "node",
											onFail: "download",
											version: options.node.pinned,
										},
									},
								},
							}),
						]
					: []),
				blockRemoveFiles({
					files: [".nvmrc"],
				}),
			],
		};
	},
});
