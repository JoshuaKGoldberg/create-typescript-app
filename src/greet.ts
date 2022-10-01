import { GreetOptions } from "./types";

export function greet({
  logger = console.log.bind(console),
  message,
  times = 1,
}: GreetOptions) {
  for (let i = 0; i < times; i += 1) {
    logger(message);
  }
}
