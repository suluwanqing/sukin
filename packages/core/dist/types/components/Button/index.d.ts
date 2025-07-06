export * from './types';
export declare const SuButton: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').ButtonProps> & Readonly<{
        onClick?: ((event: MouseEvent) => any) | undefined;
    }>, {
        ref: import('vue').Ref<HTMLButtonElement | undefined>;
        disabled?: import('vue').ComputedRef<boolean>;
        size?: import('vue').ComputedRef<string>;
        type?: import('vue').ComputedRef<string>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        click: (event: MouseEvent) => any;
    }, import('vue').PublicProps, {
        tag: string | import('vue').Component;
        nativeType: import('packages/core').NativeType;
        useThrottle: boolean;
        throttleDuration: number;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        _ref: unknown;
    }, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').ButtonProps> & Readonly<{
        onClick?: ((event: MouseEvent) => any) | undefined;
    }>, {
        ref: import('vue').Ref<HTMLButtonElement | undefined>;
        disabled?: import('vue').ComputedRef<boolean>;
        size?: import('vue').ComputedRef<string>;
        type?: import('vue').ComputedRef<string>;
    }, {}, {}, {}, {
        tag: string | import('vue').Component;
        nativeType: import('packages/core').NativeType;
        useThrottle: boolean;
        throttleDuration: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').ButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
}>, {
    ref: import('vue').Ref<HTMLButtonElement | undefined>;
    disabled?: import('vue').ComputedRef<boolean>;
    size?: import('vue').ComputedRef<string>;
    type?: import('vue').ComputedRef<string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (event: MouseEvent) => any;
}, string, {
    tag: string | import('vue').Component;
    nativeType: import('packages/core').NativeType;
    useThrottle: boolean;
    throttleDuration: number;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: Readonly<Record<string, any>> & Record<string, any>;
}) & import('vue').Plugin;
export declare const SuButtonGroup: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, import('vue').PublicProps, {}, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {}): any;
    };
}) & import('vue').Plugin;
