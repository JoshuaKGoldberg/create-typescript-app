import { GreetOptions } from "./types.js";

const boundConsoleLog = console.log.bind(console);

export function greet(options: GreetOptions | string) {
	const {
		logger = boundConsoleLog,
		message,
		times = 1,
	} = typeof options === "string" ? { message: options } : options;

	for (let i = 0; i < times; i += 1) {
		logger(message);
	}
}
