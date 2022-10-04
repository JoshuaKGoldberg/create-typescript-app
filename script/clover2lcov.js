import { toLcov } from "clover2lcov";
import { promises as fs } from "fs";

const original = await fs.readFile("./coverage/clover.xml");
const converted = await toLcov(original);

await fs.writeFile("./coverage/lcov.info", converted);
