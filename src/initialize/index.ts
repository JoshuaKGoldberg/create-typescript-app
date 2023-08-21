import { initialize } from "./initialize.js";

process.exitCode = await initialize(process.argv.slice(2));
