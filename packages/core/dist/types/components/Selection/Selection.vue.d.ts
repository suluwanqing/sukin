import { SuSelectionProps, SelectionItem } from './type';
declare const _default: import('vue').DefineComponent<SuSelectionProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (value: string | string[] | null | undefined) => any;
    "update:modelValue": (value: string | string[] | null | undefined) => any;
}, string, import('vue').PublicProps, Readonly<SuSelectionProps> & Readonly<{
    onChange?: ((value: string | string[] | null | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | string[] | null | undefined) => any) | undefined;
}>, {
    size: import('packages/core').SelectionSize;
    mode: import('packages/core').SelectionMode;
    disabled: boolean;
    items: SelectionItem[];
    placeholder: string;
    multiple: boolean;
    shape: import('packages/core').SelectionShape;
    clearable: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    selectionRef: HTMLDivElement;
    selectionPanelRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
