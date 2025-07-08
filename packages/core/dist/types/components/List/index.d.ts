export declare const SuList: {
    new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('packages/core').SuListProps> & Readonly<{
        [x: `on${Capitalize<string>}`]: (() => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        [x: string]: () => any;
    } & {
        search: (filters: Record<string, any>) => any;
        reset: () => any;
        "update:currentPage": (page: number) => any;
        "selection-change": (keys: any[]) => any;
    }, import('vue').PublicProps, {
        data: Record<string, any>[];
        mode: "full" | "simple";
        plain: boolean;
        column: import('packages/core').Column[];
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
    }, false, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {
        wrapperRef: HTMLDivElement;
        headerRef: HTMLDivElement;
        bodyRef: HTMLDivElement;
    }, HTMLDivElement, import('vue').ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('packages/core').SuListProps> & Readonly<{
        [x: `on${Capitalize<string>}`]: (() => any) | undefined;
    }>, {}, {}, {}, {}, {
        data: Record<string, any>[];
        mode: "full" | "simple";
        plain: boolean;
        column: import('packages/core').Column[];
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('packages/core').SuListProps> & Readonly<{
    [x: `on${Capitalize<string>}`]: (() => any) | undefined;
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    [x: string]: () => any;
} & {
    search: (filters: Record<string, any>) => any;
    reset: () => any;
    "update:currentPage": (page: number) => any;
    "selection-change": (keys: any[]) => any;
}, string, {
    data: Record<string, any>[];
    mode: "full" | "simple";
    plain: boolean;
    column: import('packages/core').Column[];
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
}, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & import('vue').Plugin;
export * from './type';
