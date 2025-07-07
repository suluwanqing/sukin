export declare const SuIcard: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('./type').CardStackProps> & Readonly<{
        onClick?: ((e: MouseEvent, item: import('./type').CardStackItem, index: number) => any) | undefined;
        onHover?: ((e: MouseEvent, item: import('./type').CardStackItem, index: number) => any) | undefined;
        "onUpdate:activeIndex"?: ((index: number) => any) | undefined;
    }>, {
        setActive: (index: number) => void;
        next: () => void;
        prev: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
        click: (e: MouseEvent, item: import('./type').CardStackItem, index: number) => any;
        hover: (e: MouseEvent, item: import('./type').CardStackItem, index: number) => any;
        "update:activeIndex": (index: number) => any;
    }, import('vue').PublicProps, {
        size: import('./type').CardStackSize;
        mode: import('./type').CardStackMode;
        activeIndex: number;
        cardWidth: number | string;
        cardHeight: number | string;
        stackOffset: number;
        stackRotate: number;
        stackExtractedOffset: number;
        stackExtraction: import('./type').CardStackExtraction;
        peekOffset: number;
        peekScale: number;
        loop: boolean;
        autoplay: boolean;
        autoplayInterval: number;
        pauseOnHover: boolean;
        showNavigationButtons: boolean;
        showIndicators: boolean;
        showCarouselGoToFirst: boolean;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('./type').CardStackProps> & Readonly<{
        onClick?: ((e: MouseEvent, item: import('./type').CardStackItem, index: number) => any) | undefined;
        onHover?: ((e: MouseEvent, item: import('./type').CardStackItem, index: number) => any) | undefined;
        "onUpdate:activeIndex"?: ((index: number) => any) | undefined;
    }>, {
        setActive: (index: number) => void;
        next: () => void;
        prev: () => void;
    }, {}, {}, {}, {
        size: import('./type').CardStackSize;
        mode: import('./type').CardStackMode;
        activeIndex: number;
        cardWidth: number | string;
        cardHeight: number | string;
        stackOffset: number;
        stackRotate: number;
        stackExtractedOffset: number;
        stackExtraction: import('./type').CardStackExtraction;
        peekOffset: number;
        peekScale: number;
        loop: boolean;
        autoplay: boolean;
        autoplayInterval: number;
        pauseOnHover: boolean;
        showNavigationButtons: boolean;
        showIndicators: boolean;
        showCarouselGoToFirst: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('./type').CardStackProps> & Readonly<{
    onClick?: ((e: MouseEvent, item: import('./type').CardStackItem, index: number) => any) | undefined;
    onHover?: ((e: MouseEvent, item: import('./type').CardStackItem, index: number) => any) | undefined;
    "onUpdate:activeIndex"?: ((index: number) => any) | undefined;
}>, {
    setActive: (index: number) => void;
    next: () => void;
    prev: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (e: MouseEvent, item: import('./type').CardStackItem, index: number) => any;
    hover: (e: MouseEvent, item: import('./type').CardStackItem, index: number) => any;
    "update:activeIndex": (index: number) => any;
}, string, {
    size: import('./type').CardStackSize;
    mode: import('./type').CardStackMode;
    activeIndex: number;
    cardWidth: number | string;
    cardHeight: number | string;
    stackOffset: number;
    stackRotate: number;
    stackExtractedOffset: number;
    stackExtraction: import('./type').CardStackExtraction;
    peekOffset: number;
    peekScale: number;
    loop: boolean;
    autoplay: boolean;
    autoplayInterval: number;
    pauseOnHover: boolean;
    showNavigationButtons: boolean;
    showIndicators: boolean;
    showCarouselGoToFirst: boolean;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        default?(_: {
            item: import('./type').CardStackItem;
            index: number;
            isActive: boolean;
        }): any;
    };
}) & import('vue').Plugin;
