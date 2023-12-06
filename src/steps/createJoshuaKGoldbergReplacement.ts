import { Options } from "../shared/types.js";

export const createJoshuaKGoldbergReplacement = (
	options: Pick<Options, "owner" | "repository">,
) =>
	[
		/JoshuaKGoldberg(?:\/(.+))?/g,
		(full: string, capture: string | undefined) =>
			capture
				? // If this was a "JoshuaKGoldberg/..." repository link,
				  // swap the owner if it's the repository being migrated.
				  capture.startsWith(options.repository)
					? `${options.owner}/${capture}`
					: full
				: // Otherwise it's just "JoshuaKGoldberg" standalone,
				  // so swap to the new owner.
				  options.owner,
	] as const;
