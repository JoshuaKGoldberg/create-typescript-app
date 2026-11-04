import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";
import { z } from "zod";

import { parseDefineConfig } from "../utils/parseDefineConfig.ts";
import { swallowError } from "../utils/swallowError.ts";

const zViteConfig = z.object({
	build: z.object({
		lib: z.record(z.string(), z.unknown()),
		rolldownOptions: z
			.object({
				output: z
					.object({ preserveModules: z.boolean().optional() })
					.optional(),
			})
			.optional(),
	}),
});

export async function readBundle(take: TakeInput) {
	return (await readTSDownBundle(take)) ?? (await readViteBundle(take));
}

async function readDefineConfig(take: TakeInput, filePath: string) {
	const contents = swallowError(await take(inputFromFile, { filePath }));

	return contents ? parseDefineConfig(contents) : undefined;
}

async function readTSDownBundle(take: TakeInput) {
	const data = await readDefineConfig(take, "tsdown.config.ts");

	// tsdown bundles by default, so only an explicit unbundle: true opts out
	return data && data.unbundle !== true;
}

async function readViteBundle(take: TakeInput) {
	const { data } = zViteConfig.safeParse(
		await readDefineConfig(take, "vite.config.ts"),
	);

	// Vite bundles by default, so only an explicit preserveModules: true opts out
	return data && data.build.rolldownOptions?.output?.preserveModules !== true;
}
