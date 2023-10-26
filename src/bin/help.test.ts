import chalk from "chalk";
import { SpyInstance, beforeEach, describe, expect, it, vi } from "vitest";

import { logHelpText } from "./help.js";

let mockConsoleLog: SpyInstance;

describe("logHelpText", () => {
	beforeEach(() => {
		mockConsoleLog = vi
			.spyOn(console, "log")
			.mockImplementation(() => undefined);
	});

	it("logs help text when called", () => {
		logHelpText([
			chalk.yellow(
				"⚠️ This template is early stage, opinionated, and not endorsed by the TypeScript team. ⚠️",
			),
			chalk.yellow(
				"⚠️ If any tooling it sets displeases you, you can always remove that portion manually. ⚠️",
			),
		]);

		expect(mockConsoleLog.mock.calls).toMatchSnapshot();
	});
});
