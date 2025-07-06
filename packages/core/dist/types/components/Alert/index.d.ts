export declare const SuAlert: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').AlertProps> & Readonly<{
        onClose?: (() => any) | undefined;
    }>, {
        close(): void;
        open(): void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        close: () => any;
    }, import('vue').PublicProps, {
        type: import('packages/core').AlertType;
        effect: "light" | "dark";
        closable: boolean;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').AlertProps> & Readonly<{
        onClose?: (() => any) | undefined;
    }>, {
        close(): void;
        open(): void;
    }, {}, {}, {}, {
        type: import('packages/core').AlertType;
        effect: "light" | "dark";
        closable: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').AlertProps> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    close(): void;
    open(): void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    close: () => any;
}, string, {
    type: import('packages/core').AlertType;
    effect: "light" | "dark";
    closable: boolean;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        title?(_: {}): any;
        default?(_: {}): any;
    };
}) & import('vue').Plugin;
export * from './type';
