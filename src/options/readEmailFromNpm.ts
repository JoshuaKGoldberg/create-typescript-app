import { UserInfo } from "npm-user";

export async function readEmailFromNpm(
	getNpmDefaults: () => Promise<undefined | UserInfo>,
	getPackageAuthor: () => Promise<{ email: string | undefined }>,
) {
	return (await getNpmDefaults())?.email ?? (await getPackageAuthor()).email;
}
