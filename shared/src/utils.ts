export function sleep(ms: number, props: any = undefined) {
  let res: any;
  props?.signal?.addEventListener("abort", () => {
    res();
  });
  return new Promise((resolve, reject) => {
    res = resolve;
    setTimeout(resolve, ms);
  });
}

export function upsert<T, CmpT>(
  array: T[],
  elem: T,
  selector: (el: T) => CmpT
) {
  const cmp = selector(elem);
  const i = array.findIndex((_element) => selector(_element) === cmp);
  if (i > -1) array[i] = elem;
  else array.push(elem);
}

export const arrayRange = (start: number, stop: number, step: number = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

export function getRandom<T>(arr: T[], n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result as T[];
}
