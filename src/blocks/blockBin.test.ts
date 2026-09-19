import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it } from "vitest";

import { blockBin } from "./blockBin.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockBin, () => {
	it("produces nothing when options.bin is undefined", () => {
		const creation = testBlock(blockBin, { options: optionsBase });

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	it("produces a starter bin file when options.bin is a string", () => {
		const creation = testBlock(blockBin, {
			options: { ...optionsBase, bin: "bin/index.js" },
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "bin": {
			      "index.js": [
			        "#!/usr/bin/env node
			import "../lib/index.mjs";
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			  },
			}
		`);
	});

	it("produces a starter bin file with the right relative import when options.bin is nested", () => {
		const creation = testBlock(blockBin, {
			options: { ...optionsBase, bin: "bin/cli/index.js" },
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "bin": {
			      "cli": {
			        "index.js": [
			          "#!/usr/bin/env node
			import "../../lib/index.mjs";
			",
			          {
			            "executable": true,
			          },
			        ],
			      },
			    },
			  },
			}
		`);
	});

	it("produces a starter bin file for the repository's bin when options.bin is an object", () => {
		const creation = testBlock(blockBin, {
			options: {
				...optionsBase,
				bin: {
					[optionsBase.repository]: "bin/index.js",
					other: "bin/other.js",
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "bin": {
			      "index.js": [
			        "#!/usr/bin/env node
			import "../lib/index.mjs";
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			  },
			}
		`);
	});

	it("produces nothing when options.bin is an object without the repository's bin", () => {
		const creation = testBlock(blockBin, {
			options: { ...optionsBase, bin: { other: "bin/other.js" } },
		});

		expect(creation).toMatchInlineSnapshot(`{}`);
	});

	it("uses addons.contents when provided", () => {
		const creation = testBlock(blockBin, {
			addons: { contents: "#!/usr/bin/env node\nconsole.log('hi');\n" },
			options: { ...optionsBase, bin: "bin/index.js" },
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    "bin": {
			      "index.js": [
			        "#!/usr/bin/env node
			console.log('hi');
			",
			        {
			          "executable": true,
			        },
			      ],
			    },
			  },
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when options.bin is undefined", () => {
			const actual = testIntake(blockBin, {
				files: { bin: { "index.js": ["#!/usr/bin/env node\n"] } },
				options: optionsBase,
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when the bin file does not exist", () => {
			const actual = testIntake(blockBin, {
				files: {},
				options: { ...optionsBase, bin: "bin/index.js" },
			});

			expect(actual).toBeUndefined();
		});

		it("returns the existing contents when the bin file exists", () => {
			const contents = "#!/usr/bin/env node\nimport '../lib/index.js';\n";

			const actual = testIntake(blockBin, {
				files: { bin: { "index.js": [contents] } },
				options: { ...optionsBase, bin: "bin/index.js" },
			});

			expect(actual).toEqual({ contents });
		});
	});
});
