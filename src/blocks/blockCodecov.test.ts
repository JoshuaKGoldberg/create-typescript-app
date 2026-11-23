import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockCodecov } from "./blockCodecov.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockCodecov, () => {
	test("without props or mode", () => {
		const creation = testBlock(blockCodecov, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Apps]",
			      "props": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block README.md]",
			      "props": {
			        "badges": [
			          {
			            "alt": "🧪 Coverage",
			            "href": "https://codecov.io/gh/test-owner/test-repository",
			            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Renovate]",
			      "props": {
			        "ignoreDeps": [
			          "codecov/codecov-action",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "actionSteps": [
			          {
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block zizmor]",
			      "props": {
			        "rules": {
			          "ref-confusion": {
			            "ignore": [
			              "ci.yaml",
			            ],
			          },
			        },
			      },
			    },
			  ],
			}
		`);
	});

	test("transition mode without files", () => {
		const creation = testBlock(blockCodecov, {
			mode: "transition",
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Apps]",
			      "props": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block README.md]",
			      "props": {
			        "badges": [
			          {
			            "alt": "🧪 Coverage",
			            "href": "https://codecov.io/gh/test-owner/test-repository",
			            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Renovate]",
			      "props": {
			        "ignoreDeps": [
			          "codecov/codecov-action",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "actionSteps": [
			          {
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block zizmor]",
			      "props": {
			        "rules": {
			          "ref-confusion": {
			            "ignore": [
			              "ci.yaml",
			            ],
			          },
			        },
			      },
			    },
			    {
			      "block": "[Block Remove Files]",
			      "props": {
			        "files": [
			          ".github/codecov.{yaml,yml}",
			          "codecov.{yaml,yml}",
			        ],
			      },
			    },
			  ],
			}
		`);
	});

	test("with codecovToken option", () => {
		const creation = testBlock(blockCodecov, {
			options: { ...optionsBase, codecovToken: true },
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Apps]",
			      "props": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block README.md]",
			      "props": {
			        "badges": [
			          {
			            "alt": "🧪 Coverage",
			            "href": "https://codecov.io/gh/test-owner/test-repository",
			            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Renovate]",
			      "props": {
			        "ignoreDeps": [
			          "codecov/codecov-action",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "actionSteps": [
			          {
			            "env": {
			              "CODECOV_TOKEN": "\${{ secrets.CODECOV_TOKEN }}",
			            },
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block zizmor]",
			      "props": {
			        "rules": {
			          "ref-confusion": {
			            "ignore": [
			              "ci.yaml",
			            ],
			          },
			        },
			      },
			    },
			  ],
			}
		`);
	});

	test("with props", () => {
		const creation = testBlock(blockCodecov, {
			options: optionsBase,
			props: {
				env: {
					CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
				},
			},
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "extensions": [
			    {
			      "block": "[Block GitHub Apps]",
			      "props": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block README.md]",
			      "props": {
			        "badges": [
			          {
			            "alt": "🧪 Coverage",
			            "href": "https://codecov.io/gh/test-owner/test-repository",
			            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block Renovate]",
			      "props": {
			        "ignoreDeps": [
			          "codecov/codecov-action",
			        ],
			      },
			    },
			    {
			      "block": "[Block Vitest]",
			      "props": {
			        "actionSteps": [
			          {
			            "env": {
			              "CODECOV_TOKEN": "\${{ secrets.CODECOV_TOKEN }}",
			            },
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			    },
			    {
			      "block": "[Block zizmor]",
			      "props": {
			        "rules": {
			          "ref-confusion": {
			            "ignore": [
			              "ci.yaml",
			            ],
			          },
			        },
			      },
			    },
			  ],
			}
		`);
	});

	describe("intake", () => {
		it("returns undefined when ci.yaml does not exist", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when ci.yaml contains invalid YAML", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": ["invalid YAML!"],
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when ci.yaml does not contain a test job", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": [
								dump({
									jobs: {
										other: {
											name: "Other",
											steps: [],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when ci.yaml contains a test job with only non-string uses", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": [
								dump({
									jobs: {
										test: {
											name: "Test",
											steps: [
												{
													uses: { not: "a string" },
												},
											],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined env when ci.yaml contains a test job with no env in its codecov step", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": [
								dump({
									jobs: {
										test: {
											name: "Test",
											steps: [
												{
													uses: "codecov/codecov-action@v3",
												},
											],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toEqual({ env: undefined });
		});

		it("returns undefined env when ci.yaml contains a test job with only the standard CODECOV_TOKEN env in its codecov step", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": [
								dump({
									jobs: {
										test: {
											name: "Test",
											steps: [
												{
													env: {
														CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
													},
													uses: "codecov/codecov-action@v3",
												},
											],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toEqual({ env: undefined });
		});

		it("returns env when ci.yaml contains a test job with other env in its codecov step", () => {
			const env = {
				CODECOV_TOKEN: "${{ secrets.OTHER_TOKEN }}",
				OTHER: "value",
			};
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yaml": [
								dump({
									jobs: {
										test: {
											name: "Test",
											steps: [
												{
													env,
													uses: "codecov/codecov-action@v3",
												},
											],
										},
									},
								}),
							],
						},
					},
				},
			});

			expect(actual).toEqual({ env });
		});
	});
});
