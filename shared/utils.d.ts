export declare function sleep(ms: number, props?: any): Promise<unknown>;
export declare function upsert<T, CmpT>(array: T[], elem: T, selector: (el: T) => CmpT): void;
