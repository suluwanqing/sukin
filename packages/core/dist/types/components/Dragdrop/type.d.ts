export interface DragDropItem {
    id: string | number;
    name?: string;
    label?: string;
    UNIQUEKEYDATA?: string;
    [key: string]: any;
}
export interface DragDropProps {
    items: DragDropItem[];
    onlykey?: string;
    showCount?: boolean;
}
export interface ItemProps {
    item: DragDropItem;
    removable?: boolean;
}
export interface DragDropEmits {
    (e: 'change', payload: {
        source: DragDropItem[];
        placed: DragDropItem[];
    }): void;
}
