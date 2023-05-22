import { setup } from "./setup.js";

process.exitCode = await setup(process.argv.slice(2));
