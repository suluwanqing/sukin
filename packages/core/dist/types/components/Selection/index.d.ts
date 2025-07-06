export declare const SuSelection: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').SuSelectionProps> & Readonly<{
        onChange?: ((value: any) => any) | undefined;
        "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        change: (value: any) => any;
        "update:modelValue": (value: any) => any;
    }, import('vue').PublicProps, {
        size: "large" | "default" | "small";
        mode: "box" | "dropdown" | "list";
        disabled: boolean;
        items: import('packages/core').SelectionItem[];
        placeholder: string;
        multiple: boolean;
        shape: "round" | "square";
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        selectionRef: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').SuSelectionProps> & Readonly<{
        onChange?: ((value: any) => any) | undefined;
        "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    }>, {}, {}, {}, {}, {
        size: "large" | "default" | "small";
        mode: "box" | "dropdown" | "list";
        disabled: boolean;
        items: import('packages/core').SelectionItem[];
        placeholder: string;
        multiple: boolean;
        shape: "round" | "square";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').SuSelectionProps> & Readonly<{
    onChange?: ((value: any) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (value: any) => any;
    "update:modelValue": (value: any) => any;
}, string, {
    size: "large" | "default" | "small";
    mode: "box" | "dropdown" | "list";
    disabled: boolean;
    items: import('packages/core').SelectionItem[];
    placeholder: string;
    multiple: boolean;
    shape: "round" | "square";
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
