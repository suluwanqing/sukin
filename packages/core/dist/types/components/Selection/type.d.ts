import { SELECTION_CHANGE_EVENT, SELECTION_UPDATE_MODEL_EVENT } from './constant';
export interface CascaderOption {
    label: string;
    value: string;
    disabled?: boolean;
    children?: CascaderOption[];
}
export interface OptionDataItem {
    label: string;
    value: string;
    disabled?: boolean;
}
export interface GroupDataItem {
    label: string;
    options: OptionDataItem[];
}
export type SelectionItem = OptionDataItem | GroupDataItem | CascaderOption;
export type SelectionMode = 'box' | 'dropdown' | 'cascader';
export type SelectionSize = 'large' | 'default' | 'small';
export type SelectionShape = 'round' | 'square';
export interface SuSelectionProps {
    modelValue?: string | string[] | null;
    items: SelectionItem[];
    multiple?: boolean;
    disabled?: boolean;
    size?: SelectionSize;
    shape?: SelectionShape;
    mode?: SelectionMode;
    placeholder?: string;
    clearable?: boolean;
}
export interface SelectionEmits {
    (event: typeof SELECTION_UPDATE_MODEL_EVENT, value: string | string[] | undefined | null): void;
    (event: typeof SELECTION_CHANGE_EVENT, value: string | string[] | undefined | null): void;
}
export interface SuOptionProps {
    item: OptionDataItem;
    active: boolean;
}
