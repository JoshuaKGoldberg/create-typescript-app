import { BaseOptions } from "../base.js";

export const optionsBase = {
	access: "public",
	description: "Test description",
	directory: ".",
	documentation: {
		readme: {
			usage: "Test usage.",
		},
	},
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	emoji: "💖",
	node: {
		minimum: "20.12.0",
	},
	owner: "test-owner",
	preset: "minimal",
	repository: "test-repository",
	title: "Test Title",
} satisfies BaseOptions;
