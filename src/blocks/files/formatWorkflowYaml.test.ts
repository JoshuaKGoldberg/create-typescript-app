import { describe, expect, it } from "vitest";

import { formatWorkflowYaml } from "./formatWorkflowYaml.ts";

describe(formatWorkflowYaml, () => {
	it("does not add blank lines when there is only one job", () => {
		const actual = formatWorkflowYaml({
			jobs: {
				build: {
					"runs-on": "ubuntu-latest",
					steps: [{ run: "pnpm build" }],
				},
			},
			name: "Build",
			on: { push: { branches: ["main"] } },
		});

		expect(actual).toMatchInlineSnapshot(`
			"jobs:
			  build:
			    runs-on: ubuntu-latest
			    steps:
			      - run: pnpm build

			name: Build

			on:
			  push:
			    branches:
			      - main
			"
		`);
	});

	it("separates jobs with blank lines when there are multiple jobs", () => {
		const actual = formatWorkflowYaml({
			jobs: {
				build: {
					"runs-on": "ubuntu-latest",
					steps: [{ run: "pnpm build" }],
				},
				lint: {
					"runs-on": "ubuntu-latest",
					steps: [{ run: "pnpm lint" }],
				},
				test: {
					"runs-on": "ubuntu-latest",
					steps: [{ run: "pnpm test" }],
				},
			},
			name: "CI",
			on: { pull_request: null, push: { branches: ["main"] } },
		});

		expect(actual).toMatchInlineSnapshot(`
			"jobs:
			  build:
			    runs-on: ubuntu-latest
			    steps:
			      - run: pnpm build

			  lint:
			    runs-on: ubuntu-latest
			    steps:
			      - run: pnpm lint

			  test:
			    runs-on: ubuntu-latest
			    steps:
			      - run: pnpm test

			name: CI

			on:
			  pull_request: ~
			  push:
			    branches:
			      - main
			"
		`);
	});

	it("does not add blank lines between keys outside of jobs", () => {
		const actual = formatWorkflowYaml({
			concurrency: { group: "${{ github.workflow }}" },
			jobs: {
				release: {
					"runs-on": "ubuntu-latest",
					steps: [{ run: "pnpm release" }],
				},
			},
			name: "Release",
			on: {
				pull_request: { branches: ["main"] },
				push: { branches: ["main"] },
				workflow_dispatch: null,
			},
		});

		expect(actual).toMatchInlineSnapshot(`
			"concurrency:
			  group: \${{ github.workflow }}

			jobs:
			  release:
			    runs-on: ubuntu-latest
			    steps:
			      - run: pnpm release

			name: Release

			on:
			  pull_request:
			    branches:
			      - main
			  push:
			    branches:
			      - main
			  workflow_dispatch: ~
			"
		`);
	});
});
