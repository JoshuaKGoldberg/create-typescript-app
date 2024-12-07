export function isUsingCreateEngine() {
	return (
		!!process.env.CTA_CREATE_ENGINE && Boolean(process.env.CTA_CREATE_ENGINE)
	);
}
