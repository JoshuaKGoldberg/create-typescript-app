import { base } from "../base.js";
import { blockExampleFiles } from "./blockExampleFiles.js";

export const blockGreetExampleFiles = base.createBlock({
	about: {
		name: "Greet Example Files",
	},
	setup() {
		return {
			addons: [
				blockExampleFiles({
					files: {
						"greet.ts": `import { GreetOptions } from "./types.js";
					
					export function greet(options: GreetOptions | string) {
						const {
							logger = console.log.bind(console),
							message,
							times = 1,
						} = typeof options === "string" ? { message: options } : options;
					
						for (let i = 0; i < times; i += 1) {
							logger(message);
						}
					}
					`,
						"index.ts": `export * from "./greet.js";
				export * from "./types.js";
				`,
						"types.ts": `export interface GreetOptions {
						logger?: (message: string) => void;
						message: string;
						times?: number;
					}
					`,
					},
				}),
			],
		};
	},
	// TODO: Make produce() optional, so this empty-ish produce() can be removed
	// https://github.com/JoshuaKGoldberg/bingo/issues/295
	produce() {
		return {};
	},
});
