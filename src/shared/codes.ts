export const StatusCodes = {
	Cancelled: 2,
	Failure: 1,
	Success: 0,
} as const;

export type StatusCode = (typeof StatusCodes)[keyof typeof StatusCodes];
