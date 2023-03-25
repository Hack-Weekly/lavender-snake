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
