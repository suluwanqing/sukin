import { SuSelectionProps, SelectionItem } from './type';
declare const _default: import('vue').DefineComponent<SuSelectionProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (value: any) => any;
    "update:modelValue": (value: any) => any;
}, string, import('vue').PublicProps, Readonly<SuSelectionProps> & Readonly<{
    onChange?: ((value: any) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {
    size: "large" | "default" | "small";
    mode: "box" | "dropdown" | "list";
    disabled: boolean;
    items: SelectionItem[];
    placeholder: string;
    multiple: boolean;
    shape: "round" | "square";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    selectionRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
