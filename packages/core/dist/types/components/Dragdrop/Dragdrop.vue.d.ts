import { DragDropProps, DragDropItem } from './type';
declare const _default: import('vue').DefineComponent<Partial<DragDropProps>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    change: (payload: {
        source: DragDropItem[];
        placed: DragDropItem[];
    }) => any;
}, string, import('vue').PublicProps, Readonly<Partial<DragDropProps>> & Readonly<{
    onChange?: ((payload: {
        source: DragDropItem[];
        placed: DragDropItem[];
    }) => any) | undefined;
}>, {
    items: DragDropItem[];
    onlykey: string;
    showCount: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
