import { SuListProps, Column } from './type';
declare const _default: import('vue').DefineComponent<SuListProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    [x: string]: () => any;
} & {
    search: (filters: Record<string, any>) => any;
    reset: () => any;
    "update:currentPage": (page: number) => any;
    "selection-change": (keys: any[]) => any;
}, string, import('vue').PublicProps, Readonly<SuListProps> & Readonly<{
    [x: `on${Capitalize<string>}`]: (() => any) | undefined;
}>, {
    data: Record<string, any>[];
    mode: "full" | "simple";
    plain: boolean;
    column: Column[];
    pageData: import('packages/core').PageData;
    paginationType: "internal" | "external";
    pageSize: number;
    currentPage: number;
    total: number;
    showFilters: boolean;
    showNavButtons: boolean;
    showNavIcons: boolean;
    showActionsColumn: boolean;
    showElevator: boolean;
    selectable: boolean;
    rowKey: string;
    mynavs: import('packages/core').Nav[];
    selectBt: import('packages/core').ButtonConfig[];
    naVBt: import('packages/core').ButtonConfig[];
    navIc: import('packages/core').NavIcon[];
    theme: "ocean-blue" | "sunset-glow" | "forest-green" | "cosmic-purple";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    wrapperRef: HTMLDivElement;
    headerRef: HTMLDivElement;
    bodyRef: HTMLDivElement;
}, HTMLDivElement>;
export default _default;
