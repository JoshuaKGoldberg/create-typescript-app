import { ExecaError, Result } from "execa";
import npmUser from "npm-user";

// TODO: npmUser does not go through take(input*), making it harder to test.
// The next refactor here should add an input.

export async function readNpmDefaults(
	getWhoami: () => Promise<ExecaError | Result>,
) {
	const whoami = await getWhoami();
	return typeof whoami.stdout === "string"
		? await npmUser(whoami.stdout)
		: undefined;
}
