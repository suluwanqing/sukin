import { SELECTION_CHANGE_EVENT, SELECTION_UPDATE_MODEL_EVENT } from "./constant"

export interface CascaderOption {
    label: string;
    value: string;
    disabled?: boolean;
    children?: CascaderOption[]; //支持嵌套子选项
}

// 定义普通选项的数据结构
export interface OptionDataItem {
    label: string;
    value: string;
    disabled?: boolean;
}

// 定义选项分组的数据结构
export interface GroupDataItem {
    label: string;
    options: OptionDataItem[];
}

// Selection 组件项的联合类型，可以是普通选项、分组或级联选项（顶级）
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