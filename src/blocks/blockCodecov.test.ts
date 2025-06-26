import { testBlock, testIntake } from "bingo-stratum-testers";
import jsYaml from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockCodecov } from "./blockCodecov.js";
import { optionsBase } from "./options.fakes.js";

describe("blockCodecov", () => {
	test("without addons or mode", () => {
		const creation = testBlock(blockCodecov, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "apps": [
			          {
			            "name": "Codecov",
			            "url": "https://github.com/apps/codecov",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "badges": [
			          {
			            "alt": "🧪 Coverage",
			            "href": "https://codecov.io/gh/test-owner/test-repository",
			            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			    {
			      "addons": {
			        "actionSteps": [
			          {
			            "if": "always()",
			            "uses": "codecov/codecov-action@v3",
			          },
			        ],
			      },
			      "block": [Function],
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
				  "addons": [
				    {
				      "addons": {
				        "apps": [
				          {
				            "name": "Codecov",
				            "url": "https://github.com/apps/codecov",
				          },
				        ],
				      },
				      "block": [Function],
				    },
				    {
				      "addons": {
				        "badges": [
				          {
				            "alt": "🧪 Coverage",
				            "href": "https://codecov.io/gh/test-owner/test-repository",
				            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
				          },
				        ],
				      },
				      "block": [Function],
				    },
				    {
				      "addons": {
				        "actionSteps": [
				          {
				            "if": "always()",
				            "uses": "codecov/codecov-action@v3",
				          },
				        ],
				      },
				      "block": [Function],
				    },
				    {
				      "addons": {
				        "files": [
				          ".github/codecov.yml",
				          "codecov.yml",
				        ],
				      },
				      "block": [Function],
				    },
				  ],
				}
			`);
	});

	test("with addons", () => {
		const creation = testBlock(blockCodecov, {
			addons: {
				env: {
					CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
				},
			},
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			      	{
			      	  "addons": [
			      	    {
			      	      "addons": {
			      	        "apps": [
			      	          {
			      	            "name": "Codecov",
			      	            "url": "https://github.com/apps/codecov",
			      	          },
			      	        ],
			      	      },
			      	      "block": [Function],
			      	    },
			      	    {
			      	      "addons": {
			      	        "badges": [
			      	          {
			      	            "alt": "🧪 Coverage",
			      	            "href": "https://codecov.io/gh/test-owner/test-repository",
			      	            "src": "https://img.shields.io/codecov/c/github/test-owner/test-repository?label=%F0%9F%A7%AA%20coverage",
			      	          },
			      	        ],
			      	      },
			      	      "block": [Function],
			      	    },
			      	    {
			      	      "addons": {
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
			      	      "block": [Function],
			      	    },
			      	  ],
			      	}
			      `);
	});

	describe("intake", () => {
		it("returns undefined when ci.yml does not exist", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when ci.yml contains invalid yml", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yml": ["invalid yml!"],
						},
					},
				},
			});

			expect(actual).toBeUndefined();
		});

		it("returns undefined when ci.yml does not contain a test job", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yml": [
								jsYaml.dump({
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

		it("returns undefined when ci.yml contains a test job with only non-string uses", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yml": [
								jsYaml.dump({
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

		it("returns undefined env when ci.yml contains a test job with no env in its codecov step", () => {
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yml": [
								jsYaml.dump({
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

		it("returns env when ci.yml contains a test job with env in its codecov step", () => {
			const env = {
				CODECOV_TOKEN: "${{ secrets.CODECOV_TOKEN }}",
			};
			const actual = testIntake(blockCodecov, {
				files: {
					".github": {
						workflows: {
							"ci.yml": [
								jsYaml.dump({
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
