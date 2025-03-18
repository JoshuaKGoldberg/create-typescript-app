import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

export async function readEmailFromCodeOfConduct(take: TakeInput) {
	const codeOfConduct = await take(inputFromFile, {
		filePath: ".github/CODE_OF_CONDUCT.md",
	});

	return typeof codeOfConduct === "string" &&
		codeOfConduct.includes("Contributor Covenant Code of Conduct")
		? /for enforcement at[\r\n]+(.+)\.[\r\n]+All/.exec(codeOfConduct)?.[1]
		: undefined;
}
