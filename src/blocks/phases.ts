// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable perfectionist/sort-objects */

export const CommandPhase = {
	Migrations: 0,
	Install: 1,
	Build: 2,
	Process: 3,
	Format: 4,
} as const;
