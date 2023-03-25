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
export function upsert(array, elem, selector) {
    const cmp = selector(elem);
    const i = array.findIndex((_element) => selector(_element) === cmp);
    if (i > -1)
        array[i] = elem;
    else
        array.push(elem);
}
