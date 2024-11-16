import { BaseOptions } from "../base.js";

export const optionsBase = {
	access: "public",
	description: "Test description",
	email: {
		github: "github@email.com",
		npm: "npm@email.com",
	},
	owner: "test-owner",
	repository: "test-repository",
	title: "Test Title",
} satisfies BaseOptions;
