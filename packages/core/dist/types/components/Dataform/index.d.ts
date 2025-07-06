export declare const SuDataform: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').FormPanelProps> & Readonly<{
        onClose?: (() => any) | undefined;
        onSubmit?: ((formType: string, data: Record<string, any>) => any) | undefined;
    }>, {
        resetForm: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        close: () => any;
        submit: (formType: string, data: Record<string, any>) => any;
    }, import('vue').PublicProps, {
        size: "small" | "medium" | "large";
        direction: "horizontal" | "vertical";
        backgroundImage: string;
        sections: import('packages/core').FormSection[];
        initialForm: string;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').FormPanelProps> & Readonly<{
        onClose?: (() => any) | undefined;
        onSubmit?: ((formType: string, data: Record<string, any>) => any) | undefined;
    }>, {
        resetForm: () => void;
    }, {}, {}, {}, {
        size: "small" | "medium" | "large";
        direction: "horizontal" | "vertical";
        backgroundImage: string;
        sections: import('packages/core').FormSection[];
        initialForm: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').FormPanelProps> & Readonly<{
    onClose?: (() => any) | undefined;
    onSubmit?: ((formType: string, data: Record<string, any>) => any) | undefined;
}>, {
    resetForm: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    close: () => any;
    submit: (formType: string, data: Record<string, any>) => any;
}, string, {
    size: "small" | "medium" | "large";
    direction: "horizontal" | "vertical";
    backgroundImage: string;
    sections: import('packages/core').FormSection[];
    initialForm: string;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
