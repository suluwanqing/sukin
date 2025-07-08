export declare const SuListform: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').SuFormProps> & Readonly<{
        onSubmit?: ((payload: import('packages/core').FormState) => any) | undefined;
        onReset?: (() => any) | undefined;
        onCancel?: (() => any) | undefined;
        "onUpdate:model"?: ((payload: import('packages/core').FormState) => any) | undefined;
        "onFile-change"?: ((payload: {
            fieldName: string;
            file: File | null;
        }) => any) | undefined;
        "onFile-clear"?: ((payload: {
            fieldName: string;
        }) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        submit: (payload: import('packages/core').FormState) => any;
        reset: () => any;
        cancel: () => any;
        "update:model": (payload: import('packages/core').FormState) => any;
        "file-change": (payload: {
            fieldName: string;
            file: File | null;
        }) => any;
        "file-clear": (payload: {
            fieldName: string;
        }) => any;
    }, import('vue').PublicProps, {
        title: string;
        fields: import('packages/core').Field[];
        func: import('packages/core').FormAction[];
        model: {
            [key: string]: any;
        };
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').SuFormProps> & Readonly<{
        onSubmit?: ((payload: import('packages/core').FormState) => any) | undefined;
        onReset?: (() => any) | undefined;
        onCancel?: (() => any) | undefined;
        "onUpdate:model"?: ((payload: import('packages/core').FormState) => any) | undefined;
        "onFile-change"?: ((payload: {
            fieldName: string;
            file: File | null;
        }) => any) | undefined;
        "onFile-clear"?: ((payload: {
            fieldName: string;
        }) => any) | undefined;
    }>, {}, {}, {}, {}, {
        title: string;
        fields: import('packages/core').Field[];
        func: import('packages/core').FormAction[];
        model: {
            [key: string]: any;
        };
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').SuFormProps> & Readonly<{
    onSubmit?: ((payload: import('packages/core').FormState) => any) | undefined;
    onReset?: (() => any) | undefined;
    onCancel?: (() => any) | undefined;
    "onUpdate:model"?: ((payload: import('packages/core').FormState) => any) | undefined;
    "onFile-change"?: ((payload: {
        fieldName: string;
        file: File | null;
    }) => any) | undefined;
    "onFile-clear"?: ((payload: {
        fieldName: string;
    }) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    submit: (payload: import('packages/core').FormState) => any;
    reset: () => any;
    cancel: () => any;
    "update:model": (payload: import('packages/core').FormState) => any;
    "file-change": (payload: {
        fieldName: string;
        file: File | null;
    }) => any;
    "file-clear": (payload: {
        fieldName: string;
    }) => any;
}, string, {
    title: string;
    fields: import('packages/core').Field[];
    func: import('packages/core').FormAction[];
    model: {
        [key: string]: any;
    };
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
