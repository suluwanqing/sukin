import { CardStackProps, CardStackItem, CardStackSize } from './type';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {
            item: CardStackItem;
            index: number;
            isActive: boolean;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<CardStackProps, {
    setActive: (index: number) => void;
    next: () => void;
    prev: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    click: (e: MouseEvent, item: CardStackItem, index: number) => any;
    hover: (e: MouseEvent, item: CardStackItem, index: number) => any;
    "update:activeIndex": (index: number) => any;
}, string, import('vue').PublicProps, Readonly<CardStackProps> & Readonly<{
    onClick?: ((e: MouseEvent, item: CardStackItem, index: number) => any) | undefined;
    onHover?: ((e: MouseEvent, item: CardStackItem, index: number) => any) | undefined;
    "onUpdate:activeIndex"?: ((index: number) => any) | undefined;
}>, {
    size: CardStackSize;
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
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
