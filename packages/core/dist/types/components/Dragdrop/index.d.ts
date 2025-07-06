export declare const SuDragDrop: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<Partial<import('packages/core').DragDropProps>> & Readonly<{
        onChange?: ((payload: {
            source: import('packages/core').DragDropItem[];
            placed: import('packages/core').DragDropItem[];
        }) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        change: (payload: {
            source: import('packages/core').DragDropItem[];
            placed: import('packages/core').DragDropItem[];
        }) => any;
    }, import('vue').PublicProps, {
        items: import('packages/core').DragDropItem[];
        onlykey: string;
        showCount: boolean;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<Partial<import('packages/core').DragDropProps>> & Readonly<{
        onChange?: ((payload: {
            source: import('packages/core').DragDropItem[];
            placed: import('packages/core').DragDropItem[];
        }) => any) | undefined;
    }>, {}, {}, {}, {}, {
        items: import('packages/core').DragDropItem[];
        onlykey: string;
        showCount: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<Partial<import('packages/core').DragDropProps>> & Readonly<{
    onChange?: ((payload: {
        source: import('packages/core').DragDropItem[];
        placed: import('packages/core').DragDropItem[];
    }) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (payload: {
        source: import('packages/core').DragDropItem[];
        placed: import('packages/core').DragDropItem[];
    }) => any;
}, string, {
    items: import('packages/core').DragDropItem[];
    onlykey: string;
    showCount: boolean;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
