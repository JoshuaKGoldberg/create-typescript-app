import { base } from "../base.mjs";
import { blockVSCode } from "../blocks/blockVSCode.mjs";
import { blockCSpell } from "../blocks/blockCSpell.mjs";
import { blockESLintMoreStyling } from "../blocks/blockESLintMoreStyling.mjs";
import { blockKnip } from "../blocks/blockKnip.mjs";
import { presetCommon } from "./common.mjs";
import { blockESLintComments } from "../blocks/blockESLintComments.mjs";
import { blockESLintJSDoc } from "../blocks/blockESLintJSDoc.mjs";
import { blockESLintJSONC } from "../blocks/blockESLintJSONC.mjs";
import { blockESLintMarkdown } from "../blocks/blockESLintMarkdown.mjs";
import { blockESLintMarkdownLinks } from "../blocks/blockESLintMarkdownLinks.mjs";
import { blockESLintNode } from "../blocks/blockESLintNode.mjs";
import { blockESLintPackageJson } from "../blocks/blockESLintPackageJson.mjs";
import { blockESLintPerfectionist } from "../blocks/blockESLintPerfectionist.mjs";
import { blockESLintRegexp } from "../blocks/blockESLintRegexp.mjs";
import { blockESLintYML } from "../blocks/blockESLintYML.mjs";
import { blockNvmrc } from "../blocks/blockNvmrc.mjs";
import { blockOctoGuideStrict } from "../blocks/blockOctoGuideStrict.mjs";
import { blockPnpmDedupe } from "../blocks/blockPnpmDedupe.mjs";
import { blockPrettierPluginCurly } from "../blocks/blockPrettierPluginCurly.mjs";
import { blockPrettierPluginPackageJson } from "../blocks/blockPrettierPluginPackageJson.mjs";
import { blockPrettierPluginPaddingLines } from "../blocks/blockPrettierPluginPaddingLines.mjs";
import { blockPrettierPluginSentencesPerLine } from "../blocks/blockPrettierPluginSentencesPerLine.mjs";
import { blockPrettierPluginSh } from "../blocks/blockPrettierPluginSh.mjs";
import { blockRenovate } from "../blocks/blockRenovate.mjs";
//#region src/presets/everything.ts
const presetEverything = base.createPreset({
	about: {
		description: "The most comprehensive tooling imaginable: sorting, spellchecking, and more!",
		name: "Everything"
	},
	blocks: [
		...presetCommon.blocks,
		blockCSpell,
		blockESLintComments,
		blockESLintJSDoc,
		blockESLintJSONC,
		blockESLintMarkdown,
		blockESLintMarkdownLinks,
		blockESLintMoreStyling,
		blockESLintNode,
		blockESLintPackageJson,
		blockESLintPerfectionist,
		blockESLintRegexp,
		blockESLintYML,
		blockKnip,
		blockNvmrc,
		blockPnpmDedupe,
		blockOctoGuideStrict,
		blockPrettierPluginCurly,
		blockPrettierPluginPackageJson,
		blockPrettierPluginPaddingLines,
		blockPrettierPluginSentencesPerLine,
		blockPrettierPluginSh,
		blockRenovate,
		blockVSCode
	]
});
//#endregion
export { presetEverything };
