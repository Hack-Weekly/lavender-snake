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
