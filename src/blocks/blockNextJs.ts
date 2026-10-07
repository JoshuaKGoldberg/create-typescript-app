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

export const blockNextJs = base.createBlock({
	about: {
		name: "NextJS",
	},
	produce({ options }) {
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
					ignores: ["/.next", "/next-env.d.ts"],
				}),
				// Next.js rewrites tsconfig.json on build if these are missing
				blockTypeScript({
					compilerOptions: {
						allowJs: true,
						incremental: true,
						isolatedModules: true,
						jsx: "react-jsx",
						lib: ["DOM", "DOM.Iterable", "ESNext"],
						module: "ESNext",
						moduleResolution: "Bundler",
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
				"next.config.ts": `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		// Type checking already runs separately with pnpm tsc
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
`,
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
