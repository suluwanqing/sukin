export declare const getDeepValue: (obj: any, path: string) => unknown;
export declare const deepMergeArraysByKeyPath: <T extends object>(array1?: T[], array2?: T[], keyPath?: string) => T[];
export declare const getUniqueItemsFromSecondArrayById: <T extends Record<string, any>>(firstArray?: T[], secondArray?: T[], uniqueKeyPath?: string) => T[];
export declare const mergeArraysWithoutDuplicates: <T extends Record<string, any>>(firstArray?: T[], secondArray?: T[]) => T[];
export declare const getItemDeep: (arr: any[], value: any, keyPath: string) => any | null;
export declare const popItemDeep: (arr: any[], itemToPop: any, keyPath: string) => any[];
export declare const noReapeatArrayByOnlykeyDeepDouble: (arr1: any[], arr2: any[], key: string) => any[];
