import lazyValue from "lazy-value";
import { titleCase } from "title-case";

import { readLogoSizing } from "../readLogoSizing.js";
import { getUsageFromReadme } from "./getUsageFromReadme.js";

export function readDefaultsFromReadme(
	readme: () => Promise<string>,
	repository: () => Promise<string | undefined>,
) {
	const imageTag = lazyValue(
		async () => /\n<img.+src=.+>/.exec(await readme())?.[0],
	);

	return {
		logo: async () => {
			const tag = await imageTag();

			if (!tag) {
				return undefined;
			}

			const src = /src\s*=(.+)['"/]>/
				.exec(tag)?.[1]
				?.replaceAll(/^['"]|['"]$/g, "");

			if (!src) {
				return undefined;
			}

			return {
				alt: /alt=['"](.+)['"]\s*src=/.exec(tag)?.[1] ?? "Project logo",
				src,
				...readLogoSizing(src),
			};
		},
		title: async () => {
			const text = await readme();
			const fromText = (/^<h1\s+align="center">(.+)<\/h1>/.exec(text) ??
				/^# (.+)/.exec(text))?.[1];
			if (fromText) {
				return fromText;
			}

			const repositoryValue = await repository();

			return (
				repositoryValue &&
				titleCase(repositoryValue)
					.replaceAll("Typescript", "TypeScript")
					.replaceAll("-", " ")
			);
		},

		usage: async () => {
			return (
				getUsageFromReadme(await readme()) ??
				`\`\`\`shell
npm i ${await repository()}
\`\`\`
\`\`\`ts
import { greet } from "${await repository()}";

greet("Hello, world! 💖");
\`\`\``
			);
		},
	};
}
