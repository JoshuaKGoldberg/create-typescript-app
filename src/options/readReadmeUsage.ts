import { readUsageFromReadme } from "./readUsageFromReadme.js";

export async function readReadmeUsage(
	getEmoji: () => Promise<string>,
	getReadme: () => Promise<string>,
	getRepository: () => Promise<string | undefined>,
) {
	return (
		readUsageFromReadme(await getReadme()) ??
		`\`\`\`shell
npm i ${await getRepository()}
\`\`\`
\`\`\`ts
import { greet } from "${await getRepository()}";

greet("Hello, world! ${await getEmoji()}");
\`\`\``
	);
}
