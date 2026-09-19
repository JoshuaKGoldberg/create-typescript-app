//#region src/blocks/blockPackageJson.d.ts
declare const blockPackageJson: import("bingo-stratum").BlockWithAddons<{
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
//#endregion
export { blockPackageJson };