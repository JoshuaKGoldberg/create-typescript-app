import { describe, expect, it, vi } from "vitest";

import { readLogoSizing } from "./readLogoSizing.js";

const mockImageSize = vi.fn();

vi.mock("image-size", () => ({
	get imageSize() {
		return mockImageSize;
	},
}));

const src = "img.jpg";

describe("readLogoSizing", () => {
	it("returns undefined when imageSize throws an error", () => {
		mockImageSize.mockImplementationOnce(() => {
			throw new Error("Oh no!");
		});

		const actual = readLogoSizing(src);

		expect(actual).toBeUndefined();
	});

	it("returns undefined when imageSize returns neither height nor width", () => {
		mockImageSize.mockReturnValueOnce({});

		const actual = readLogoSizing(src);

		expect(actual).toBeUndefined();
	});

	it("returns the height when imageSize returns only a height smaller than the maximum", () => {
		const height = 100;

		mockImageSize.mockReturnValueOnce({ height, type: "png" });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ height });
	});

	it("returns maximum height when imageSize returns only a height greater than the maximum", () => {
		const height = 129;

		mockImageSize.mockReturnValueOnce({ height, type: "png" });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ height: 128 });
	});

	it("returns the width when imageSize returns only a width smaller than the maximum", () => {
		const width = 100;

		mockImageSize.mockReturnValueOnce({ type: "png", width });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ width });
	});

	it("returns maximum width when imageSize returns only a width greater than the maximum", () => {
		const width = 129;

		mockImageSize.mockReturnValueOnce({ type: "png", width });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ width: 128 });
	});

	it("returns the height and width when imageSize returns height and width smaller than the maximum", () => {
		const height = 101;
		const width = 102;

		mockImageSize.mockReturnValueOnce({ height, type: "png", width });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ height, width });
	});

	it("returns the same aspect ratio when imageSize returns a tall image greater than the maximum", () => {
		const height = 1280;
		const width = 1000;

		mockImageSize.mockReturnValueOnce({ height, type: "png", width });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ height: 128, width: 100 });
	});

	it("returns the same aspect ratio when imageSize returns a wide image greater than the maximum", () => {
		const height = 1000;
		const width = 1280;

		mockImageSize.mockReturnValueOnce({ height, type: "png", width });

		const actual = readLogoSizing(src);

		expect(actual).toEqual({ height: 100, width: 128 });
	});
});
