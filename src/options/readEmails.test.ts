import { describe, expect, it } from "vitest";

import { readEmails } from "./readEmails.js";

const emailCoC = "test-email-coc";
const emailGit = "test-email-git";
const emailNpm = "test-email-npm";

describe(readEmails, () => {
	it("resolves undefined when no sources provide an email", async () => {
		const actual = await readEmails(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({}),
		);

		expect(actual).toBeUndefined();
	});

	it("resolves github and npm as the code of conduct email when only the code of conduct email exists", async () => {
		const actual = await readEmails(
			() => Promise.resolve(emailCoC),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({ github: emailCoC, npm: emailCoC });
	});

	it("resolves github and npm as the npm email when only the npm email exists", async () => {
		const actual = await readEmails(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve(emailNpm),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({ github: emailNpm, npm: emailNpm });
	});

	it("resolves github as the code of conduct email and npm as the npm email when only those emails exist", async () => {
		const actual = await readEmails(
			() => Promise.resolve(emailCoC),
			() => Promise.resolve(undefined),
			() => Promise.resolve(emailNpm),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({ github: emailCoC, npm: emailNpm });
	});

	it("resolves github and npm as their emails when only those emails exist", async () => {
		const actual = await readEmails(
			() => Promise.resolve(undefined),
			() => Promise.resolve(emailGit),
			() => Promise.resolve(emailNpm),
			() => Promise.resolve({}),
		);

		expect(actual).toEqual({ github: emailGit, npm: emailNpm });
	});

	it("resolves package author email as the github and npm emails when only the package author email exists", async () => {
		const actual = await readEmails(
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve(undefined),
			() => Promise.resolve({ email: emailNpm }),
		);

		expect(actual).toEqual({ github: emailNpm, npm: emailNpm });
	});
});
