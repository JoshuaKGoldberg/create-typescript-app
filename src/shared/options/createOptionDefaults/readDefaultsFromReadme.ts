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
		explainer: async () => {
			return />\n\n([\s\S]*?)\n\n## Usage/u
				.exec(await readme())?.[1]
				.split("\n")
				.map((line) => line.trim())
				.filter(Boolean);
		},

		logo: async () => {
			const tag = await imageTag();

			if (!tag) {
				return undefined;
			}

			const src = /src\s*=(.+)['"/]>/
				.exec(tag)?.[1]
				?.split(/\s*\w+=/)[0]
				.replaceAll(/^['"]|['"]$/g, "");

			if (!src) {
				return undefined;
			}

			return {
				alt:
					/alt=['"](.+)['"]\s*src=/.exec(tag)?.[1].split(/['"]?\s*\w+=/)[0] ??
					"Project logo",
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
