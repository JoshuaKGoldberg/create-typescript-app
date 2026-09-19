import { imageSize } from "image-size";
//#region src/options/readLogoSizing.ts
const maximum = 128;
function readLogoSizing(src) {
	const size = imageSizeSafe(src);
	if (!size) return;
	if (!size.height) return size.width ? { width: Math.min(size.width, maximum) } : void 0;
	if (!size.width) return { height: Math.min(size.height, maximum) };
	if (size.height <= maximum && size.width <= maximum) return {
		height: size.height,
		width: size.width
	};
	return size.height > size.width ? {
		height: maximum,
		width: size.width / size.height * maximum
	} : {
		height: size.height / size.width * maximum,
		width: maximum
	};
}
function imageSizeSafe(src) {
	try {
		return imageSize(src);
	} catch {
		return;
	}
}
//#endregion
export { readLogoSizing };
