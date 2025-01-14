import { base } from "../base.js";
import { blockVitest } from "./blockVitest.js";

export const blockCodecov = base.createBlock({
	about: {
		name: "Codecov",
	},
	produce() {
		return {
			addons: [
				blockVitest({
					coverage: {
						env: {
							CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
						},
					},
				}),
			],
		};
	},
});
