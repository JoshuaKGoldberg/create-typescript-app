import readline from "readline";

export function startLineWithDots(line: string) {
	let dots = 0;
	let lastLogged!: string;
	let timer: NodeJS.Timeout;

	function clearLine() {
		readline.clearLine(process.stdout, -1);
		readline.moveCursor(process.stdout, -lastLogged.length, 0);
	}

	function writeLine() {
		dots = (dots + 1) % 4;

		const toLog = `${line}${".".repeat(dots)}`;

		process.stdout.write(toLog);

		lastLogged = toLog;

		return toLog;
	}

	function tick() {
		clearLine();
		writeLine();
		timer = setTimeout(tick, 500);
	}

	writeLine();
	setTimeout(tick, 500);

	return () => {
		clearLine();
		clearInterval(timer);
		return lastLogged.length;
	};
}
