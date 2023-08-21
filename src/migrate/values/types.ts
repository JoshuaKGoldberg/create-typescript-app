import { InputValues } from "../../shared/inputs.js";

export interface HydrationInputValues extends InputValues {
	author: string;
	email: string;
}

export interface PartialPackageData {
	author?: { email: string; name: string } | string;
	description?: string;
	email?: string;
	name?: string;
	repository?: string;
}
