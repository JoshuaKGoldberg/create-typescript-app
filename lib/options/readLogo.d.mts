//#region src/options/readLogo.d.ts
declare function readLogo(getReadme: () => Promise<string>): Promise<{
  height?: number;
  width?: number;
  alt: string;
  src: string;
} | undefined>;
//#endregion
export { readLogo };