import type { ButtonType } from '../Button/type';

export interface Action {
    label: string;
    type?: ButtonType;
    emit: string;
    icon?: string;
    hidden?: (row: Record<string, any>) => boolean;
}

export interface ButtonConfig {
    label: string;
    type?: ButtonType;
    emit: string;
    icon?: string;
}

export interface NavIcon {
    label: string;
    emit: string;
    icon: string;
    show?: boolean;
}

export interface Nav {
    name: string;
    type: 'selection' | 'input';
    column: string;
    options?: Array<{ label: string; value: any }>;
    placeholder?: string;
    icon?: string;
}

export interface Column {
    label: string;
    value: string;
    flex?: number;
}

export interface PageData {
    data: Record<string, any>[];
    actions: Action[];
}

export interface SuListProps {
    data?: Record<string, any>[];
    pageData?: PageData;
    paginationType?: 'internal' | 'external';
    pageSize?: number;
    currentPage?: number;
    total?: number;
    showFilters?: boolean;
    showNavButtons?: boolean;
    showNavIcons?: boolean;
    showActionsColumn?: boolean;
    showElevator?: boolean;
    mode?: 'full' | 'simple';
    selectable?: boolean;
    rowKey?: string;
    mynavs?: Nav[];
    selectBt?: ButtonConfig[];
    naVBt?: ButtonConfig[];
    navIc?: NavIcon[];
    column?: Column[];
    theme?: 'ocean-blue' | 'sunset-glow' | 'forest-green' | 'cosmic-purple';
    plain?: boolean;
}

export interface SuListState {
    selectedValues: Record<string, any>;
    visibleColumns: string[];
    internalCurrentPage: number;
    jumpPageInput: number;
    selectedRowKeys: Set<any>;
    internalNavIc: NavIcon[];
    isActionsColumnVisible: boolean;
}


export type SuListEmits = {

    (e: 'update:currentPage', page: number): void;
    (e: 'selection-change', keys: any[]): void;
    (e: 'search', filters: Record<string, any>): void;
    (e: 'reset'): void;
    [key: string]: (...args: any[]) => void;
};