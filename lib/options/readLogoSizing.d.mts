//#region src/options/readLogoSizing.d.ts
interface OptionsLogoSizing {
  height?: number;
  width?: number;
}
declare function readLogoSizing(src: Uint8Array): OptionsLogoSizing | undefined;
//#endregion
export { OptionsLogoSizing, readLogoSizing };