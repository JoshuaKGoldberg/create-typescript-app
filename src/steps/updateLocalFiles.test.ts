import { describe, expect, it, vi } from "vitest";

import { Options } from "../shared/types.js";
import { updateLocalFiles } from "./updateLocalFiles.js";

const mockReplaceInFile = vi.fn();

vi.mock("replace-in-file", () => ({
	get replaceInFile() {
		return mockReplaceInFile;
	},
}));

const mockReadFileSafeAsJson = vi.fn();

vi.mock("../shared/readFileSafeAsJson.js", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

const options = {
	access: "public",
	base: "everything",
	description: "Stub description.",
	directory: ".",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	mode: "create",
	offline: true,
	owner: "StubOwner",
	repository: "stub-repository",
	title: "Stub Title",
} satisfies Options;

describe("updateLocalFiles", () => {
	it("throws a wrapping error when replaceInFiles rejects", async () => {
		const error = new Error("Oh no!");

		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockRejectedValue(error);

		await expect(async () => {
			await updateLocalFiles({ ...options, mode: "initialize" });
		}).rejects.toThrowErrorMatchingInlineSnapshot(
			`[Error: Failed to replace /Create TypeScript App/g with Stub Title in ./.github/**/*,./*.*]`,
		);
	});

	it("replaces using the common replacements when the existing package data is null", async () => {
		mockReadFileSafeAsJson.mockResolvedValue(null);
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Create TypeScript App/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg\\(\\?:\\\\/\\(\\.\\+\\)\\)\\?/g,
			      "to": [Function],
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "package.json",
			      "from": /JoshuaKGoldberg/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /create-typescript-app/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "eslint.config.js",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": ""author": "undefined"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:create": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:migrate": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "		"src/initialize/index.ts",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "		"src/migrate/index.ts",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "["src/index.ts!", "script/initialize*.js"]",
			      "to": ""src/index.ts!"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "["src/**/*.ts!", "script/**/*.js"]",
			      "to": ""src/**/*.ts!"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": /> 💙 This package was templated with \\.\\+\\\\\\./g,
			      "to": "> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			]
		`);
	});

	it("replaces using the common replacements when the existing package data is an empty object", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Create TypeScript App/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg\\(\\?:\\\\/\\(\\.\\+\\)\\)\\?/g,
			      "to": [Function],
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "package.json",
			      "from": /JoshuaKGoldberg/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /create-typescript-app/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "eslint.config.js",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": ""author": "undefined"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:create": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"test:migrate": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "		"src/initialize/index.ts",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "		"src/migrate/index.ts",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "["src/index.ts!", "script/initialize*.js"]",
			      "to": ""src/index.ts!"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./knip.json",
			      "from": "["src/**/*.ts!", "script/**/*.js"]",
			      "to": ""src/**/*.ts!"",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./README.md",
			      "from": /> 💙 This package was templated with \\.\\+\\\\\\./g,
			      "to": "> 💙 This package was templated with [\`create-typescript-app\`](https://github.com/JoshuaKGoldberg/create-typescript-app).",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			]
		`);
	});

	it("doesn't remove existing tooling when mode is migrate", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "migrate" });

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Create TypeScript App/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg\\(\\?:\\\\/\\(\\.\\+\\)\\)\\?/g,
			      "to": [Function],
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "package.json",
			      "from": /JoshuaKGoldberg/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /create-typescript-app/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "eslint.config.js",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "allowEmptyPaths": true,
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": ""author": "undefined"",
			    },
			  ],
			]
		`);
	});

	it("does not replace an existing description when it does not exist", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).not.toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: ["./.github/**/*", "./*.*"],
			from: expect.anything(),
			to: options.description,
		});
	});

	it("replaces an existing description when it exists", async () => {
		const existingDescription = "Existing description.";

		mockReadFileSafeAsJson.mockResolvedValue({
			description: existingDescription,
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: ["./.github/**/*", "./*.*"],
			from: existingDescription,
			to: options.description,
		});
	});

	it("removes bin when the mode is initialize", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"bin": ".+\n/g,
			to: "",
		});
	});

	it("does not remove bin when the mode is migrate", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "migrate" });

		expect(mockReplaceInFile).not.toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"bin": ".+\n/g,
			to: "",
		});
	});

	it("resets package version to 0.0.0 when mode is initialize", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "initialize" });

		expect(mockReplaceInFile).toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"version": "1.2.3"/g,
			to: '"version": "0.0.0"',
		});
	});

	it("does not reset package version to 0.0.0 when mode is migrate", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles({ ...options, mode: "migrate" });

		expect(mockReplaceInFile).not.toHaveBeenCalledWith({
			allowEmptyPaths: true,
			files: "./package.json",
			from: /"version": "1.2.3"/g,
			to: '"version": "0.0.0"',
		});
	});
});
