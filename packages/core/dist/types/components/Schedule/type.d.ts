import { Ref } from 'vue';
export interface DraggableItem {
    name: string;
    label: string;
    [key: string]: any;
}
export interface ProcessedDraggableItem extends DraggableItem {
    remaining: number;
    disabled: boolean;
}
export interface Label {
    label: string;
}
export interface MetaInfo {
    label: string;
}
export type GridCellContents = Record<string, DraggableItem | null>;
export interface ScheduleProps {
    draggableItems?: DraggableItem[];
    metaInfo?: MetaInfo[];
    labels?: Label[];
    gridStructure?: number[];
    direction?: 'horizontal' | 'vertical';
    size?: 'small' | 'medium' | 'large';
    quantityKey?: string;
}
export interface ExportData {
    gridContents: GridCellContents;
    labels: Label[];
    metaInfo: MetaInfo[];
    gridStructure: number[];
    layout: {
        direction: 'horizontal' | 'vertical';
    };
}
export type ScheduleEmits = {
    'export-data': [data: ExportData];
};
export interface EventContext {
    props: Readonly<ScheduleProps>;
    emit: (event: 'export-data', data: ExportData) => void;
    gridCellContents: Ref<GridCellContents>;
    itemUsage: Ref<Record<string, number>>;
    quantityKey: string;
}
export interface ScheduleTheme {
    fontFamily: string;
    backgroundColor: string;
    padding: number;
    gap: number;
    container: {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        borderRadius: number;
    };
    header: {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        borderRadius: number;
        font: {
            size: number;
            weight: string;
            color: string;
            family: string;
        };
    };
    meta: {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        borderRadius: number;
        font: {
            size: number;
            weight: string;
            color: string;
            family: string;
        };
    };
    cell: {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        borderStyle: string;
        borderRadius: number;
        placeholder: {
            text: string;
            size: number;
            weight: string;
            color: string;
            family: string;
        };
    };
    droppedItem: {
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        borderRadius: number;
        font: {
            size: number;
            weight: string;
            color: string;
            family: string;
        };
    };
}
