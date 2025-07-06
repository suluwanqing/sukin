import { type Component, type ComputedRef, type Ref } from "vue";
export type CardType = "drawer" | "tiled" | "sector"
export type Direction = "horizontal" | "vertical";
export type CardSize = "small" | "medium" | "large";

export interface ICardProps {
    tag?: string | Component;
    type?: CardType;
    size?: CardSize;
    disabled?: boolean;
    defaultActive?: Number;
    direction?: Direction;
    data?: Array<any>;
}


export interface ICardGroupContext {
    type?: CardType;
    disabled?: boolean;
    loading?: boolean;
    size?: CardSize;
    data: Array<any>;
}

export interface ICardEmits {
    (e: 'click', event: MouseEvent): void;
    // 可以添加其他事件
    // (e: 'custom-event', data: SomeType): void;
}

export interface ICardInstance {
    ref: Ref<HTMLDivElement | undefined>;
    type?: ComputedRef<string>;
    disabled?: boolean;
    data?: Array<any>;
}