import { TakeInput } from "bingo";
//#region src/options/readGuide.d.ts
declare function readGuide(take: TakeInput): Promise<{
  href: string;
  title: string;
} | undefined>;
//#endregion
export { readGuide };