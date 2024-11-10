export function isUsingNextCreateEngine() {
	return (
		!!process.env.USE_NEXT_CREATE_ENGINE &&
		Boolean(process.env.USE_NEXT_CREATE_ENGINE)
	);
}
