import { getUsageFromReadme } from "./getUsageFromReadme.js";

export async function readUsage(
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

greet("Hello, world! 💖");
\`\`\``
	);
}
