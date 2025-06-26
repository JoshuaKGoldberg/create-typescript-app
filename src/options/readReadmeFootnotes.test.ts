import { describe, expect, it } from "vitest";

import { readReadmeFootnotes } from "./readReadmeFootnotes.js";

describe(readReadmeFootnotes, () => {
	it("resolves undefined when there is no existing readme content", async () => {
		const getReadme = () => Promise.resolve("");

		const result = await readReadmeFootnotes(getReadme);

		expect(result).toBeUndefined();
	});

	it("resolves undefined when there is no templated by notice", async () => {
		const getReadme = () => Promise.resolve(`# My Package`);

		const result = await readReadmeFootnotes(getReadme);

		expect(result).toBeUndefined();
	});

	it("resolves undefined when there is no content after a quote templated by notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package
			
> 💖 This package was templated with etc. etc.

`);

		const result = await readReadmeFootnotes(getReadme);

		expect(result).toBeUndefined();
	});

	it("resolves the content when there plain text content after a quote templated by notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package
			
> 💖 This package was templated with etc. etc.

After.
`);

		const result = await readReadmeFootnotes(getReadme);

		expect(result).toBe("After.");
	});

	it("resolves the content when there are footnotes after a quote templated by notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package
			
> 💖 This package was templated with etc. etc.

[^1]: After.
`);

		const result = await readReadmeFootnotes(getReadme);

		expect(result).toBe("[^1]: After.");
	});

	it("resolves the content when there are footnotes after a comment and quote templated by notice", async () => {
		const getReadme = () =>
			Promise.resolve(`# My Package

<!-- You can remove this notice etc. etc. -->

> 💖 This package was templated with etc. etc.

[^1]: After.
`);

		const result = await readReadmeFootnotes(getReadme);

		expect(result).toBe("[^1]: After.");
	});
});
