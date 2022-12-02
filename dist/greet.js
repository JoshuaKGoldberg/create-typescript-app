export function greet(options) {
    const { logger = console.log.bind(console), message, times = 1, } = typeof options === "string" ? { message: options } : options;
    for (let i = 0; i < times; i += 1) {
        logger(message);
    }
}
//# sourceMappingURL=greet.js.map