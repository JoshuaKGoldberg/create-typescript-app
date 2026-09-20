import { testBlock, testIntake } from "bingo-stratum-testers";
import { dump } from "js-yaml";
import { describe, expect, it, test } from "vitest";

import { blockCodecov } from "./blockCodecov.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockCodecov, () => {
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
			          ".github/codecov.{yaml,yml}",
			          "codecov.{yaml,yml}",
			        ],
			      },
			      "block": [Function],
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
			    {
			      "addons": {
			        "secrets": [
			          {
			            "description": "upload token from the repository's Codecov settings",
			            "name": "CODECOV_TOKEN",
			          },
			        ],
			      },
			      "block": [Function],
			    },
			  ],
			}
		`);
	});

	test("with codecovToken and codecovSecret options", () => {
		const creation = testBlock(blockCodecov, {
			options: {
				...optionsBase,
				codecovSecret: { encryptedValue: "encrypted", keyId: "key-id" },
				codecovToken: true,
			},
		});

		expect(creation.requests).toEqual([
			{
				endpoint: "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}",
				parameters: {
					encrypted_value: "encrypted",
					key_id: "key-id",
					owner: optionsBase.owner,
					repo: optionsBase.repository,
					secret_name: "CODECOV_TOKEN",
				},
				type: "octokit",
			},
		]);
		expect(creation.addons).not.toContainEqual(
			expect.objectContaining({
				addons: expect.objectContaining({ secrets: expect.anything() }),
			}),
		);
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
