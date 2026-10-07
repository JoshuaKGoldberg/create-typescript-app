import { z } from "zod";

import { base } from "../base.ts";
import { blockCSpell } from "./blockCSpell.ts";
import { blockDevelopmentDocs } from "./blockDevelopmentDocs.ts";
import { blockESLint } from "./blockESLint.ts";
import { blockGitHubActionsCI } from "./blockGitHubActionsCI.ts";
import { blockGitignore } from "./blockGitignore.ts";
import { blockKnip } from "./blockKnip.ts";
import { blockPackageJson } from "./blockPackageJson.ts";
import { blockPrettier } from "./blockPrettier.ts";
import { blockTypeScript } from "./blockTypeScript.ts";
import { blockVitest } from "./blockVitest.ts";
import { getScriptFileExtension } from "./eslint/getScriptFileExtension.ts";
import { intakeFile } from "./intake/intakeFile.ts";

// In the order of precedence Next.js uses when several exist
const nextConfigFileNames = [
	"next.config.js",
	"next.config.mjs",
	"next.config.ts",
	"next.config.mts",
];

const defaultNextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		// Type checking already runs separately with pnpm tsc
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
`;

export const blockNextJs = base.createBlock({
	about: {
		name: "NextJS",
	},
	addons: {
		nextConfig: z
			.object({ contents: z.string(), fileName: z.string() })
			.optional(),
	},
	intake({ files }) {
		const fileName = nextConfigFileNames.find((name) => name in files);
		if (!fileName) {
			return undefined;
		}

		const nextConfig = intakeFile(files, [fileName]);

		return nextConfig && { nextConfig: { contents: nextConfig[0], fileName } };
	},
	produce({ addons, options }) {
		return {
			addons: [
				blockCSpell({
					ignorePaths: [".next", "*.tsbuildinfo", "next-env.d.ts"],
				}),
				blockDevelopmentDocs({
					sections: {
						Building: {
							contents: `
Run [Next.js](https://nextjs.org) locally to start a development server that rebuilds as you save files:

\`\`\`shell
pnpm dev
\`\`\`

Next.js also generates the route types that \`pnpm lint\` and \`pnpm tsc\` check against.
Run \`pnpm next typegen\` to generate them without starting a server.
`,
							innerSections: [
								{
									contents: `
Run Next.js to create an optimized production build in \`.next/\`:

\`\`\`shell
pnpm build
\`\`\`

Then start a server for that production build:

\`\`\`shell
pnpm start
\`\`\`
`,
									heading: "Production Builds",
								},
							],
						},
					},
				}),
				blockESLint({
					beforeLintSteps: [{ run: "pnpm next typegen" }],
					extensions: [
						{
							extends: ['next.configs["core-web-vitals"]'],
							files: [getScriptFileExtension(options)],
						},
					],
					ignores: [".next", "next-env.d.ts"],
					imports: [
						{
							source: {
								packageName: "@next/eslint-plugin-next",
								version: "^16.4.0",
							},
							specifier: "next",
						},
					],
					scriptFileExtensions: ["tsx"],
				}),
				blockGitHubActionsCI({
					jobs: [
						{
							name: "Build",
							steps: [{ run: "pnpm build" }],
						},
					],
				}),
				blockGitignore({
					ignores: ["/.next", "/next-env.d.ts", "*.tsbuildinfo"],
				}),
				blockKnip({
					project: ["src/**/*.tsx"],
				}),
				blockPackageJson({
					properties: {
						dependencies: {
							next: "^16.4.0",
							react: "^19.3.0",
							"react-dom": "^19.3.0",
						},
						devDependencies: {
							"@types/react": "^19.3.0",
							"@types/react-dom": "^19.3.0",
						},
						// Sites are deployed rather than published to npm
						private: true,
						scripts: {
							build: "next build",
							dev: "next dev",
							start: "next start",
						},
					},
				}),
				blockPrettier({
					// Next.js may generate an AGENTS.md for AI coding agents
					ignores: ["/.next", "/AGENTS.md", "/next-env.d.ts"],
				}),
				blockTypeScript({
					beforeTypeCheckSteps: [{ run: "pnpm next typegen" }],
					// next/* imports only resolve with these, as next has no package exports
					compilerOptions: {
						module: "esnext",
						moduleResolution: "bundler",
					},
					// Next.js rewrites tsconfig.json on build if these are missing
					compilerOptionsDefaults: {
						allowJs: true,
						incremental: true,
						isolatedModules: true,
						jsx: "react-jsx",
						lib: ["dom", "dom.iterable", "esnext"],
						plugins: [{ name: "next" }],
					},
					exclude: ["node_modules"],
					include: [
						"next-env.d.ts",
						".next/types/**/*.ts",
						".next/dev/types/**/*.ts",
					],
				}),
				blockVitest({
					exclude: [".next"],
				}),
			],
			files: {
				...(addons.nextConfig
					? { [addons.nextConfig.fileName]: addons.nextConfig.contents }
					: { "next.config.ts": defaultNextConfig }),
			},
		};
	},
	setup({ options }) {
		return {
			files: {
				src: {
					app: {
						// Next.js builds fail without at least one page
						"layout.tsx": `import type { Metadata } from "next";

export const metadata: Metadata = {
	description: ${JSON.stringify(options.description)},
	title: ${JSON.stringify(options.title)},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
`,
						"page.tsx": `import { greet } from "../index.ts";

export default function Home() {
	const messages: string[] = [];

	greet({
		logger: (message) => messages.push(message),
		message: "Hello, world!",
	});

	return <h1>{messages.join(" ")}</h1>;
}
`,
					},
				},
			},
		};
	},
});
