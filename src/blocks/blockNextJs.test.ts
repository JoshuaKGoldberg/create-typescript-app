import { testBlock } from "bingo-stratum-testers";
import { describe, expect, test } from "vitest";

import { blockNextJs } from "./blockNextJs.ts";
import { optionsBase } from "./options.fakes.ts";

describe("blockNextJs", () => {
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
			        "ignores": [
			          ".next",
			          "next-env.d.ts",
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
			          "/next-env.d.ts",
			        ],
			      },
			      "block": "[Block Prettier]",
			    },
			    {
			      "addons": {
			        "compilerOptions": {
			          "allowJs": true,
			          "incremental": true,
			          "isolatedModules": true,
			          "jsx": "react-jsx",
			          "lib": [
			            "DOM",
			            "DOM.Iterable",
			            "ESNext",
			          ],
			          "module": "ESNext",
			          "moduleResolution": "Bundler",
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
});
