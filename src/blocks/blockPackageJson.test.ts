import { testBlock, testIntake } from "bingo-stratum-testers";
import { it } from "vitest";
import { describe, expect, test } from "vitest";

import { BaseOptions } from "../base.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { optionsBase } from "./options.fakes.ts";

const options = {
	...optionsBase,
	description: `A very very very very very very very very very very very very very very very very long <em><code>HTML-ish</code> description</em> ending with an emoji. 🧵`,
};

describe(blockPackageJson, () => {
	test("without props or mode", () => {
		const creation = testBlock(blockPackageJson, { options });

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
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
			  "extensions": [
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          "package-lock.json yarn.lock",
			        ],
			      },
			    },
			  ],
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				cleanupCommands: ["pnpm dedupe"],
				properties: {
					dependencies: {
						"is-odd": "1.2.3",
					},
					other: true,
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"dependencies": {
					"is-odd": "1.2.3"
				},
				"engines": {
					"node": ">=20.12.0"
				},
				"other": true
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			        "pnpm dedupe",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with props adding devDependencies", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
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
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"dependencies": {
					"is-odd": "1.2.3"
				},
				"devDependencies": {
					"is-even": "4.5.6"
				},
				"engines": {
					"node": ">=20.12.0"
				},
				"other": true
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			        "pnpm dedupe",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with props adding a devDependency that is already a dependency", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				packageData: {
					dependencies: {
						"is-odd": "1.2.3",
					},
				},
			},
			props: {
				properties: {
					devDependencies: {
						"is-even": "4.5.6",
						"is-odd": "1.2.3",
					},
				},
			},
		});

		expect(creation.files).toMatchInlineSnapshot(`
			{
			  "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"dependencies": {
					"is-odd": "1.2.3"
				},
				"devDependencies": {
					"is-even": "4.5.6"
				},
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			}
		`);
	});

	test("with props removing an existing property", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				packageData: {
					"lint-staged": { "*": "prettier --write" },
				} as BaseOptions["packageData"],
			},
			props: {
				properties: {
					"lint-staged": undefined,
				},
			},
		});

		expect(creation.files).toMatchInlineSnapshot(`
			{
			  "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			}
		`);
	});

	test("with options.email set to a string", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				email: "string@email.com",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "string@email.com"
				},
				"type": "module",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with options.type set to commonjs", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				type: "commonjs",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "commonjs",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with props adding overlapping files", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				properties: {
					files: ["README.md", "LICENSE.md", "lib/", "lib/bin/file.js"],
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"files": [
					"LICENSE.md",
					"README.md",
					"lib/"
				],
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
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
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"keywords": [
					"abc",
					"def ghi"
				],
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
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
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"packageManager": "pnpm@10.4.0",
				"engines": {
					"node": ">=22.0.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with object bin", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				bin: "bin/index.js",
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"bin": "bin/index.js",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with string bin", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				bin: {
					absolute: "bin/absolute.js",
					relative: "./bin/relative.js",
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"bin": {
					"absolute": "bin/absolute.js",
					"relative": "./bin/relative.js"
				},
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	test("with peerDependencies and peerDependenciesMeta", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				packageData: {
					peerDependencies: {
						"@types/estree": ">=1",
						eslint: ">=8",
					},
					peerDependenciesMeta: {
						"@types/estree": {
							optional: true,
						},
					},
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"peerDependencies": {
					"@types/estree": ">=1",
					"eslint": ">=8"
				},
				"peerDependenciesMeta": {
					"@types/estree": {
						"optional": true
					}
				},
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --no-frozen-lockfile",
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
			    "package.json": "{
				"name": "test-repository",
				"version": "0.0.0",
				"description": "A very very very very very very very very very very very very very very very very long HTML-ish description ending with an emoji. 🧵",
				"repository": {
					"type": "git",
					"url": "git+https://github.com/test-owner/test-repository.git"
				},
				"author": {
					"email": "npm@email.com"
				},
				"type": "module",
				"engines": {
					"node": ">=20.12.0"
				}
			}
			",
			  },
			  "scripts": [
			    {
			      "commands": [
			        "pnpm install --offline --no-frozen-lockfile",
			      ],
			      "phase": 1,
			    },
			  ],
			}
		`);
	});

	it("preserves an existing dependency when the addon has an invalid version", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "0.9.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.0.0",
			}
		`);
	});

	it("uses an addon's version when there is no existing equivalent", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "1.1.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.1.0",
			}
		`);
	});

	it("uses the addon's version when the existing equivalent is invalid semver", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "next",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.0.0",
			}
		`);
	});

	it("preserves an existing dependency when the addon has an older version minimum", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "^1.0.0",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "^0.9.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "^1.0.0",
			}
		`);
	});

	it("preserves an existing dependency when the addon has an older version range", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "^1.0.0 || ^2.0.0",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "^0.9.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "^1.0.0 || ^2.0.0",
			}
		`);
	});

	it("merges an existing dependency when the addon has the same version", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.0.0",
			}
		`);
	});

	it("replaces an existing dependency when the addon has a newer version", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "1.1.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.1.0",
			}
		`);
	});

	it("replaces an existing dependency when the addon has a newer version than the first range element", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					dependencies: {
						[dependency]: "^1.0.0 || ^2.0.0",
					},
				},
			},
			props: {
				properties: {
					dependencies: {
						[dependency]: "^1.1.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).dependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "^1.1.0",
			}
		`);
	});

	it("preserves an existing devDependency when the addon has an older pinned version", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					devDependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
			props: {
				properties: {
					devDependencies: {
						[dependency]: "0.9.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).devDependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.0.0",
			}
		`);
	});

	it("merges an existing devDependency when the addon has the same version", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					devDependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
			props: {
				properties: {
					devDependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).devDependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.0.0",
			}
		`);
	});

	it("replaces an existing devDependency when the addon has a newer version", () => {
		const dependency = "test-dependency";
		const creation = testBlock(blockPackageJson, {
			options: {
				...optionsBase,
				packageData: {
					devDependencies: {
						[dependency]: "1.0.0",
					},
				},
			},
			props: {
				properties: {
					devDependencies: {
						[dependency]: "1.1.0",
					},
				},
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).devDependencies,
		).toMatchInlineSnapshot(`
			{
			  "test-dependency": "1.1.0",
			}
		`);
	});

	it("keeps existing files after addon files, in their original order", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: [
					"dist/",
					"assets/",
					"!dist/**/*.test.*",
					"!dist/tests/",
				],
				properties: { files: ["dist/", "dist/index.js"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "dist/",
			  "assets/",
			  "!dist/**/*.test.*",
			  "!dist/tests/",
			]
		`);
	});

	it("keeps an existing file include under an existing directory", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: ["dist/", "dist/special.js", "!dist/*.js"],
				properties: { files: ["dist/"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "dist/",
			  "dist/special.js",
			  "!dist/*.js",
			]
		`);
	});

	it("keeps an existing re-include after an existing negation", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: ["dist/", "!dist/tests/", "dist/tests/*.js"],
				properties: { files: ["dist/"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "dist/",
			  "!dist/tests/",
			  "dist/tests/*.js",
			]
		`);
	});

	it("keeps an existing file under an addon directory", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: ["dist/", "dist/index.js.map"],
				properties: { files: ["dist/"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "dist/",
			  "dist/index.js.map",
			]
		`);
	});

	it("dedupes existing files that only differ in slashes, using the addon spelling", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: ["./dist/", "/assets", "assets/", "lib/**"],
				properties: { files: ["dist/"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "dist/",
			  "/assets",
			  "lib/**",
			]
		`);
	});

	it("removes existing files that are outdated or always included", () => {
		const creation = testBlock(blockPackageJson, {
			options: { ...options, bin: "bin/index.js" },
			props: {
				existingFiles: [
					"lib",
					"./lib/",
					"/lib/",
					"!lib/**/*.test.*",
					"./bin/index.js",
					"bin/other.js",
					"LICENSE.md",
					"package.json",
					"README.md",
				],
				outdatedFiles: ["lib/"],
				properties: { files: ["dist/"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "dist/",
			  "!lib/**/*.test.*",
			  "bin/other.js",
			]
		`);
	});

	it("keeps addon files that are also outdated existing files", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: ["lib/"],
				outdatedFiles: ["lib/"],
				properties: { files: ["lib/"] },
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toMatchInlineSnapshot(`
			[
			  "lib/",
			]
		`);
	});

	it("omits files when all existing files are removed", () => {
		const creation = testBlock(blockPackageJson, {
			options,
			props: {
				existingFiles: ["lib/", "package.json"],
				outdatedFiles: ["lib/"],
			},
		});

		expect(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-member-access
			JSON.parse(creation.files!["package.json"] as string).files,
		).toBeUndefined();
	});

	it("lowercases a repository name with capital letters for the package name", () => {
		const creation = testBlock(blockPackageJson, {
			options: {
				...options,
				repository: "Test-Repository",
			},
		});

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const packageJson = JSON.parse(creation.files!["package.json"] as string);

		expect(packageJson).toMatchObject({
			name: "test-repository",
			repository: {
				url: "git+https://github.com/test-owner/Test-Repository.git",
			},
		});
	});

	describe("intake", () => {
		test("returns undefined when package.json does not exist", () => {
			const actual = testIntake(blockPackageJson, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		test("returns undefined when files is not an array", () => {
			const actual = testIntake(blockPackageJson, {
				files: {
					"package.json": [JSON.stringify({ files: "lib/" })],
				},
			});

			expect(actual).toBeUndefined();
		});

		test("returns existing string files", () => {
			const actual = testIntake(blockPackageJson, {
				files: {
					"package.json": [
						JSON.stringify({ files: ["lib/", 123, "!lib/**/*.test.*"] }),
					],
				},
			});

			expect(actual).toEqual({
				existingFiles: ["lib/", "!lib/**/*.test.*"],
			});
		});
	});
});
