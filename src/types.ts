export interface GreetOptions {
	logger?: (message: string) => void;
	message: string;
	times?: number;
}

export type IntentionallyUnusedToBreakBuild = 123;
