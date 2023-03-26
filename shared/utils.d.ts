export declare function sleep(ms: number, props?: any): Promise<unknown>;
export declare function upsert<T, CmpT>(array: T[], elem: T, selector: (el: T) => CmpT): void;
export declare const arrayRange: (start: number, stop: number, step?: number) => number[];
export declare function getRandom<T>(arr: T[], n: number): T[];
