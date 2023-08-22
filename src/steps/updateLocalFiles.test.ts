import { describe, expect, it, vi } from "vitest";

import { updateLocalFiles } from "./updateLocalFiles.js";

const mockReplaceInFile = vi.fn();

vi.mock("replace-in-file", () => ({
	get default() {
		return mockReplaceInFile;
	},
}));

const mockReadFileSafeAsJson = vi.fn();

vi.mock("../shared/readFileSafeAsJson.js", () => ({
	get readFileSafeAsJson() {
		return mockReadFileSafeAsJson;
	},
}));

const stubOptions = {
	description: "Stub description.",
	npmAuthor: "stub-npm-author",
	owner: "StubOwner",
	repository: "stub-repository",
	title: "Stub Title",
};

describe("updateLocalFiles", () => {
	it("throws a wrapping error when replaceInFiles rejects", async () => {
		const error = new Error("Oh no!");

		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockRejectedValue(error);

		await expect(async () => {
			await updateLocalFiles(stubOptions);
		}).rejects.toThrowErrorMatchingInlineSnapshot(
			'"Failed to replace /Template TypeScript Node Package/g with Stub Title in ./.github/**/*,./*.*"',
		);
	});

	it("replaces using the common replacements when the existing package data is null", async () => {
		mockReadFileSafeAsJson.mockResolvedValue(null);
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles(stubOptions);

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Template TypeScript Node Package/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /template-typescript-node-package/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "files": ".eslintrc.cjs",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": "\\"author\\": \\"stub-npm-author\\"",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"create:test": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"initialize:test": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"migrate:test": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "		\\"src/initialize/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "		\\"src/migrate/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "[\\"src/index.ts!\\", \\"script/initialize*.js\\"]",
			      "to": "\\"src/index.ts!\\"",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "[\\"src/**/*.ts!\\", \\"script/**/*.js\\"]",
			      "to": "\\"src/**/*.ts!\\"",
			    },
			  ],
			]
		`);
	});

	it("replaces using the common replacements when the existing package data is an empty object", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles(stubOptions);

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Template TypeScript Node Package/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /template-typescript-node-package/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "files": ".eslintrc.cjs",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": "\\"author\\": \\"stub-npm-author\\"",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"create:test": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"initialize:test": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"migrate:test": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "		\\"src/initialize/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "		\\"src/migrate/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "[\\"src/index.ts!\\", \\"script/initialize*.js\\"]",
			      "to": "\\"src/index.ts!\\"",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "[\\"src/**/*.ts!\\", \\"script/**/*.js\\"]",
			      "to": "\\"src/**/*.ts!\\"",
			    },
			  ],
			]
		`);
	});

	it("replaces using the extra replacements when the existing package data is full", async () => {
		mockReadFileSafeAsJson.mockResolvedValue({
			description: "Existing description",
			version: "1.2.3",
		});
		mockReplaceInFile.mockResolvedValue([]);

		await updateLocalFiles(stubOptions);

		expect(mockReplaceInFile.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Template TypeScript Node Package/g,
			      "to": "Stub Title",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /JoshuaKGoldberg/g,
			      "to": "StubOwner",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /template-typescript-node-package/g,
			      "to": "stub-repository",
			    },
			  ],
			  [
			    {
			      "files": ".eslintrc.cjs",
			      "from": /\\\\/\\\\\\*\\\\n\\.\\+\\\\\\*\\\\/\\\\n\\\\n/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"author": "\\.\\+"/g,
			      "to": "\\"author\\": \\"stub-npm-author\\"",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"bin": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"create:test": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"initialize:test": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"initialize": "\\.\\*/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"migrate:test": "\\.\\+\\\\n/g,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./README.md",
			      "from": /## Getting Started\\.\\*## Development/gs,
			      "to": "## Development",
			    },
			  ],
			  [
			    {
			      "files": "./.github/DEVELOPMENT.md",
			      "from": /\\\\n## Setup Scripts\\.\\*\\$/gs,
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "		\\"src/initialize/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "		\\"src/migrate/index.ts\\",
			",
			      "to": "",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "[\\"src/index.ts!\\", \\"script/initialize*.js\\"]",
			      "to": "\\"src/index.ts!\\"",
			    },
			  ],
			  [
			    {
			      "files": "./knip.jsonc",
			      "from": "[\\"src/**/*.ts!\\", \\"script/**/*.js\\"]",
			      "to": "\\"src/**/*.ts!\\"",
			    },
			  ],
			  [
			    {
			      "files": [
			        "./.github/**/*",
			        "./*.*",
			      ],
			      "from": /Existing description/g,
			      "to": "Stub description.",
			    },
			  ],
			  [
			    {
			      "files": "./package.json",
			      "from": /"version": "1\\.2\\.3"/g,
			      "to": "\\"version\\": \\"0.0.0\\"",
			    },
			  ],
			]
		`);
	});
});
