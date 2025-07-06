import { SuSelectionProps, SelectionEmits, OptionDataItem } from './type';
export declare function useSelection(props: Readonly<SuSelectionProps>, emit: SelectionEmits): {
    isActive: (item: OptionDataItem) => boolean;
    handleSelect: (item: OptionDataItem, onSelectCallback?: () => void) => void;
    displayLabel: import('vue').ComputedRef<string>;
};
