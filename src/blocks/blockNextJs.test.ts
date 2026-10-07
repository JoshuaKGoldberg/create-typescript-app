import { testBlock, testIntake } from "bingo-stratum-testers";
import { describe, expect, it, test } from "vitest";

import { blockNextJs } from "./blockNextJs.ts";
import { optionsBase } from "./options.fakes.ts";

describe(blockNextJs, () => {
	test("production", () => {
		const creation = testBlock(blockNextJs, {
			options: optionsBase,
		});

		expect(creation).toMatchInlineSnapshot(`
			{
			  "addons": [
			    {
			      "addons": {
			        "ignorePaths": [
			          ".next",
			          "*.tsbuildinfo",
			          "next-env.d.ts",
			        ],
			      },
			      "block": "[Block CSpell]",
			    },
			    {
			      "addons": {
			        "sections": {
			          "Building": {
			            "contents": "
			Run [Next.js](https://nextjs.org) locally to start a development server that rebuilds as you save files:

			\`\`\`shell
			pnpm dev
			\`\`\`

			Next.js also generates the route types that \`pnpm lint\` and \`pnpm tsc\` check against.
			Run \`pnpm next typegen\` to generate them without starting a server.
			",
			            "innerSections": [
			              {
			                "contents": "
			Run Next.js to create an optimized production build in \`.next/\`:

			\`\`\`shell
			pnpm build
			\`\`\`

			Then start a server for that production build:

			\`\`\`shell
			pnpm start
			\`\`\`
			",
			                "heading": "Production Builds",
			              },
			            ],
			          },
			        },
			      },
			      "block": "[Block Development Docs]",
			    },
			    {
			      "addons": {
			        "beforeLintSteps": [
			          {
			            "run": "pnpm next typegen",
			          },
			        ],
			        "extensions": [
			          {
			            "extends": [
			              "next.configs["core-web-vitals"]",
			            ],
			            "files": [
			              "**/*.{js,ts}",
			            ],
			          },
			        ],
			        "ignores": [
			          ".next",
			          "next-env.d.ts",
			        ],
			        "imports": [
			          {
			            "source": {
			              "packageName": "@next/eslint-plugin-next",
			              "version": "^16.4.0",
			            },
			            "specifier": "next",
			          },
			        ],
			        "scriptFileExtensions": [
			          "tsx",
			        ],
			      },
			      "block": "[Block ESLint]",
			    },
			    {
			      "addons": {
			        "jobs": [
			          {
			            "name": "Build",
			            "steps": [
			              {
			                "run": "pnpm build",
			              },
			            ],
			          },
			        ],
			      },
			      "block": "[Block GitHub Actions CI]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/.next",
			          "/next-env.d.ts",
			          "*.tsbuildinfo",
			        ],
			      },
			      "block": "[Block Gitignore]",
			    },
			    {
			      "addons": {
			        "project": [
			          "src/**/*.tsx",
			        ],
			      },
			      "block": "[Block Knip]",
			    },
			    {
			      "addons": {
			        "properties": {
			          "dependencies": {
			            "next": "^16.4.0",
			            "react": "^19.3.0",
			            "react-dom": "^19.3.0",
			          },
			          "devDependencies": {
			            "@types/react": "^19.3.0",
			            "@types/react-dom": "^19.3.0",
			          },
			          "private": true,
			          "scripts": {
			            "build": "next build",
			            "dev": "next dev",
			            "start": "next start",
			          },
			        },
			      },
			      "block": "[Block Package JSON]",
			    },
			    {
			      "addons": {
			        "ignores": [
			          "/.next",
			          "/AGENTS.md",
			          "/next-env.d.ts",
			        ],
			      },
			      "block": "[Block Prettier]",
			    },
			    {
			      "addons": {
			        "beforeTypeCheckSteps": [
			          {
			            "run": "pnpm next typegen",
			          },
			        ],
			        "compilerOptions": {
			          "module": "esnext",
			          "moduleResolution": "bundler",
			        },
			        "compilerOptionsDefaults": {
			          "allowJs": true,
			          "incremental": true,
			          "isolatedModules": true,
			          "jsx": "react-jsx",
			          "lib": [
			            "dom",
			            "dom.iterable",
			            "esnext",
			          ],
			          "plugins": [
			            {
			              "name": "next",
			            },
			          ],
			        },
			        "exclude": [
			          "node_modules",
			        ],
			        "include": [
			          "next-env.d.ts",
			          ".next/types/**/*.ts",
			          ".next/dev/types/**/*.ts",
			        ],
			      },
			      "block": "[Block TypeScript]",
			    },
			    {
			      "addons": {
			        "exclude": [
			          ".next",
			        ],
			      },
			      "block": "[Block Vitest]",
			    },
			  ],
			  "files": {
			    "next.config.ts": "import type { NextConfig } from "next";

			const nextConfig: NextConfig = {
				typescript: {
					// Type checking already runs separately with pnpm tsc
					ignoreBuildErrors: true,
				},
			};

			export default nextConfig;
			",
			  },
			}
		`);
	});

	test("setup mode", () => {
		const creation = testBlock(blockNextJs, {
			mode: "setup",
			options: optionsBase,
		});

		expect(creation.files).toMatchInlineSnapshot(`
			{
			  "next.config.ts": "import type { NextConfig } from "next";

			const nextConfig: NextConfig = {
				typescript: {
					// Type checking already runs separately with pnpm tsc
					ignoreBuildErrors: true,
				},
			};

			export default nextConfig;
			",
			  "src": {
			    "app": {
			      "layout.tsx": "import type { Metadata } from "next";

			export const metadata: Metadata = {
				description: "Test description",
				title: "Test Title",
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
			",
			      "page.tsx": "import { greet } from "../index.ts";

			export default function Home() {
				const messages: string[] = [];

				greet({
					logger: (message) => messages.push(message),
					message: "Hello, world!",
				});

				return <h1>{messages.join(" ")}</h1>;
			}
			",
			    },
			  },
			}
		`);
	});

	test("transition mode", () => {
		const creation = testBlock(blockNextJs, {
			mode: "transition",
			options: optionsBase,
		});

		// Starter pages are only created in setup mode
		expect(Object.keys(creation.files ?? {})).toEqual(["next.config.ts"]);
	});

	test("with a nextConfig addon", () => {
		const nextConfig = `export default { reactCompiler: true };\n`;

		const creation = testBlock(blockNextJs, {
			addons: { nextConfig },
			options: optionsBase,
		});

		expect(creation.files?.["next.config.ts"]).toBe(nextConfig);
	});

	describe("intake", () => {
		it("returns undefined when next.config.ts does not exist", () => {
			const actual = testIntake(blockNextJs, {
				files: {},
			});

			expect(actual).toBeUndefined();
		});

		it("returns nextConfig when next.config.ts exists", () => {
			const nextConfig = `export default { reactCompiler: true };\n`;

			const actual = testIntake(blockNextJs, {
				files: {
					"next.config.ts": [nextConfig],
				},
			});

			expect(actual).toEqual({ nextConfig });
		});
	});
});
