import { hydrate } from "./hydrate.js";

process.exitCode = await hydrate(process.argv.slice(2));
