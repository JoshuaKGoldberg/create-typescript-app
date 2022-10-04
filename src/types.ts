export interface GreetOptions {
	message: string;
	logger?: (message: string) => void;
	times?: number;
}

export type IntentionallyUnusedToBreakBuild = 123;
