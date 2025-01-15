import lazyValue from "lazy-value";

import { tryCatchAsync } from "./tryCatchAsync.js";

export function tryCatchLazyValueAsync<T>(get: () => Promise<T>) {
	return lazyValue(async () => await tryCatchAsync(get));
}
