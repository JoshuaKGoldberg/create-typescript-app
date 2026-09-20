import { base } from "../base.ts";
import { blockCSpell } from "../blocks/blockCSpell.ts";
import { blockESLintComments } from "../blocks/blockESLintComments.ts";
import { blockESLintJSDoc } from "../blocks/blockESLintJSDoc.ts";
import { blockESLintJSONC } from "../blocks/blockESLintJSONC.ts";
import { blockESLintMarkdown } from "../blocks/blockESLintMarkdown.ts";
import { blockESLintMarkdownLinks } from "../blocks/blockESLintMarkdownLinks.ts";
import { blockESLintMoreStyling } from "../blocks/blockESLintMoreStyling.ts";
import { blockESLintNode } from "../blocks/blockESLintNode.ts";
import { blockESLintPackageJson } from "../blocks/blockESLintPackageJson.ts";
import { blockESLintPerfectionist } from "../blocks/blockESLintPerfectionist.ts";
import { blockESLintRegexp } from "../blocks/blockESLintRegexp.ts";
import { blockESLintYML } from "../blocks/blockESLintYML.ts";
import { blockKnip } from "../blocks/blockKnip.ts";
import { blockNvmrc } from "../blocks/blockNvmrc.ts";
import { blockOctoGuideStrict } from "../blocks/blockOctoGuideStrict.ts";
import { blockPnpmDedupe } from "../blocks/blockPnpmDedupe.ts";
import { blockPrettierPluginCurly } from "../blocks/blockPrettierPluginCurly.ts";
import { blockPrettierPluginPackageJson } from "../blocks/blockPrettierPluginPackageJson.ts";
import { blockPrettierPluginPaddingLines } from "../blocks/blockPrettierPluginPaddingLines.ts";
import { blockPrettierPluginSentencesPerLine } from "../blocks/blockPrettierPluginSentencesPerLine.ts";
import { blockPrettierPluginSh } from "../blocks/blockPrettierPluginSh.ts";
import { blockRenovate } from "../blocks/blockRenovate.ts";
import { blockVSCode } from "../blocks/blockVSCode.ts";
import { presetCommon } from "./common.ts";

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
		blockVSCode,
	],
});
