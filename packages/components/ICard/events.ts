import type { CardStackItem } from './type';
import { CLICK_EVENT, HOVER_EVENT } from './constant';
type EmitFn = (event: any, ...args: any[]) => void;

export const handleCardClick = (
    event: MouseEvent,
    item: CardStackItem,
    index: number,
    emit: EmitFn
) => {
    emit(CLICK_EVENT, event, item, index);
};

export const handleCardHover = (
    event: MouseEvent,
    item: CardStackItem,
    index: number,
    emit: EmitFn
) => {
    emit(HOVER_EVENT, event, item, index);
};