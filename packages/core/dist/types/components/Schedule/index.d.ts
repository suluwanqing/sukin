export declare const SuSchedule: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').ScheduleProps> & Readonly<{
        "onExport-data"?: ((data: import('packages/core').ExportData) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        "export-data": (data: import('packages/core').ExportData) => any;
    }, import('vue').PublicProps, {
        size: "small" | "medium" | "large";
        draggableItems: import('packages/core').DraggableItem[];
        metaInfo: import('packages/core').MetaInfo[];
        labels: import('packages/core').Label[];
        gridStructure: number[];
        direction: "horizontal" | "vertical";
        quantityKey: string;
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        canvasContainerRef: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').ScheduleProps> & Readonly<{
        "onExport-data"?: ((data: import('packages/core').ExportData) => any) | undefined;
    }>, {}, {}, {}, {}, {
        size: "small" | "medium" | "large";
        draggableItems: import('packages/core').DraggableItem[];
        metaInfo: import('packages/core').MetaInfo[];
        labels: import('packages/core').Label[];
        gridStructure: number[];
        direction: "horizontal" | "vertical";
        quantityKey: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').ScheduleProps> & Readonly<{
    "onExport-data"?: ((data: import('packages/core').ExportData) => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "export-data": (data: import('packages/core').ExportData) => any;
}, string, {
    size: "small" | "medium" | "large";
    draggableItems: import('packages/core').DraggableItem[];
    metaInfo: import('packages/core').MetaInfo[];
    labels: import('packages/core').Label[];
    gridStructure: number[];
    direction: "horizontal" | "vertical";
    quantityKey: string;
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
