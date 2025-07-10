import type { CardStackItem } from './type';
type EmitFn = (event: any, ...args: any[]) => void;

export const handleCardClick = (
    event: MouseEvent,
    item: CardStackItem,
    index: number,
    emit: EmitFn
) => {
    emit('click', event, item, index);
};

export const handleCardHover = (
    event: MouseEvent,
    item: CardStackItem,
    index: number,
    emit: EmitFn
) => {
    emit('hover', event, item, index);
};