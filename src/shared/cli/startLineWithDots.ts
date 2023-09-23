import readline from "readline";

export function startLineWithDots(line: string) {
	const timer = [setTimeout(tick, 500)];
	let dots = 0;
	let lastLogged!: string;

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
		timer[0] = setTimeout(tick, 500);
	}

	writeLine();

	return () => {
		clearLine();
		clearInterval(timer[0]);
		return lastLogged.length;
	};
}
