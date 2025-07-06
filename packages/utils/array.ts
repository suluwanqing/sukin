
//内部辅助函数
/**
 * 这是所有修复的基础，确保所有函数都能正确处理深层路径。
 * @param {any} obj 要查询的对象。
 * @param {string} path 点表示法的路径 (例如, 'data.uuid' 或 '.id')。
 * @returns {unknown} 检索到的值，如果路径无效则为 undefined。
 */
export const getDeepValue = (obj: any, path: string): unknown => {
    if (!obj || typeof path !== 'string') {
        return undefined;
    }
    // 正确地将 'data.uuid' 这样的路径分割为 ['data', 'uuid']
    const keys = path.replace(/^\./, '').split('.');
    return keys.reduce((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
            return (acc as Record<string, unknown>)[key];
        }
        return undefined;
    }, obj);
};

/**
 * [辅助函数] 对两个值执行深度相等检查。
 * @param {unknown} a 第一个值。
 * @param {unknown} b 第二个值。
 * @returns {boolean} 如果值深度相等，则为 true。
 */
const isEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true;
    if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
        return a === b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) return false;
        }
        return true;
    }
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
        if (
            !Object.prototype.hasOwnProperty.call(b, key) ||
            !isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
        ) {
            return false;
        }
    }
    return true;
};



/**
 * [已修复] 通过深层键路径或深度对象相等性来合并两个数组并移除重复项。
 * @template T - 数组元素的类型。
 * @param {T[]} array1 第一个数组。
 * @param {T[]} array2 第二个数组。
 * @param {string} [keyPath] 可选的用于去重的深层键路径。如果未提供，则使用完全的深度比较。
 * @returns {T[]} 合并并去重后的数组。
 */
export const deepMergeArraysByKeyPath = <T extends object>(
    array1: T[] = [],
    array2: T[] = [],
    keyPath?: string
): T[] => {
    const merged = [...(array1 || []), ...(array2 || [])];

    if (keyPath) {
        const uniqueMap = new Map<unknown, T>();
        merged.forEach(item => {
            const keyValue = getDeepValue(item, keyPath);
            if (keyValue !== undefined) {
                uniqueMap.set(keyValue, item);
            }
        });
        return Array.from(uniqueMap.values());
    }

    return merged.reduce((acc, current) => {
        const isDuplicate = acc.some(item => isEqual(item, current));
        return isDuplicate ? acc : [...acc, current];
    }, [] as T[]);
};

/**
 * 从第二个数组中获取第一个数组所没有的唯一项，基于一个深层键。
 * @template T - 数组元素的类型。
 * @param {T[]} firstArray 参考数组。
 * @param {T[]} secondArray 要筛选的数组。
 * @param {string} uniqueKeyPath 用于比较的深层键路径 (例如, 'data.uuid')。默认为 'id'。
 * @returns {T[]} 来自第二个数组的唯一项组成的数组。
 */
export const getUniqueItemsFromSecondArrayById = <T extends Record<string, any>>(
    firstArray: T[] = [],
    secondArray: T[] = [],
    uniqueKeyPath: string = 'id'
): T[] => {
    const firstArrayKeys = new Set((firstArray || []).map(item => getDeepValue(item, uniqueKeyPath)));
    return (secondArray || []).filter(item => {
        const itemKey = getDeepValue(item, uniqueKeyPath);
        return itemKey !== undefined && !firstArrayKeys.has(itemKey);
    });
};

/**
 * 使用完全深度相等检查来合并两个数组并移除重复项。
 * 此函数现在代理到 `deepMergeArraysByKeyPath` 以保持实现一致。
 * @template T - 数组元素的类型。
 * @param {T[]} firstArray 第一个数组。
 * @param {T[]} secondArray 第二个数组。
 * @returns {T[]} 合并并去重后的数组。
 */
export const mergeArraysWithoutDuplicates = <T extends Record<string, any>>(
    firstArray: T[] = [],
    secondArray: T[] = []
): T[] => {
    return deepMergeArraysByKeyPath(firstArray, secondArray);
};

/**
 *在数组中查找第一个在指定深层键路径上匹配给定值的项。
 * @param {any[]} arr 要搜索的数组。
 * @param {any} value 要匹配的值。
 * @param {string} keyPath 深层键路径 (例如, 'data.uuid')。
 * @returns {any | null} 找到的项，如果未找到则为 null。
 */
export const getItemDeep = (arr: any[], value: any, keyPath: string): any | null => {
    if (!Array.isArray(arr) || value === undefined) {
        return null;
    }
    return arr.find(item => getDeepValue(item, keyPath) == value) || null;
};

/**
 * 通过匹配其在指定深层键路径上的值来从数组中移除一个项。返回一个新数组。
 * @param {any[]} arr 要修改的数组。
 * @param {any} itemToPop 要移除的项对象。其在 keyPath 上的值将用于匹配。
 * @param {string} keyPath 深层键路径 (例如, 'data.uuid')。
 * @returns {any[]} 移除了项的新数组。
 */
export const popItemDeep = (arr: any[], itemToPop: any, keyPath: string): any[] => {
    if (!Array.isArray(arr)) {
        return [];
    }
    if (!itemToPop) {
        return [...arr]; // 如果没有指定要移除的项，则返回一个副本
    }

    const valueToPop = getDeepValue(itemToPop, keyPath);
    if (valueToPop === undefined) {
        return [...arr]; // 如果要移除的项没有该键，则不移除任何东西。
    }

    return arr.filter(item => getDeepValue(item, keyPath) !== valueToPop);
};

/**
 * 这是 `deepMergeArraysByKeyPath` 的别名，用于向后兼容。
 * @param {any[]} arr1 第一个数组。
 * @param {any[]} arr2 第二个数组。
 * @param {string} key 深层键路径。
 * @returns {any[]} 合并并去重后的数组。
 */
export const noReapeatArrayByOnlykeyDeepDouble = (arr1: any[], arr2: any[], key: string): any[] => {
    return deepMergeArraysByKeyPath(arr1, arr2, key);
};
