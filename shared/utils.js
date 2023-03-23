export function sleep(ms, props = undefined) {
    var _a;
    let res;
    (_a = props === null || props === void 0 ? void 0 : props.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", () => {
        res();
    });
    return new Promise((resolve, reject) => {
        res = resolve;
        setTimeout(resolve, ms);
    });
}
