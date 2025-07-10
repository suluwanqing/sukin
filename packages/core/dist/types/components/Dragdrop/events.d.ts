import { Ref } from 'vue';
import { DragDropItem, DragDropProps } from './type';
export declare function useDragDrop(sourceItems: Ref<DragDropItem[]>, placedItems: Ref<DragDropItem[]>, props: Readonly<Partial<DragDropProps>>, emit: (event: 'change', payload: {
    source: DragDropItem[];
    placed: DragDropItem[];
}) => void): {
    onDragStart: (event: DragEvent, item: DragDropItem) => void;
    onDrop: (event: DragEvent) => void;
    onItemRemove: (itemToRemove: DragDropItem) => void;
};
