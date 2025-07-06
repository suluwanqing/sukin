export declare const SuSelection: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').SuSelectionProps> & Readonly<{
        onChange?: ((value: string | string[] | null | undefined) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | string[] | null | undefined) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        change: (value: string | string[] | null | undefined) => any;
        "update:modelValue": (value: string | string[] | null | undefined) => any;
    }, import('vue').PublicProps, {
        size: import('packages/core').SelectionSize;
        mode: import('packages/core').SelectionMode;
        disabled: boolean;
        items: import('packages/core').SelectionItem[];
        placeholder: string;
        multiple: boolean;
        shape: import('packages/core').SelectionShape;
        clearable: boolean;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        selectionRef: HTMLDivElement;
        selectionPanelRef: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').SuSelectionProps> & Readonly<{
        onChange?: ((value: string | string[] | null | undefined) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | string[] | null | undefined) => any) | undefined;
    }>, {}, {}, {}, {}, {
        size: import('packages/core').SelectionSize;
        mode: import('packages/core').SelectionMode;
        disabled: boolean;
        items: import('packages/core').SelectionItem[];
        placeholder: string;
        multiple: boolean;
        shape: import('packages/core').SelectionShape;
        clearable: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').SuSelectionProps> & Readonly<{
    onChange?: ((value: string | string[] | null | undefined) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | string[] | null | undefined) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (value: string | string[] | null | undefined) => any;
    "update:modelValue": (value: string | string[] | null | undefined) => any;
}, string, {
    size: import('packages/core').SelectionSize;
    mode: import('packages/core').SelectionMode;
    disabled: boolean;
    items: import('packages/core').SelectionItem[];
    placeholder: string;
    multiple: boolean;
    shape: import('packages/core').SelectionShape;
    clearable: boolean;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
