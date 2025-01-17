import { base } from "../base.js";
import { blockCSpell } from "../blocks/blockCSpell.js";
import { blockESLintComments } from "../blocks/blockESLintComments.js";
import { blockESLintJSDoc } from "../blocks/blockESLintJSDoc.js";
import { blockESLintJSONC } from "../blocks/blockESLintJSONC.js";
import { blockESLintMarkdown } from "../blocks/blockESLintMarkdown.js";
import { blockESLintMoreStyling } from "../blocks/blockESLintMoreStyling.js";
import { blockESLintNode } from "../blocks/blockESLintNode.js";
import { blockESLintPackageJson } from "../blocks/blockESLintPackageJson.js";
import { blockESLintPerfectionist } from "../blocks/blockESLintPerfectionist.js";
import { blockESLintRegexp } from "../blocks/blockESLintRegexp.js";
import { blockESLintYML } from "../blocks/blockESLintYML.js";
import { blockKnip } from "../blocks/blockKnip.js";
import { blockMarkdownlint } from "../blocks/blockMarkdownlint.js";
import { blockNvmrc } from "../blocks/blockNvmrc.js";
import { blockPnpmDedupe } from "../blocks/blockPnpmDedupe.js";
import { blockPRCompliance } from "../blocks/blockPRCompliance.js";
import { blockPrettierPluginCurly } from "../blocks/blockPrettierPluginCurly.js";
import { blockPrettierPluginPackageJson } from "../blocks/blockPrettierPluginPackageJson.js";
import { blockPrettierPluginSh } from "../blocks/blockPrettierPluginSh.js";
import { blockRenovate } from "../blocks/blockRenovate.js";
import { blockVSCode } from "../blocks/blockVSCode.js";
import { presetCommon } from "./common.js";

export const presetEverything = base.createPreset({
	about: {
		description:
			"The most comprehensive tooling imaginable: sorting, spellchecking, and more!",
		name: "Everything",
	},
	blocks: [
		...presetCommon.blocks,
		blockCSpell,
		blockESLintComments,
		blockESLintJSDoc,
		blockESLintJSONC,
		blockESLintMarkdown,
		blockESLintMoreStyling,
		blockESLintNode,
		blockESLintPackageJson,
		blockESLintPerfectionist,
		blockESLintRegexp,
		blockESLintYML,
		blockKnip,
		blockMarkdownlint,
		blockNvmrc,
		blockPnpmDedupe,
		blockPRCompliance,
		blockPrettierPluginCurly,
		blockPrettierPluginPackageJson,
		blockPrettierPluginSh,
		blockRenovate,
		blockVSCode,
	],
});
