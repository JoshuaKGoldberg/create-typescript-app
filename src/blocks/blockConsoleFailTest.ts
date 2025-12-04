import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockVitest } from "./blockVitest.js";

export const blockConsoleFailTest = base.createBlock({
	produce() {
		return {
			addons: [
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies("console-fail-test"),
					},
				}),
				blockVitest({
					additionalDocs: `
Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.
`,
					setupFiles: ["console-fail-test/setup"],
				}),
			],
		};
	},
});
