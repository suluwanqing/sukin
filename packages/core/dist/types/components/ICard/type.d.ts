import { UPDATE_MODEL_EVENT, CLICK_EVENT, HOVER_EVENT } from './constant';
export type CardStackItem = Record<string, any>;
export type CardStackMode = 'stack' | 'carousel' | 'peek';
export type CardStackSize = 'small' | 'medium' | 'large';
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
    (e: typeof UPDATE_MODEL_EVENT, index: number): void;
    (e: typeof CLICK_EVENT, event: MouseEvent, item: CardStackItem, index: number): void;
    (e: typeof HOVER_EVENT, event: MouseEvent, item: CardStackItem, index: number): void;
}
export interface CardStackExpose {
    setActive: (index: number) => void;
    next: () => void;
    prev: () => void;
}
