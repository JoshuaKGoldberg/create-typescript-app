import { ExecaError, Result } from "execa";
//#region src/options/readNpmDefaults.d.ts
declare function readNpmDefaults(getNpmWhoami: () => Promise<ExecaError | Result | undefined>): Promise<import("npm-user").UserInfo | undefined>;
//#endregion
export { readNpmDefaults };