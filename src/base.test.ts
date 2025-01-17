import { produceBase } from "create";
import { readFile } from "fs/promises";
import { describe, expect, test } from "vitest";

import { base } from "./base.js";
import { AllContributorsData } from "./types.js";

describe("base", () => {
	test("production from create-typescript-app", async () => {
		const options = await produceBase(base);

		expect(options).toEqual({
			access: "public",
			author: "Josh Goldberg ✨",
			bin: "bin/index.js",
			contributors: (
				JSON.parse(
					(await readFile(".all-contributorsrc")).toString(),
				) as AllContributorsData
			).contributors,
			description:
				"Quickstart-friendly TypeScript template with comprehensive, configurable, opinionated tooling. 🎁",
			documentation: "",
			email: {
				github: "github@joshuakgoldberg.com",
				npm: "npm@joshuakgoldberg.com",
			},
			explainer: [
				`\`create-typescript-app\` is a one-stop-shop solution to set up a new or existing repository with the latest and greatest TypeScript tooling.`,
				`It includes options not just for building and testing but also automated release management, contributor recognition, GitHub repository settings, and more.`,
			],
			funding: "JoshuaKGoldberg",
			guide: {
				href: "https://www.joshuakgoldberg.com/blog/contributing-to-a-create-typescript-app-repository",
				title: "Contributing to a create-typescript-app Repository",
			},
			login: "Josh Goldberg ✨",
			logo: {
				alt: "Project logo: the TypeScript blue square with rounded corners, but a plus sign instead of 'TS'",
				height: 128,
				src: "./docs/create-typescript-app.png",
				width: 128,
			},
			node: {
				minimum: expect.any(String),
				pinned: expect.any(String),
			},
			owner: "JoshuaKGoldberg",
			packageData: expect.any(Object),
			repository: "create-typescript-app",
			title: "Create TypeScript App",
			usage: expect.any(String),
			version: expect.any(String),
		});
	});
});
