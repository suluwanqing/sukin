import { ScheduleTableProps } from './type';
declare const _default: import('vue').DefineComponent<ScheduleTableProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "export-data": (data: import('packages/core').ExportData) => any;
}, string, import('vue').PublicProps, Readonly<ScheduleTableProps> & Readonly<{
    "onExport-data"?: ((data: import('packages/core').ExportData) => any) | undefined;
}>, {
    size: "small" | "medium" | "large";
    draggableItems: import('packages/core').DraggableItem[];
    metaInfo: import('packages/core').MetaInfo[];
    labels: import('packages/core').Label[];
    gridStructure: number[];
    orientation: "horizontal" | "vertical";
    quantityKey: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    canvasContainerRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
