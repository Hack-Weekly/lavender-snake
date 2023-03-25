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
export const arrayRange = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
export function getRandom(arr, n) {
    var result = new Array(n), len = arr.length, taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
