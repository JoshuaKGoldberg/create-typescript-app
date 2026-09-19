import { AllContributorContributor } from "../types.mjs";
import { TakeInput } from "bingo";
//#region src/options/readAllContributors.d.ts
declare function readAllContributors(take: TakeInput): Promise<AllContributorContributor[] | undefined>;
//#endregion
export { readAllContributors };