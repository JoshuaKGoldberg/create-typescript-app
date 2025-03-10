import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockPackageJson } from "./blockPackageJson.js";
import { optionsBase } from "./options.fakes.js";

const options = {
	...optionsBase,
	description: `A very very very very very very very very very very very very very very very very long <em><code>HTML-ish</code> description</em> ending with an emoji. 🧵`,
};

describe("blockPackageJson", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockPackageJson, { options });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"]}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockPackageJson, {
			mode: "transition",
			options,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"]}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install",
			      ],
			      "phase": 1,
			    },
			    {
			      "commands": [
			        "rm package-lock.json yarn.lock",
			      ],
			      "phase": 0,
			      "silent": true,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockPackageJson, {
			addons: {
				cleanupCommands: ["pnpm dedupe"],
				properties: {
					dependencies: {
						"is-odd": "1.2.3",
					},
					other: true,
				},
			},
			options,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"],"dependencies":{"is-odd":"1.2.3"},"other":true}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install",
			        "pnpm dedupe",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with addons adding devDependencies", () => {
		const creation = testBlock(blockPackageJson, {
			addons: {
				cleanupCommands: ["pnpm dedupe"],
				properties: {
					dependencies: {
						"is-odd": "1.2.3",
					},
					devDependencies: {
						"is-even": "4.5.6",
					},
					other: true,
				},
			},
			options,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"],"dependencies":{"is-odd":"1.2.3"},"devDependencies":{"is-even":"4.5.6"},"other":true}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install",
			        "pnpm dedupe",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with keywords", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				keywords: ["abc", "def ghi"],
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","keywords":["abc","def","ghi"],"repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"]}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with node and pnpm versions", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				node: {
					minimum: "22.0.0",
				},
				pnpm: "10.4.0",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"],"packageManager":"pnpm@10.4.0","engines":{"node":">=22.0.0"}}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("offline mode", () => {
		const creation = testBlock(blockPackageJson, {
			offline: true,
			options,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{"name":"test-repository","version":"0.0.0","description":"A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵","repository":{"type":"git","url":"git+https://github.com/test-owner/test-repository.git"},"license":"MIT","author":{"email":"npm@email.com"},"type":"module","main":"lib/index.js","files":["README.md","package.json"]}",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --offline",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});
});
