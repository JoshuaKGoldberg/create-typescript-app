import * as util from "node:util";

export const clearLine = util.promisify(
	process.stdout.clearLine.bind(process.stdout),
);

export const clearScreenDown = util.promisify(
	process.stdout.clearScreenDown.bind(process.stdout),
);

export const moveCursor = util.promisify(
	process.stdout.moveCursor.bind(process.stdout),
);

export const write = util.promisify(process.stdout.write.bind(process.stdout));
