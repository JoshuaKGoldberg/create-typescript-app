import { getUsageFromReadme } from "./getUsageFromReadme.js";

export async function readUsage(
	getEmoji: () => Promise<string>,
	getReadme: () => Promise<string>,
	getRepository: () => Promise<string | undefined>,
) {
	return (
		getUsageFromReadme(await getReadme()) ??
		`\`\`\`shell
npm i ${await getRepository()}
\`\`\`
\`\`\`ts
import { greet } from "${await getRepository()}";

greet("Hello, world! ${await getEmoji()}");
\`\`\``
	);
}
