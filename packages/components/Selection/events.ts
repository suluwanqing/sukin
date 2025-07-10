import { ref, computed, watch, toRef, type Ref } from 'vue';
import type { SuSelectionProps, SelectionEmits, OptionDataItem, GroupDataItem, CascaderOption } from './type';


// 封装 SuSelection 组件的核心逻辑
export function useSelection(
    props: Readonly<SuSelectionProps>,
    emit: SelectionEmits
) {
    const modelValue = toRef(props, 'modelValue');
    const multiple = toRef(props, 'multiple') as Ref<boolean>;
    const placeholder = toRef(props, 'placeholder') as Ref<string>;
    const items = toRef(props, 'items');
    const mode = toRef(props, 'mode');

    // 内部维护的选中值（单选/多选模式）或选中路径（级联模式）
    const internalSelectedValues = ref<string[]>([]);
    // 级联模式下，内部维护的当前展开路径
    const internalExpandedPath = ref<string[]>([]);

    // 同步外部 modelValue 到内部状态
    watch(modelValue, (newVal) => {
        if (mode.value === 'cascader') {
            // 级联模式：modelValue 期望是 string[] 或 null/undefined
            if (!Array.isArray(newVal) || newVal === null || newVal.length === 0) {
                internalSelectedValues.value = [];
                internalExpandedPath.value = [];
            } else {
                internalSelectedValues.value = [...newVal];
                internalExpandedPath.value = [...newVal];
            }
        } else {
            // 单选/多选模式：modelValue 期望是 string 或 string[] 或 null/undefined
            if (newVal === undefined || newVal === null || newVal === '') {
                internalSelectedValues.value = [];
            } else if (Array.isArray(newVal)) {
                internalSelectedValues.value = newVal as string[];
            } else {
                internalSelectedValues.value = [newVal as string];
            }
        }
    }, { immediate: true, deep: true });

    // 扁平化所有选项，用于单选/多选模式下的快速查找 (不适用于级联模式)
    const allFlatOptions = computed<OptionDataItem[]>(() => {
        if (mode.value === 'cascader') return []; // 级联模式不使用此扁平化
        return items.value.flatMap(item => {
            if ('value' in item) { // OptionDataItem 或 CascaderOption
                // 确保只扁平化顶层选项，或者分组内的选项
                if ('options' in item) { // GroupDataItem
                    return (item as GroupDataItem).options || [];
                }
                // CascaderOption 也可能有 children，但在这个扁平化上下文中，只考虑其自身
                return [item as OptionDataItem];
            } else { // GroupDataItem
                return (item as GroupDataItem).options || [];
            }
        });
    });

    // 为单选/多选模式创建 Map 用于快速查找 OptionDataItem
    const flatItemValueMap = computed(() => {
        if (mode.value === 'cascader') return new Map();
        return new Map(
            allFlatOptions.value.map(item => [item.value, item])
        );
    });

    // 为级联模式构建选项映射，便于通过路径查找
    const cascaderOptionMap = computed(() => {
        const map = new Map<string, CascaderOption>();
        const traverse = (options: CascaderOption[]) => {
            options.forEach(option => {
                map.set(option.value, option);
                if (option.children) {
                    traverse(option.children);
                }
            });
        };
        // 确保 items.value 是 CascaderOption[] 类型用于遍历
        traverse(items.value as CascaderOption[]);
        return map;
    });

    // 计算当前选中的选项对象数组 (单选/多选模式下用于标签显示)
    const selectedItems = computed<OptionDataItem[]>(() => {
        if (mode.value === 'cascader') {
            return []; // 级联模式不使用此计算属性
        }
        return internalSelectedValues.value
            .map(value => flatItemValueMap.value.get(value))
            .filter((item): item is OptionDataItem => item !== undefined);
    });

    // 计算级联模式下触发器显示的标签路径
    const selectedLabels = computed<string[]>(() => {
        if (mode.value !== 'cascader') return [];
        const labels: string[] = [];
        let currentItems: CascaderOption[] = items.value as CascaderOption[];

        for (const selectedValue of internalSelectedValues.value) {
            const item = currentItems.find(i => i.value === selectedValue);
            if (item) {
                labels.push(item.label);
                if (item.children) {
                    currentItems = item.children;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        return labels;
    });

    // 计算级联模式下显示的选项列
    const displayedCascaderOptions = computed<CascaderOption[][]>(() => {
        if (mode.value !== 'cascader') return [];
        const columns: CascaderOption[][] = [];
        let currentLevelItems = items.value as CascaderOption[];

        columns.push(currentLevelItems);

        for (const selectedValue of internalExpandedPath.value) {
            const selectedItem = currentLevelItems.find(item => item.value === selectedValue);
            if (selectedItem && selectedItem.children && selectedItem.children.length > 0) {
                columns.push(selectedItem.children);
                currentLevelItems = selectedItem.children;
            } else {
                break;
            }
        }
        return columns;
    });

    // 判断选项是否激活（选中）
    const isActive = (value: string, levelIndex?: number): boolean => {
        if (mode.value === 'cascader' && levelIndex !== undefined) {
            return internalSelectedValues.value[levelIndex] === value;
        }
        return internalSelectedValues.value.includes(value);
    };

    // 处理选项选择逻辑 (统一处理单选、多选和级联)
    const handleSelect = (item: OptionDataItem | CascaderOption, levelIndex?: number, onSelectCallback?: () => void) => {
        if (props.disabled || item.disabled) return;

        if (mode.value === 'cascader') {
            const cascaderItem = item as CascaderOption;
            const currentPath = internalExpandedPath.value.slice(0, levelIndex);
            currentPath.push(cascaderItem.value);

            if (!cascaderItem.children || cascaderItem.children.length === 0) {
                // 选中叶子节点，确定最终路径并关闭
                internalSelectedValues.value = currentPath;
                internalExpandedPath.value = currentPath;
                emit('update:modelValue', internalSelectedValues.value);
                emit('change', internalSelectedValues.value);
                onSelectCallback?.(); // 通常用于关闭 dropdown
            } else {
                // 选中非叶子节点，更新展开路径
                internalExpandedPath.value = currentPath;
                // 同时更新选中路径，以便当回退选择上级时，下级被清空
                internalSelectedValues.value = currentPath; // 级联模式下每次点击都更新路径
            }
        } else {
            const flatItem = item as OptionDataItem;
            let newSelectedValues: string[];

            if (multiple.value) {
                const currentIndex = internalSelectedValues.value.indexOf(flatItem.value);
                if (currentIndex > -1) {
                    newSelectedValues = internalSelectedValues.value.filter(val => val !== flatItem.value);
                } else {
                    newSelectedValues = [...internalSelectedValues.value, flatItem.value];
                }
            } else {
                newSelectedValues = internalSelectedValues.value.includes(flatItem.value) ? [] : [flatItem.value];
            }

            internalSelectedValues.value = newSelectedValues;
            const emittedValue = multiple.value ? newSelectedValues : (newSelectedValues[0] || null);
            emit('update:modelValue', emittedValue);
            emit('change', emittedValue);
            onSelectCallback?.();
        }
    };

    // 移除单个多选标签 (仅用于多选模式)
    const handleRemoveTag = (itemToRemove: OptionDataItem) => {
        if (props.disabled || mode.value !== 'dropdown' || !multiple.value) return;
        const newSelectedValues = internalSelectedValues.value.filter(val => val !== itemToRemove.value);
        internalSelectedValues.value = newSelectedValues;
        emit('update:modelValue', newSelectedValues);
        emit('change', newSelectedValues);
    };

    // 清除所有选中项 (适用于 dropdown/cascader 模式)
    const handleClear = () => {
        if (props.disabled) return;
        internalSelectedValues.value = [];
        internalExpandedPath.value = []; // 级联模式也清空展开路径

        let emittedValue: string | string[] | null = null;
        if (mode.value === 'cascader') {
            emittedValue = null;
        } else if (multiple.value) {
            emittedValue = [];
        } else {
            emittedValue = null;
        }

        emit('update:modelValue', emittedValue);
        emit('change', emittedValue);
    };

    // 计算并返回显示在触发器中的文本 (单选/多选模式的 placeholder 或选中文本)
    const displayLabel = computed(() => {
        if (mode.value === 'cascader') {
            return selectedLabels.value.join(' / ') || (placeholder.value || '请选择');
        }
        if (multiple.value) {
            return internalSelectedValues.value.length === 0 ? (placeholder.value || '请选择') : '';
        } else {
            const selectedItem = flatItemValueMap.value.get(internalSelectedValues.value[0]);
            return selectedItem?.label || (placeholder.value || '请选择');
        }
    });

    // 判断是否有选中项
    const hasSelected = computed(() => internalSelectedValues.value.length > 0);
    // 由于这这些相互依赖性强这样导出
    return {
        isActive,
        handleSelect,
        displayLabel,
        selectedItems,
        handleRemoveTag,
        handleClear,
        hasSelected,
        // 级联模式特有返回
        selectedLabels,
        displayedCascaderOptions,
    };
}