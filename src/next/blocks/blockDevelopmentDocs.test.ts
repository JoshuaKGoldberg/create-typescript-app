import { testBlock } from "create-testers";
import { describe, expect, test } from "vitest";

import { blockDevelopmentDocs } from "./blockDevelopmentDocs.js";
import { optionsBase } from "./options.fakes.js";

describe("blockDevelopmentDocs", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockDevelopmentDocs, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "DEVELOPMENT.md": "# Development

			After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

			\`\`\`shell
			git clone https://github.com/(your-name-here)/test-repository
			cd test-repository
			pnpm install
			\`\`\`
			",
			    },
			  },
			}
		`);
	});

	test("migration mode", () => {
		const creation = testBlock(blockDevelopmentDocs, {
			mode: "migrate",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "DEVELOPMENT.md": "# Development

			After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

			\`\`\`shell
			git clone https://github.com/(your-name-here)/test-repository
			cd test-repository
			pnpm install
			\`\`\`
			",
			    },
			  },
			  "scripts": [
			    {
			      "commands": [
			        "rm DEVELOPMENT.md",
			      ],
			      "phase": 0,
			      "silent": true,
			    },
			  ],
			}
		`);
	});

	test("with addons", () => {
		const creation = testBlock(blockDevelopmentDocs, {
			addons: {
				hints: ["> Be excellent to each other!"],
				sections: {
					First: {
						contents: "abc def",
					},
					Fourth: {},
					Second: {
						contents: {
							after: ["second-after"],
							before: "second-before",
							items: ["- a", "- b", "- c"],
							plural: "seconds",
						},
						innerSections: [
							{
								contents: "second-inner",
								heading: "Seconds Inside",
							},
						],
					},
					Third: {
						contents: {},
						innerSections: [
							{
								contents: "second-inner",
								heading: "Seconds Inside",
							},
						],
					},
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "DEVELOPMENT.md": "# Development

			After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

			\`\`\`shell
			git clone https://github.com/(your-name-here)/test-repository
			cd test-repository
			pnpm install
			\`\`\`

			> Be excellent to each other!

			## First

			abc def
			## Second

			second-before
			- a
			- b
			- c

			seconds
			second-after
			### Seconds Inside

			second-inner
			## Third

			### Seconds Inside

			second-inner",
			    },
			  },
			}
		`);
	});

	test("with options.guide", () => {
		const creation = testBlock(blockDevelopmentDocs, {
			options: {
				...optionsBase,
				guide: {
					href: "https://example.com",
					title: "My Guide",
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "files": {
			    ".github": {
			      "DEVELOPMENT.md": "# Development

			> If you'd like a more guided walkthrough, see [My Guide](https://example.com).
			> It'll walk you through the common activities you'll need to contribute.

			After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

			\`\`\`shell
			git clone https://github.com/(your-name-here)/test-repository
			cd test-repository
			pnpm install
			\`\`\`
			",
			    },
			  },
			}
		`);
	});
});
