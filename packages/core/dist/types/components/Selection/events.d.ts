import { SuSelectionProps, SelectionEmits, OptionDataItem, CascaderOption } from './type';
export declare function useSelection(props: Readonly<SuSelectionProps>, emit: SelectionEmits): {
    isActive: (value: string, levelIndex?: number) => boolean;
    handleSelect: (item: OptionDataItem | CascaderOption, levelIndex?: number, onSelectCallback?: () => void) => void;
    displayLabel: import('vue').ComputedRef<any>;
    selectedItems: import('vue').ComputedRef<OptionDataItem[]>;
    handleRemoveTag: (itemToRemove: OptionDataItem) => void;
    handleClear: () => void;
    hasSelected: import('vue').ComputedRef<boolean>;
    selectedLabels: import('vue').ComputedRef<string[]>;
    displayedCascaderOptions: import('vue').ComputedRef<CascaderOption[][]>;
};
