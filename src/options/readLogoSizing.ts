import { imageSize } from "image-size";

const maximum = 128;

export interface OptionsLogoSizing {
	height?: number;
	width?: number;
}

export function readLogoSizing(
	src: string | Uint8Array,
): OptionsLogoSizing | undefined {
	const size = imageSizeSafe(src);
	if (!size) {
		return undefined;
	}

	if (!size.height) {
		return size.width ? { width: Math.min(size.width, maximum) } : undefined;
	}

	if (!size.width) {
		return { height: Math.min(size.height, maximum) };
	}

	if (size.height <= maximum && size.width <= maximum) {
		return { height: size.height, width: size.width };
	}

	return size.height > size.width
		? { height: maximum, width: (size.width / size.height) * maximum }
		: { height: (size.height / size.width) * maximum, width: maximum };
}

function imageSizeSafe(src: string | Uint8Array) {
	try {
		return imageSize(src);
	} catch {
		return undefined;
	}
}
