import { CardStackItem } from './type';
type EmitFn = (event: any, ...args: any[]) => void;
export declare const handleCardClick: (event: MouseEvent, item: CardStackItem, index: number, emit: EmitFn) => void;
export declare const handleCardHover: (event: MouseEvent, item: CardStackItem, index: number, emit: EmitFn) => void;
export {};
