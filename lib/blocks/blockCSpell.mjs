import { getPackageDependencies } from "../data/packageData.mjs";
import { base } from "../base.mjs";
import { intakeFile } from "./intake/intakeFile.mjs";
import { resolveBin } from "../utils/resolveBin.mjs";
import { CommandPhase } from "./phases.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.mjs";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.mjs";
import { blockVSCode } from "./blockVSCode.mjs";
import { z } from "zod";
import JSON5 from "json5";
import { getObjectStringsDeep } from "object-strings-deep";
//#region src/blocks/blockCSpell.ts
const filesGlob = `"**" ".github/**/*"`;
const addons = {
	ignorePaths: z.array(z.string()).default([]),
	words: z.array(z.string()).default([])
};
const zAddons = z.object(addons);
const blockCSpell = base.createBlock({
	about: { name: "CSpell" },
	addons,
	intake({ files }) {
		const cspellJson = intakeFile(files, ["cspell.json"]);
		if (!cspellJson) return;
		const { data } = zAddons.safeParse(JSON5.parse(cspellJson[0]));
		if (!data) return;
		return data;
	},
	produce({ addons, options }) {
		const { ignorePaths, words } = addons;
		const allWords = Array.from(/* @__PURE__ */ new Set([...options.words ?? [], ...words])).sort();
		return {
			addons: [
				blockDevelopmentDocs({ sections: { Linting: { contents: { items: [`- \`pnpm lint:spelling\` ([cspell](https://cspell.org)): Spell checks across all source files`] } } } }),
				blockVSCode({ extensions: ["streetsidesoftware.code-spell-checker"] }),
				blockGitHubActionsCI({ jobs: [{
					name: "Lint Spelling",
					steps: [{ run: "pnpm lint:spelling" }]
				}] }),
				blockPackageJson({ properties: {
					devDependencies: getPackageDependencies("cspell"),
					scripts: { "lint:spelling": `cspell ${filesGlob}` }
				} })
			],
			files: { "cspell.json": JSON.stringify({
				dictionaries: [
					"npm",
					"node",
					"typescript"
				],
				ignorePaths: Array.from(/* @__PURE__ */ new Set([
					".github",
					"CHANGELOG.md",
					"lib",
					"node_modules",
					"pnpm-lock.yaml",
					...ignorePaths
				])).sort(),
				...allWords.length && { words: allWords }
			}) }
		};
	},
	setup({ options }) {
		const wordArgs = getObjectStringsDeep(options).map((word) => `--words "${word.replaceAll(`"`, " ")}"`).join(" ");
		return { scripts: [{
			commands: [`node ${resolveBin("cspell-populate-words/bin/index.mjs")} ${wordArgs}`],
			phase: CommandPhase.Process
		}] };
	},
	transition() {
		return { addons: [blockRemoveWorkflows({ workflows: ["lint-spelling", "spelling"] })] };
	}
});
//#endregion
export { blockCSpell };
