import { Component, ComputedRef, Ref } from 'vue';
export type CardType = "drawer" | "tiled" | "sector";
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
}
export interface ICardInstance {
    ref: Ref<HTMLDivElement | undefined>;
    type?: ComputedRef<string>;
    disabled?: boolean;
    data?: Array<any>;
}
