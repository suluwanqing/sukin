export interface CardStackItem {
    id?: string | number;
    [key: string]: any;
}
export type CardStackMode = 'stack' | 'carousel' | 'peek';
export type CardStackSize = 'small' | 'medium' | 'large';
export type CardStackExtraction = 'click' | 'hover' | 'none';
export interface CardStackProps {
    items: CardStackItem[];
    mode?: CardStackMode;
    activeIndex?: number;
    size?: CardStackSize;
    cardWidth?: number | string;
    cardHeight?: number | string;
    stackOffset?: number;
    stackRotate?: number;
    stackExtractedOffset?: number;
    stackExtraction?: CardStackExtraction;
    peekOffset?: number;
    peekScale?: number;
    loop?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
    pauseOnHover?: boolean;
    showNavigationButtons?: boolean;
    showIndicators?: boolean;
    showCarouselGoToFirst?: boolean;
}
export interface CardStackEmits {
    (event: 'update:activeIndex', index: number): void;
    (event: 'click', e: MouseEvent, item: CardStackItem, index: number): void;
    (event: 'hover', e: MouseEvent, item: CardStackItem, index: number): void;
}
export interface CardStackExpose {
    setActive: (index: number) => void;
    next: () => void;
    prev: () => void;
}
