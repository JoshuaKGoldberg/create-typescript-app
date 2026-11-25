import { base } from "../base.ts";
import { getPackageDependencies } from "../data/packageData.ts";
import { blockVitest } from "./blockVitest.ts";

export const blockConsoleFailTest = base.createBlock({
	about: {
		name: "Console Fail Test",
	},
	produce() {
		return {
			extensions: [
				blockVitest({
					setup: {
						devDependencies: getPackageDependencies("console-fail-test"),
						documentation: [
							`Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.`,
						],
						files: ["console-fail-test/setup"],
					},
				}),
			],
		};
	},
});
