import { IntakeDirectory } from "bingo-fs";
import { z } from "zod";

import { base } from "../base.js";
import { getPackageDependencies } from "../data/packageData.js";
import { zActionStep } from "./actions/steps.js";
import { blockCSpell } from "./blockCSpell.js";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { blockESLint } from "./blockESLint.js";
import { blockExampleFiles } from "./blockExampleFiles.js";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.js";
import { blockGitignore } from "./blockGitignore.js";
import { blockKnip } from "./blockKnip.js";
import { blockPackageJson } from "./blockPackageJson.js";
import { blockPrettier } from "./blockPrettier.js";
import { blockRemoveDependencies } from "./blockRemoveDependencies.js";
import { blockRemoveFiles } from "./blockRemoveFiles.js";
import { blockRemoveWorkflows } from "./blockRemoveWorkflows.js";
import { blockTSDown } from "./blockTSDown.js";
import { blockVSCode } from "./blockVSCode.js";
import { intakeFileDefineConfig } from "./intake/intakeFileDefineConfig.js";

const zCoverage = z.object({
	exclude: z.array(z.string()).optional(),
	include: z.array(z.string()).optional(),
});

const zEnvironment = z.string();

const zExclude = z.array(z.string());

const zTest = z
	.object({
		coverage: zCoverage,
		environment: zEnvironment,
		exclude: zExclude,
	})
	.partial();

function intakeFromConfig(files: IntakeDirectory) {
	const rawData = intakeFileDefineConfig(files, ["vitest.config.ts"]);
	if (typeof rawData?.test !== "object") {
		return undefined;
	}

	const parsedData = zTest.safeParse(rawData.test).data;
	if (!parsedData) {
		return undefined;
	}

	return {
		coverage: parsedData.coverage,
		environment: parsedData.environment,
		exclude: parsedData.exclude,
	};
}

export const blockVitest = base.createBlock({
	about: {
		name: "Vitest",
	},
	addons: {
		actionSteps: z.array(zActionStep).default([]),
		coverage: zCoverage.default({}),
		environment: zEnvironment.optional(),
		exclude: zExclude.default([]),
		flags: z.array(z.string()).default([]),
	},
	intake({ files, options }) {
		return {
			...intakeFromConfig(files),
			flags: options.packageData?.scripts?.test
				?.match(/^vitest (.+)/)?.[1]
				.split(" "),
		};
	},
	produce({ addons }) {
		const { actionSteps, coverage, environment, exclude = [] } = addons;
		const excludeText = JSON.stringify(
			Array.from(new Set(["node_modules", ...exclude])).sort(),
		);

		return {
			addons: [
				blockCSpell({
					ignorePaths: ["coverage"],
				}),
				blockDevelopmentDocs({
					sections: {
						Testing: {
							contents: `
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


		`,
						},
					},
				}),
				blockESLint({
					extensions: [
						{
							extends: ["vitest.configs.recommended"],
							files: ["**/*.test.*"],
							rules: [
								{
									entries: {
										"@typescript-eslint/no-unsafe-assignment": "off",
									},
								},
							],
						},
					],
					ignores: ["coverage", "**/*.snap"],
					imports: [{ source: "@vitest/eslint-plugin", specifier: "vitest" }],
					settings: {
						vitest: { typecheck: true },
					},
				}),
				blockExampleFiles({
					files: {
						"greet.test.ts": `import { describe, expect, it, vi } from "vitest";

import { greet } from "./greet.js";

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
`,
					},
				}),
				blockGitignore({
					ignores: ["/coverage"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Test",
							steps: [{ run: "pnpm run test --coverage" }, ...actionSteps],
						},
					],
				}),
				blockKnip({
					entry: ["src/**/*.test.*"],
				}),
				blockPackageJson({
					properties: {
						devDependencies: getPackageDependencies(
							"@vitest/coverage-v8",
							"@vitest/eslint-plugin",
							"console-fail-test",
							"vitest",
						),
						scripts: {
							test: `vitest ${addons.flags.join(" ")}`.trim(),
						},
					},
				}),
				blockPrettier({
					ignores: ["/coverage"],
				}),
				blockTSDown({
					entry: ["!src/**/*.test.*"],
				}),
				blockVSCode({
					debuggers: [
						{
							args: ["run", "${relativeFile}"],
							autoAttachChildProcesses: true,
							console: "integratedTerminal",
							name: "Debug Current Test File",
							program: "${workspaceRoot}/node_modules/vitest/vitest.mjs",
							request: "launch",
							skipFiles: ["<node_internals>/**", "**/node_modules/**"],
							smartStep: true,
							type: "node",
						},
					],
					extensions: ["vitest.explorer"],
				}),
			],
			files: {
				"vitest.config.ts": `import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		clearMocks: true,
		coverage: {
			all: true,
			${
				coverage.exclude?.length
					? `exclude: ${JSON.stringify(coverage.exclude)},
			`
					: ""
			}include: ${JSON.stringify(coverage.include)},
			reporter: ["html", "lcov"],
		},${
			environment
				? `
		environment: "${environment}",`
				: ""
		}
		exclude: [${excludeText.slice(1, excludeText.length - 1)}],
		setupFiles: ["console-fail-test/setup"],
	},
});
	`,
			},
		};
	},
	transition() {
		return {
			addons: [
				blockRemoveDependencies({
					dependencies: [
						"@vitest/coverage-istanbul",
						"eslint-plugin-jest",
						"eslint-plugin-mocha",
						"eslint-plugin-vitest",
						"jest mocha",
					],
				}),
				blockRemoveFiles({
					files: [".mocha*", "jest.config.*", "vitest.config.{c,j,m}*"],
				}),
				blockRemoveWorkflows({
					workflows: ["test"],
				}),
			],
		};
	},
});
