import { blockAllContributors } from "./blockAllContributors.mjs";
import { blockAreTheTypesWrong } from "./blockAreTheTypesWrong.mjs";
import { blockCSpell } from "./blockCSpell.mjs";
import { blockCTATransitions } from "./blockCTATransitions.mjs";
import { blockCodecov } from "./blockCodecov.mjs";
import { blockContributingDocs } from "./blockContributingDocs.mjs";
import { blockContributorCovenant } from "./blockContributorCovenant.mjs";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.mjs";
import { blockESLint } from "./blockESLint.mjs";
import { blockESLintComments } from "./blockESLintComments.mjs";
import { blockESLintJSDoc } from "./blockESLintJSDoc.mjs";
import { blockESLintJSONC } from "./blockESLintJSONC.mjs";
import { blockESLintMarkdown } from "./blockESLintMarkdown.mjs";
import { blockESLintMarkdownLinks } from "./blockESLintMarkdownLinks.mjs";
import { blockESLintMoreStyling } from "./blockESLintMoreStyling.mjs";
import { blockESLintNode } from "./blockESLintNode.mjs";
import { blockESLintPackageJson } from "./blockESLintPackageJson.mjs";
import { blockESLintPerfectionist } from "./blockESLintPerfectionist.mjs";
import { blockESLintPlugin } from "./blockESLintPlugin.mjs";
import { blockESLintRegexp } from "./blockESLintRegexp.mjs";
import { blockESLintYML } from "./blockESLintYML.mjs";
import { blockExports } from "./blockExports.mjs";
import { blockFunding } from "./blockFunding.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
import { blockGitHubIssueTemplates } from "./blockGitHubIssueTemplates.mjs";
import { blockGitHubPRTemplate } from "./blockGitHubPRTemplate.mjs";
import { blockGitignore } from "./blockGitignore.mjs";
import { blockKnip } from "./blockKnip.mjs";
import { blockMITLicense } from "./blockMITLicense.mjs";
import { blockNcc } from "./blockNcc.mjs";
import { blockNvmrc } from "./blockNvmrc.mjs";
import { blockOctoGuide } from "./blockOctoGuide.mjs";
import { blockOctoGuideStrict } from "./blockOctoGuideStrict.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockPnpmDedupe } from "./blockPnpmDedupe.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
import { blockPrettierPluginCurly } from "./blockPrettierPluginCurly.mjs";
import { blockPrettierPluginPackageJson } from "./blockPrettierPluginPackageJson.mjs";
import { blockPrettierPluginSentencesPerLine } from "./blockPrettierPluginSentencesPerLine.mjs";
import { blockPrettierPluginSh } from "./blockPrettierPluginSh.mjs";
import { blockREADME } from "./blockREADME.mjs";
import { blockReleaseIt } from "./blockReleaseIt.mjs";
import { blockRenovate } from "./blockRenovate.mjs";
import { blockSecurityDocs } from "./blockSecurityDocs.mjs";
import { blockSideEffects } from "./blockSideEffects.mjs";
import { blockTSDown } from "./blockTSDown.mjs";
import { blockTemplatedWith } from "./blockTemplatedWith.mjs";
import { blockTypeScript } from "./blockTypeScript.mjs";
import { blockVSCode } from "./blockVSCode.mjs";
import { blockVitest } from "./blockVitest.mjs";
import { blockWebExt } from "./blockWebExt.mjs";
//#region src/blocks/index.d.ts
declare const blocks: {
  blockAllContributors: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockAreTheTypesWrong: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockCodecov: import("bingo-stratum").BlockWithAddons<{
    env?: Record<string, string> | undefined;
  }, {
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
  }>;
  blockContributingDocs: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockContributorCovenant: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockCSpell: import("bingo-stratum").BlockWithAddons<{
    words: string[];
    ignorePaths: string[];
  }, {
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
  }>;
  blockDevelopmentDocs: import("bingo-stratum").BlockWithAddons<{
    hints: string[];
    sections: Record<string, {
      contents?: string | {
        after?: string[] | undefined;
        before?: string | undefined;
        items?: string[] | undefined;
        plural?: string | undefined;
      } | undefined;
      innerSections?: {
        contents: string;
        heading: string;
      }[] | undefined;
    }>;
  }, {
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
  }>;
  blockESLint: import("bingo-stratum").BlockWithAddons<{
    explanations: string[];
    extensions: {
      files: string[];
      extends?: string[] | undefined;
      languageOptions?: unknown;
      linterOptions?: unknown;
      plugins?: Record<string, string> | undefined;
      rules?: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]> | {
        entries: Record<string, "off" | "error" | "warn" | ["error" | "warn", unknown] | ["error" | "warn", unknown, unknown]>;
        comment?: string | undefined;
      }[] | undefined;
      settings?: Record<string, unknown> | undefined;
    }[];
    ignores: string[];
    imports: {
      source: string | {
        version: string;
        packageName: string;
      };
      specifier: string;
      types?: boolean | undefined;
    }[];
    beforeLint?: string | undefined;
  }, {
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
  }>;
  blockESLintComments: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintJSDoc: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintJSONC: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintMarkdown: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintMarkdownLinks: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintMoreStyling: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintNode: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintPackageJson: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintPerfectionist: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintPlugin: import("bingo-stratum").BlockWithAddons<{
    configEmoji?: [string, string][] | undefined;
  }, {
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
  }>;
  blockESLintRegexp: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockESLintYML: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockExports: import("bingo-stratum").BlockWithAddons<{
    runArgs: string[];
    filePath?: string | undefined;
  }, {
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
  }>;
  blockFunding: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockGitHubActionsCI: import("bingo-stratum").BlockWithAddons<{
    jobs?: {
      name: string;
      steps: ({
        with?: Record<string, string> | undefined;
        env?: Record<string, string> | undefined;
        if?: string | undefined;
      } & ({
        run: string;
      } | {
        uses: string;
      }))[];
      checkoutWith?: Record<string, string> | undefined;
      if?: string | undefined;
    }[] | undefined;
  }, {
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
  }>;
  blockGitHubIssueTemplates: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockGitHubPRTemplate: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockGitignore: import("bingo-stratum").BlockWithAddons<{
    ignores: string[];
  }, {
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
  }>;
  blockKnip: import("bingo-stratum").BlockWithAddons<{
    entry?: string[] | undefined;
    ignoreDependencies?: string[] | undefined;
    project?: string[] | undefined;
  }, {
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
  }>;
  blockMITLicense: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockNcc: import("bingo-stratum").BlockWithAddons<{
    entry?: string | undefined;
  }, {
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
  }>;
  blockNvmrc: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockOctoGuide: import("bingo-stratum").BlockWithAddons<{
    config?: "strict" | "recommended" | undefined;
  }, {
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
  }>;
  blockOctoGuideStrict: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockPackageJson: import("bingo-stratum").BlockWithAddons<{
    properties: {
      type?: "commonjs" | "module" | undefined;
      author?: string | {
        name: string;
        url?: string | undefined;
        email?: string | undefined;
      } | undefined;
      bin?: string | Record<string, string> | undefined;
      name?: string | undefined;
      contributors?: (string | {
        name: string;
        url?: string | undefined;
        email?: string | undefined;
      })[] | undefined;
      description?: string | undefined;
      funding?: string | {
        url: string;
        type?: string | undefined;
      } | (string | {
        url: string;
        type?: string | undefined;
      })[] | undefined;
      keywords?: string[] | undefined;
      dependencies?: Record<string, string> | undefined;
      devDependencies?: Record<string, string> | undefined;
      peerDependencies?: Record<string, string> | undefined;
      peerDependenciesMeta?: Record<string, {
        optional: boolean;
      }> | undefined;
      scripts?: Record<string, string | undefined> | undefined;
      repository?: string | {
        type: string;
        url: string;
        directory?: string | undefined;
      } | undefined;
      module?: string | undefined;
      version?: string | undefined;
      engines?: Record<string, string> | undefined;
      packageManager?: string | undefined;
      files?: string[] | undefined;
      types?: string | undefined;
      imports?: Record<string, unknown> | undefined;
      license?: string | undefined;
      config?: Record<string, unknown> | undefined;
      private?: boolean | undefined;
      homepage?: string | undefined;
      maintainers?: (string | {
        name: string;
        url?: string | undefined;
        email?: string | undefined;
      })[] | undefined;
      main?: string | undefined;
      bugs?: string | {
        url?: string | undefined;
        email?: string | undefined;
      } | undefined;
      browser?: string | Record<string, string | boolean> | undefined;
      man?: string | string[] | undefined;
      directories?: Record<string, string> | undefined;
      bundleDependencies?: boolean | string[] | undefined;
      bundledDependencies?: boolean | string[] | undefined;
      optionalDependencies?: Record<string, string> | undefined;
      overrides?: Record<string, unknown> | undefined;
      os?: string[] | undefined;
      cpu?: string[] | undefined;
      publishConfig?: Record<string, unknown> | undefined;
      workspaces?: string[] | undefined;
      deprecated?: string | undefined;
      typings?: string | undefined;
      typesVersions?: Record<string, Record<string, string[]>> | undefined;
      sideEffects?: boolean | string[] | undefined;
      exports?: string | string[] | Record<string, unknown> | null | undefined;
    } & {
      [k: string]: unknown;
    };
    cleanupCommands: string[];
  }, {
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
  }>;
  blockPnpmDedupe: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockPrettier: import("bingo-stratum").BlockWithAddons<{
    plugins: string[];
    ignores: string[];
    overrides: {
      options: {
        parser: string;
      };
      files: string;
    }[];
    runBefore: string[];
  }, {
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
  }>;
  blockPrettierPluginCurly: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockPrettierPluginPackageJson: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockPrettierPluginSentencesPerLine: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockPrettierPluginSh: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockREADME: import("bingo-stratum").BlockWithAddons<{
    sections: string[];
    badges: {
      alt: string;
      src: string;
      href?: string | undefined;
      comments?: {
        after: string;
        before: string;
      } | undefined;
    }[];
    defaultUsage: string[];
    notices: string[];
  }, {
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
  }>;
  blockReleaseIt: import("bingo-stratum").BlockWithAddons<{
    builders: {
      run: string;
      order: number;
    }[];
  }, {
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
  }>;
  blockRenovate: import("bingo-stratum").BlockWithAddons<{
    ignoreDeps: string[];
  }, {
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
  }>;
  blockSecurityDocs: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockSideEffects: import("bingo-stratum").BlockWithAddons<{
    sideEffects?: boolean | string[] | undefined;
  }, {
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
  }>;
  blockTemplatedWith: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
  blockTSDown: import("bingo-stratum").BlockWithAddons<{
    properties: Record<string, unknown>;
    entry: string[];
    runInCI: string[];
  }, {
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
  }>;
  blockTypeScript: import("bingo-stratum").BlockWithAddons<{
    compilerOptions?: {
      allowArbitraryExtensions?: boolean | undefined;
      allowImportingTsExtensions?: boolean | undefined;
      allowJs?: boolean | undefined;
      allowSyntheticDefaultImports?: boolean | undefined;
      allowUmdGlobalAccess?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      alwaysStrict?: boolean | undefined;
      baseUrl?: string | undefined;
      charset?: string | undefined;
      checkJs?: boolean | undefined;
      customConditions?: string[] | undefined;
      declaration?: boolean | undefined;
      declarationDir?: string | undefined;
      declarationMap?: boolean | undefined;
      disableReferencedProjectLoad?: boolean | undefined;
      disableSizeLimit?: boolean | undefined;
      disableSolutionSearching?: boolean | undefined;
      disableSourceOfProjectReferenceRedirect?: boolean | undefined;
      downlevelIteration?: boolean | undefined;
      emitBOM?: boolean | undefined;
      emitDeclarationOnly?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | undefined;
      esModuleInterop?: boolean | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      forceConsistentCasingInFileNames?: boolean | undefined;
      ignoreDeprecations?: string | undefined;
      importHelpers?: boolean | undefined;
      importsNotUsedAsValues?: "error" | "preserve" | "remove" | undefined;
      inlineSourceMap?: boolean | undefined;
      inlineSources?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      isolatedModules?: boolean | undefined;
      jsx?: "preserve" | "none" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      keyofStringsOnly?: boolean | undefined;
      lib?: string[] | undefined;
      libReplacement?: boolean | undefined;
      locale?: string | undefined;
      mapRoot?: string | undefined;
      maxNodeModuleJsDepth?: number | undefined;
      module?: "preserve" | "none" | "amd" | "AMD" | "commonjs" | "CommonJS" | "es2015" | "ES2015" | "es2020" | "ES2020" | "es2022" | "ES2022" | "es6" | "ES6" | "esnext" | "ESNext" | "node16" | "Node16" | "node18" | "Node18" | "nodenext" | "NodeNext" | "None" | "Preserve" | "system" | "System" | "umd" | "UMD" | undefined;
      moduleDetection?: "auto" | "force" | "legacy" | undefined;
      moduleResolution?: "node16" | "Node16" | "nodenext" | "NodeNext" | "bundler" | "Bundler" | "classic" | "Classic" | "node" | "Node" | "node10" | "Node10" | "NodeJs" | undefined;
      moduleSuffixes?: string[] | undefined;
      newLine?: "crlf" | "lf" | undefined;
      noCheck?: boolean | undefined;
      noEmit?: boolean | undefined;
      noEmitHelpers?: boolean | undefined;
      noEmitOnError?: boolean | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noStrictGenericChecks?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | undefined;
      noImplicitUseStrict?: boolean | undefined;
      noLib?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noResolve?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      out?: string | undefined;
      outDir?: string | undefined;
      outFile?: string | undefined;
      paths?: Record<string, string> | undefined;
      preserveConstEnums?: boolean | undefined;
      preserveSymlinks?: boolean | undefined;
      composite?: boolean | undefined;
      incremental?: boolean | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      preserveValueImports?: boolean | undefined;
      project?: string | undefined;
      reactNamespace?: string | undefined;
      removeComments?: boolean | undefined;
      resolvePackageJsonExports?: boolean | undefined;
      resolvePackageJsonImports?: boolean | undefined;
      rewriteRelativeImportExtensions?: boolean | undefined;
      rootDir?: string | undefined;
      rootDirs?: string[] | undefined;
      skipDefaultLibCheck?: boolean | undefined;
      skipLibCheck?: boolean | undefined;
      sourceMap?: boolean | undefined;
      sourceRoot?: string | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      stripInternal?: boolean | undefined;
      tsBuildInfoFile?: string | undefined;
      suppressExcessPropertyErrors?: boolean | undefined;
      noUncheckedSideEffectImports?: boolean | undefined;
      resolveJsonModule?: boolean | undefined;
      suppressImplicitAnyIndexErrors?: boolean | undefined;
      target?: "es2015" | "ES2015" | "es2020" | "ES2020" | "es2022" | "ES2022" | "esnext" | "ESNext" | "es2016" | "ES2016" | "es2017" | "ES2017" | "es2018" | "ES2018" | "es2019" | "ES2019" | "es2021" | "ES2021" | "es2023" | "ES2023" | "es2024" | "ES2024" | "es3" | "ES3" | "es5" | "ES5" | "json" | "JSON" | "latest" | "Latest" | undefined;
      traceResolution?: boolean | undefined;
      typeRoots?: string[] | undefined;
      types?: string[] | undefined;
      useDefineForClassFields?: boolean | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
  }, {
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
  }>;
  blockVitest: import("bingo-stratum").BlockWithAddons<{
    exclude: string[];
    actionSteps: ({
      with?: Record<string, string> | undefined;
      env?: Record<string, string> | undefined;
      if?: string | undefined;
    } & ({
      run: string;
    } | {
      uses: string;
    }))[];
    coverage: {
      exclude?: string[] | undefined;
      include?: string[] | undefined;
    };
    flags: string[];
    environment?: string | undefined;
  }, {
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
  }>;
  blockVSCode: import("bingo-stratum").BlockWithAddons<{
    settings: Record<string, unknown>;
    extensions?: string[] | undefined;
    debuggers?: (Record<string, unknown> & {
      name: string;
    })[] | undefined;
    tasks?: ({
      detail: string;
    } & Record<string, unknown>)[] | undefined;
  }, {
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
  }>;
  blockWebExt: import("bingo-stratum").BlockWithoutAddons<{
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
  }>;
};
//#endregion
export { blockAllContributors, blockAreTheTypesWrong, blockCSpell, blockCTATransitions, blockCodecov, blockContributingDocs, blockContributorCovenant, blockDevelopmentDocs, blockESLint, blockESLintComments, blockESLintJSDoc, blockESLintJSONC, blockESLintMarkdown, blockESLintMarkdownLinks, blockESLintMoreStyling, blockESLintNode, blockESLintPackageJson, blockESLintPerfectionist, blockESLintPlugin, blockESLintRegexp, blockESLintYML, blockExports, blockFunding, blockGitHubActionsCI, blockGitHubIssueTemplates, blockGitHubPRTemplate, blockGitignore, blockKnip, blockMITLicense, blockNcc, blockNvmrc, blockOctoGuide, blockOctoGuideStrict, blockPackageJson, blockPnpmDedupe, blockPrettier, blockPrettierPluginCurly, blockPrettierPluginPackageJson, blockPrettierPluginSentencesPerLine, blockPrettierPluginSh, blockREADME, blockReleaseIt, blockRenovate, blockSecurityDocs, blockSideEffects, blockTSDown, blockTemplatedWith, blockTypeScript, blockVSCode, blockVitest, blockWebExt, blocks };