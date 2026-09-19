import { BaseOptions, base } from "./base.mjs";
import { blockAllContributors } from "./blocks/blockAllContributors.mjs";
import { blockAreTheTypesWrong } from "./blocks/blockAreTheTypesWrong.mjs";
import { blockCSpell } from "./blocks/blockCSpell.mjs";
import { blockCTATransitions } from "./blocks/blockCTATransitions.mjs";
import { blockCodecov } from "./blocks/blockCodecov.mjs";
import { blockContributingDocs } from "./blocks/blockContributingDocs.mjs";
import { blockContributorCovenant } from "./blocks/blockContributorCovenant.mjs";
import { blockDevelopmentDocs } from "./blocks/blockDevelopmentDocs.mjs";
import { blockESLint } from "./blocks/blockESLint.mjs";
import { blockESLintComments } from "./blocks/blockESLintComments.mjs";
import { blockESLintJSDoc } from "./blocks/blockESLintJSDoc.mjs";
import { blockESLintJSONC } from "./blocks/blockESLintJSONC.mjs";
import { blockESLintMarkdown } from "./blocks/blockESLintMarkdown.mjs";
import { blockESLintMarkdownLinks } from "./blocks/blockESLintMarkdownLinks.mjs";
import { blockESLintMoreStyling } from "./blocks/blockESLintMoreStyling.mjs";
import { blockESLintNode } from "./blocks/blockESLintNode.mjs";
import { blockESLintPackageJson } from "./blocks/blockESLintPackageJson.mjs";
import { blockESLintPerfectionist } from "./blocks/blockESLintPerfectionist.mjs";
import { blockESLintPlugin } from "./blocks/blockESLintPlugin.mjs";
import { blockESLintRegexp } from "./blocks/blockESLintRegexp.mjs";
import { blockESLintYML } from "./blocks/blockESLintYML.mjs";
import { blockExports } from "./blocks/blockExports.mjs";
import { blockFunding } from "./blocks/blockFunding.mjs";
import { blockGitHubActionsCI } from "./blocks/blockGitHubActionsCI.mjs";
import { blockGitHubIssueTemplates } from "./blocks/blockGitHubIssueTemplates.mjs";
import { blockGitHubPRTemplate } from "./blocks/blockGitHubPRTemplate.mjs";
import { blockGitignore } from "./blocks/blockGitignore.mjs";
import { blockKnip } from "./blocks/blockKnip.mjs";
import { blockMITLicense } from "./blocks/blockMITLicense.mjs";
import { blockNcc } from "./blocks/blockNcc.mjs";
import { blockNvmrc } from "./blocks/blockNvmrc.mjs";
import { blockOctoGuide } from "./blocks/blockOctoGuide.mjs";
import { blockOctoGuideStrict } from "./blocks/blockOctoGuideStrict.mjs";
import { blockPackageJson } from "./blocks/blockPackageJson.mjs";
import { blockPnpmDedupe } from "./blocks/blockPnpmDedupe.mjs";
import { blockPrettier } from "./blocks/blockPrettier.mjs";
import { blockPrettierPluginCurly } from "./blocks/blockPrettierPluginCurly.mjs";
import { blockPrettierPluginPackageJson } from "./blocks/blockPrettierPluginPackageJson.mjs";
import { blockPrettierPluginSentencesPerLine } from "./blocks/blockPrettierPluginSentencesPerLine.mjs";
import { blockPrettierPluginSh } from "./blocks/blockPrettierPluginSh.mjs";
import { blockREADME } from "./blocks/blockREADME.mjs";
import { blockReleaseIt } from "./blocks/blockReleaseIt.mjs";
import { blockRenovate } from "./blocks/blockRenovate.mjs";
import { blockSecurityDocs } from "./blocks/blockSecurityDocs.mjs";
import { blockSideEffects } from "./blocks/blockSideEffects.mjs";
import { blockTSDown } from "./blocks/blockTSDown.mjs";
import { blockTemplatedWith } from "./blocks/blockTemplatedWith.mjs";
import { blockTypeScript } from "./blocks/blockTypeScript.mjs";
import { blockVSCode } from "./blocks/blockVSCode.mjs";
import { blockVitest } from "./blocks/blockVitest.mjs";
import { blockWebExt } from "./blocks/blockWebExt.mjs";
import { blocks } from "./blocks/index.mjs";
import { template } from "./template.mjs";
import { presetCommon } from "./presets/common.mjs";
import { presetEverything } from "./presets/everything.mjs";
import { presetMinimal } from "./presets/minimal.mjs";
import { presets } from "./presets/index.mjs";
//#region src/index.d.ts
declare const createConfig: import("bingo").CreateTemplateConfig<{
  access: import("zod").ZodUnion<[import("zod").ZodLiteral<"public">, import("zod").ZodLiteral<"restricted">]>;
  author: import("zod").ZodOptional<import("zod").ZodString>;
  bin: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>]>>;
  contributors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
    avatar_url: import("zod").ZodString;
    contributions: import("zod").ZodArray<import("zod").ZodString, "many">;
    login: import("zod").ZodString;
    name: import("zod").ZodString;
    profile: import("zod").ZodString;
  }, "strip", import("zod").ZodTypeAny, {
    avatar_url: string;
    contributions: string[];
    login: string;
    name: string;
    profile: string;
  }, {
    avatar_url: string;
    contributions: string[];
    login: string;
    name: string;
    profile: string;
  }>, "many">>;
  description: import("zod").ZodDefault<import("zod").ZodString>;
  directory: import("zod").ZodString;
  documentation: import("zod").ZodObject<{
    development: import("zod").ZodOptional<import("zod").ZodString>;
    readme: import("zod").ZodObject<{
      additional: import("zod").ZodOptional<import("zod").ZodString>;
      explainer: import("zod").ZodOptional<import("zod").ZodString>;
      footnotes: import("zod").ZodOptional<import("zod").ZodString>;
      usage: import("zod").ZodOptional<import("zod").ZodString>;
    }, "strip", import("zod").ZodTypeAny, {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    }, {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    }>;
  }, "strip", import("zod").ZodTypeAny, {
    readme: {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    };
    development?: string | undefined;
  }, {
    readme: {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    };
    development?: string | undefined;
  }>;
  email: import("zod").ZodEffects<import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodObject<{
    github: import("zod").ZodString;
    npm: import("zod").ZodString;
  }, "strip", import("zod").ZodTypeAny, {
    github: string;
    npm: string;
  }, {
    github: string;
    npm: string;
  }>]>, {
    github: string;
    npm: string;
  }, string | {
    github: string;
    npm: string;
  }>;
  emoji: import("zod").ZodOptional<import("zod").ZodString>;
  existingLabels: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
    color: import("zod").ZodString;
    description: import("zod").ZodString;
    name: import("zod").ZodString;
  }, "strip", import("zod").ZodTypeAny, {
    name: string;
    description: string;
    color: string;
  }, {
    name: string;
    description: string;
    color: string;
  }>, "many">>;
  funding: import("zod").ZodOptional<import("zod").ZodString>;
  guide: import("zod").ZodOptional<import("zod").ZodObject<{
    href: import("zod").ZodString;
    title: import("zod").ZodString;
  }, "strip", import("zod").ZodTypeAny, {
    href: string;
    title: string;
  }, {
    href: string;
    title: string;
  }>>;
  keywords: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
  logo: import("zod").ZodOptional<import("zod").ZodObject<{
    alt: import("zod").ZodString;
    height: import("zod").ZodOptional<import("zod").ZodNumber>;
    src: import("zod").ZodString;
    width: import("zod").ZodOptional<import("zod").ZodNumber>;
  }, "strip", import("zod").ZodTypeAny, {
    alt: string;
    src: string;
    height?: number | undefined;
    width?: number | undefined;
  }, {
    alt: string;
    src: string;
    height?: number | undefined;
    width?: number | undefined;
  }>>;
  node: import("zod").ZodObject<{
    minimum: import("zod").ZodString;
    pinned: import("zod").ZodOptional<import("zod").ZodString>;
  }, "strip", import("zod").ZodTypeAny, {
    minimum: string;
    pinned?: string | undefined;
  }, {
    minimum: string;
    pinned?: string | undefined;
  }>;
  owner: import("zod").ZodString;
  packageData: import("zod").ZodOptional<import("zod").ZodObject<{
    dependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
    devDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
    peerDependencies: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
    peerDependenciesMeta: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>>;
    scripts: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodOptional<import("zod").ZodString>>>;
  }, "strip", import("zod").ZodTypeAny, {
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, unknown> | undefined;
    scripts?: Record<string, string | undefined> | undefined;
  }, {
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, unknown> | undefined;
    scripts?: Record<string, string | undefined> | undefined;
  }>>;
  pnpm: import("zod").ZodOptional<import("zod").ZodString>;
  repository: import("zod").ZodString;
  rulesetId: import("zod").ZodOptional<import("zod").ZodString>;
  title: import("zod").ZodString;
  type: import("zod").ZodOptional<import("zod").ZodUnion<[import("zod").ZodLiteral<"commonjs">, import("zod").ZodLiteral<"module">]>>;
  version: import("zod").ZodOptional<import("zod").ZodString>;
  words: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
  workflowsVersions: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
    hash: import("zod").ZodOptional<import("zod").ZodString>;
    pinned: import("zod").ZodOptional<import("zod").ZodBoolean>;
  }, "strip", import("zod").ZodTypeAny, {
    pinned?: boolean | undefined;
    hash?: string | undefined;
  }, {
    pinned?: boolean | undefined;
    hash?: string | undefined;
  }>>>>;
} & import("bingo-stratum/lib/types/templates.js").StratumTemplateOptionsShape, import("bingo-stratum").StratumRefinements<{
  access: "public" | "restricted";
  description: string;
  directory: string;
  documentation: {
    readme: {
      additional?: string | undefined;
      explainer?: string | undefined;
      footnotes?: string | undefined;
      usage?: string | undefined;
    };
    development?: string | undefined;
  };
  email: {
    github: string;
    npm: string;
  };
  title: string;
  node: {
    minimum: string;
    pinned?: string | undefined;
  };
  owner: string;
  repository: string;
  type?: "commonjs" | "module" | undefined;
  author?: string | undefined;
  bin?: string | Record<string, string> | undefined;
  contributors?: {
    avatar_url: string;
    contributions: string[];
    login: string;
    name: string;
    profile: string;
  }[] | undefined;
  emoji?: string | undefined;
  existingLabels?: {
    name: string;
    description: string;
    color: string;
  }[] | undefined;
  funding?: string | undefined;
  guide?: {
    href: string;
    title: string;
  } | undefined;
  keywords?: string[] | undefined;
  logo?: {
    alt: string;
    src: string;
    height?: number | undefined;
    width?: number | undefined;
  } | undefined;
  packageData?: {
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, unknown> | undefined;
    scripts?: Record<string, string | undefined> | undefined;
  } | undefined;
  pnpm?: string | undefined;
  rulesetId?: string | undefined;
  version?: string | undefined;
  words?: string[] | undefined;
  workflowsVersions?: Record<string, Record<string, {
    pinned?: boolean | undefined;
    hash?: string | undefined;
  }>> | undefined;
}>>;
//#endregion
export { BaseOptions, base, blockAllContributors, blockAreTheTypesWrong, blockCSpell, blockCTATransitions, blockCodecov, blockContributingDocs, blockContributorCovenant, blockDevelopmentDocs, blockESLint, blockESLintComments, blockESLintJSDoc, blockESLintJSONC, blockESLintMarkdown, blockESLintMarkdownLinks, blockESLintMoreStyling, blockESLintNode, blockESLintPackageJson, blockESLintPerfectionist, blockESLintPlugin, blockESLintRegexp, blockESLintYML, blockExports, blockFunding, blockGitHubActionsCI, blockGitHubIssueTemplates, blockGitHubPRTemplate, blockGitignore, blockKnip, blockMITLicense, blockNcc, blockNvmrc, blockOctoGuide, blockOctoGuideStrict, blockPackageJson, blockPnpmDedupe, blockPrettier, blockPrettierPluginCurly, blockPrettierPluginPackageJson, blockPrettierPluginSentencesPerLine, blockPrettierPluginSh, blockREADME, blockReleaseIt, blockRenovate, blockSecurityDocs, blockSideEffects, blockTSDown, blockTemplatedWith, blockTypeScript, blockVSCode, blockVitest, blockWebExt, blocks, createConfig, presetCommon, presetEverything, presetMinimal, presets, template };