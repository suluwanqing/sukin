export interface OptionDataItem {
    value: string | number;
    label: string;
    disabled?: boolean;
}
export interface GroupDataItem {
    type: 'group';
    label: string;
}
export type SelectionItem = OptionDataItem | GroupDataItem;
export interface SuSelectionProps {
    modelValue: any;
    items: SelectionItem[];
    multiple?: boolean;
    disabled?: boolean;
    size?: 'large' | 'default' | 'small';
    shape?: 'round' | 'square';
    mode?: 'box' | 'dropdown' | 'list';
    placeholder?: string;
}
export interface SuOptionProps {
    item: OptionDataItem;
    active: boolean;
}
export interface SelectionEmits {
    (e: 'update:modelValue', value: any): void;
    (e: 'change', value: any): void;
}
