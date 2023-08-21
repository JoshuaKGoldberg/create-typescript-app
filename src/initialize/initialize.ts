import { runOrRestore } from "../shared/runOrRestore.js";
import { initializeWithInformation } from "./initializeWithInformation.js";

export async function initialize(args: string[]) {
	return await runOrRestore({
		args,
		label: "initialization",
		run: initializeWithInformation,
	});
}
