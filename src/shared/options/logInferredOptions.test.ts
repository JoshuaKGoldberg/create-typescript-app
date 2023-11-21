import { describe, expect, it, vi } from "vitest";

import { InferredOptions, logInferredOptions } from "./logInferredOptions.js";

function makeProxy<T extends object>(receiver: T): T {
	return new Proxy(receiver, {
		get: () => makeProxy((input: string) => input),
	});
}

vi.mock("chalk", () => ({
	default: makeProxy({}),
}));

const mockLogLine = vi.fn();

vi.mock("../cli/lines.js", () => ({
	get logLine() {
		return mockLogLine;
	},
}));

const options = {
	description: "Test description.",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	owner: "TestOwner",
	repository: "test-repository",
	title: "Test Title",
} satisfies InferredOptions;

describe("logInferredOptions", () => {
	it("logs the required inferred values when only they exist", () => {
		logInferredOptions(options);

		expect(mockLogLine.mock.calls).toMatchInlineSnapshot(`
			[
			  [],
			  [
			    "--auto inferred the following values:",
			  ],
			  [
			    "- description: Test description.",
			  ],
			  [
			    "- email-github: github@email.com",
			  ],
			  [
			    "- email-npm: github@email.com",
			  ],
			  [
			    "- owner: TestOwner",
			  ],
			  [
			    "- repository: test-repository",
			  ],
			  [
			    "- title: Test Title",
			  ],
			]
		`);
	});

	it("logs additional and required inferred values when all they exist", () => {
		logInferredOptions({
			...options,
			guide: {
				href: "https://example.com/guide",
				title: "Example Guide",
			},
			logo: {
				alt: "Logo text.",
				src: "https://example.com/logo",
			},
		});

		expect(mockLogLine.mock.calls).toMatchInlineSnapshot(`
			[
			  [],
			  [
			    "--auto inferred the following values:",
			  ],
			  [
			    "- description: Test description.",
			  ],
			  [
			    "- email-github: github@email.com",
			  ],
			  [
			    "- email-npm: github@email.com",
			  ],
			  [
			    "- guide: https://example.com/guide",
			  ],
			  [
			    "- guide-title: Example Guide",
			  ],
			  [
			    "- logo: https://example.com/logo",
			  ],
			  [
			    "- logo-alt: Logo text.",
			  ],
			  [
			    "- owner: TestOwner",
			  ],
			  [
			    "- repository: test-repository",
			  ],
			  [
			    "- title: Test Title",
			  ],
			]
		`);
	});
});
