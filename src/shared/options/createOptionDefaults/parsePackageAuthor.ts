import parse from "parse-author";

import { PartialPackageData } from "../../types.js";

export function parsePackageAuthor(packageData: PartialPackageData) {
	let packageAuthor: string | undefined;
	let packageEmail: string | undefined;

	if (typeof packageData.author === "string") {
		const parsedAuthor = parse(packageData.author);
		packageAuthor = parsedAuthor.name;
		packageEmail = parsedAuthor.email;
	} else if (packageData.author) {
		packageAuthor = packageData.author.name;
		packageEmail = packageData.author.email;
	}

	return {
		author: packageAuthor,
		email: packageEmail,
	};
}
