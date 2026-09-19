import { TakeInput } from "bingo";
//#region src/options/readRulesetId.d.ts
declare function readRulesetId(take: TakeInput, getOwner: () => Promise<string | undefined>, getRepository: () => Promise<string | undefined>): Promise<string | undefined>;
//#endregion
export { readRulesetId };