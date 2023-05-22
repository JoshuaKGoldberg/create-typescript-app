import { $ } from "execa";

export async function resetGitTags() {
	const { stdout: allLocalTags } = await $`git tag -l`;

	// Create array of local tags by splitting the string at each new line and filtering out empty strings
	const allLocalTagsArray = allLocalTags.split("\n").filter(Boolean);

	// Delete all local tags if there are any
	if (allLocalTagsArray.length !== 0) {
		await $`git tag -d ${allLocalTagsArray}`;
	}
}
