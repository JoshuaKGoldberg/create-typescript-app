import { PartialPackageData } from "../../types.js";

export function parsePackageAuthor(packageData: PartialPackageData) {
	const [packageAuthor, packageEmail] =
		typeof packageData.author === "string"
			? [
					packageData.author.split("<")[0].trim(),
					packageData.author.split(/<|>/)[1]?.trim(),
			  ]
			: [packageData.author?.name, packageData.author?.email];

	return {
		author: packageAuthor,
		email: packageEmail,
	};
}
