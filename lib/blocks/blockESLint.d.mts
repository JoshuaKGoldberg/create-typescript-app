//#region src/blocks/blockESLint.d.ts
declare const blockESLint: import("bingo-stratum").BlockWithAddons<{
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
//#endregion
export { blockESLint };