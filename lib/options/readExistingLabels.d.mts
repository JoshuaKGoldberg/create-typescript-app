import { TakeInput } from "bingo";
//#region src/options/readExistingLabels.d.ts
declare function readExistingLabels(take: TakeInput, getOwner: () => Promise<string | undefined>, getRepository: () => Promise<string | undefined>): Promise<{
  color: string;
  description: string;
  name: string;
}[]>;
//#endregion
export { readExistingLabels };