import { getPackageDependencies } from "../data/packageData.mjs";
import { base } from "../base.mjs";
import { zActionStep } from "./actions/steps.mjs";
import { blockRemoveFiles } from "./blockRemoveFiles.mjs";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.mjs";
import { blockPackageJson } from "./blockPackageJson.mjs";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.mjs";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.mjs";
import { blockVSCode } from "./blockVSCode.mjs";
import { blockCSpell } from "./blockCSpell.mjs";
import { blockRemoveDependencies } from "./blockRemoveDependencies.mjs";
import { blockESLint } from "./blockESLint.mjs";
import { blockExampleFiles } from "./blockExampleFiles.mjs";
import { blockGitignore } from "./blockGitignore.mjs";
import { blockKnip } from "./blockKnip.mjs";
import { blockPrettier } from "./blockPrettier.mjs";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.mjs";
import { blockTSDown } from "./blockTSDown.mjs";
import { z } from "zod";
//#region src/blocks/blockVitest.ts
const zCoverage = z.object({
	exclude: z.array(z.string()).optional(),
	include: z.array(z.string()).optional()
});
const zEnvironment = z.string();
const zExclude = z.array(z.string());
const zTest = z.object({
	coverage: zCoverage,
	environment: zEnvironment,
	exclude: zExclude
}).partial();
function intakeFromConfig(files) {
	const rawData = intakeFileDefineConfig(files, ["vitest.config.ts"]);
	if (typeof rawData?.test !== "object") return;
	const parsedData = zTest.safeParse(rawData.test).data;
	if (!parsedData) return;
	return {
		coverage: parsedData.coverage,
		environment: parsedData.environment,
		exclude: parsedData.exclude
	};
}
const blockVitest = base.createBlock({
	about: { name: "Vitest" },
	addons: {
		actionSteps: z.array(zActionStep).default([]),
		coverage: zCoverage.default({}),
		environment: zEnvironment.optional(),
		exclude: zExclude.default([]),
		flags: z.array(z.string()).default([])
	},
	intake({ files, options }) {
		return {
			...intakeFromConfig(files),
			flags: options.packageData?.scripts?.test?.match(/^vitest (.+)/)?.[1].split(" ")
		};
	},
	produce({ addons }) {
		const { actionSteps, coverage, environment, exclude } = addons;
		const excludeText = JSON.stringify(Array.from(/* @__PURE__ */ new Set(["node_modules", ...exclude])).sort());
		return {
			addons: [
				blockCSpell({ ignorePaths: ["coverage"] }),
				blockDevelopmentDocs({ sections: { Testing: { contents: `
[Vitest](https://vitest.dev) is used for tests.
You can run it locally on the command-line:

\`\`\`shell
pnpm run test
\`\`\`

Add the \`--coverage\` flag to compute test coverage and place reports in the \`coverage/\` directory:

\`\`\`shell
pnpm run test --coverage
\`\`\`

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to \`console.log\`, \`console.warn\`, and other console methods will cause a test to fail.


		` } } }),
				blockESLint({
					extensions: [{
						extends: ["vitest.configs.recommended"],
						files: ["**/*.test.*"],
						rules: [{ entries: {
							"@typescript-eslint/no-unsafe-assignment": "off",
							"vitest/prefer-describe-function-title": "error"
						} }],
						settings: { vitest: { typecheck: true } }
					}],
					ignores: ["coverage", "**/*.snap"],
					imports: [{
						source: "@vitest/eslint-plugin",
						specifier: "vitest"
					}]
				}),
				blockExampleFiles({ files: { "greet.test.ts": `import { describe, expect, it, vi } from "vitest";

import { greet } from "./greet.ts";

const message = "Yay, testing!";

describe(greet, () => {
	it("logs to the console once when message is provided as a string", () => {
		const logger = vi.spyOn(console, "log").mockImplementation(() => undefined);

		greet(message);

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(1);
	});

	it("logs to the console once when message is provided as an object", () => {
		const logger = vi.spyOn(console, "log").mockImplementation(() => undefined);

		greet({ message });

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(1);
	});

	it("logs once when times is not provided in an object", () => {
		const logger = vi.fn();

		greet({ logger, message });

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(1);
	});

	it("logs a specified number of times when times is provided", () => {
		const logger = vi.fn();
		const times = 7;

		greet({ logger, message, times });

		expect(logger).toHaveBeenCalledWith(message);
		expect(logger).toHaveBeenCalledTimes(7);
	});
});
` } }),
				blockGitignore({ ignores: ["/coverage"] }),
				blockGitHubActionsCI({ jobs: [{
					name: "Test",
					steps: [{ run: "pnpm run test --coverage" }, ...actionSteps]
				}] }),
				blockKnip({ entry: ["src/**/*.test.*"] }),
				blockPackageJson({ properties: {
					devDependencies: getPackageDependencies("@vitest/coverage-v8", "@vitest/eslint-plugin", "console-fail-test", "vitest"),
					scripts: { test: `vitest ${addons.flags.join(" ")}`.trim() }
				} }),
				blockPrettier({ ignores: ["/coverage"] }),
				blockTSDown({ entry: ["!src/**/*.test.*"] }),
				blockVSCode({
					debuggers: [{
						args: ["run", "${relativeFile}"],
						autoAttachChildProcesses: true,
						console: "integratedTerminal",
						name: "Debug Current Test File",
						program: "${workspaceRoot}/node_modules/vitest/vitest.mjs",
						request: "launch",
						skipFiles: ["<node_internals>/**", "**/node_modules/**"],
						smartStep: true,
						type: "node"
					}],
					extensions: ["vitest.explorer"]
				})
			],
			files: { "vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			${coverage.exclude?.length ? `exclude: ${JSON.stringify(coverage.exclude)},
			` : ""}include: ${JSON.stringify(coverage.include)},
			reporter: ["html", "lcov"],
		},${environment ? `
		environment: "${environment}",` : ""}
		exclude: [${excludeText.slice(1, excludeText.length - 1)}],
		setupFiles: ["console-fail-test/setup"],
	},
});
	` }
		};
	},
	transition() {
		return { addons: [
			blockRemoveDependencies({ dependencies: [
				"@vitest/coverage-istanbul",
				"eslint-plugin-jest",
				"eslint-plugin-mocha",
				"eslint-plugin-vitest",
				"jest mocha"
			] }),
			blockRemoveFiles({ files: [
				".mocha*",
				"jest.config.*",
				"vitest.config.{c,j,m}*"
			] }),
			blockRemoveWorkflows({ workflows: ["test"] })
		] };
	}
});
//#endregion
export { blockVitest };
