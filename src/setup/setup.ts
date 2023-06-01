import { runOrRestore } from "../shared/runOrRestore.js";
import { setupWithInformation } from "./setupWithInformation.js";

export async function setup(args: string[]) {
	return await runOrRestore({
		args,
		label: "setup",
		run: setupWithInformation,
	});
}
