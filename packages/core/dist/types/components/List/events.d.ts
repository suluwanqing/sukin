import { SuListProps, SuListState, Action, ButtonConfig, NavIcon, SuListEmits } from './type';
export declare function handleToggleRow(emit: SuListEmits, props: SuListProps, state: SuListState, row: Record<string, any>): void;
export declare function handleToggleAllOnPage(emit: SuListEmits, props: SuListProps, state: SuListState, isAllSelected: boolean, processedData: Record<string, any>[]): void;
export declare function handleToggleColumn(state: SuListState, colValue: string): void;
export declare function handleRowAction(emit: SuListEmits, action: Action, row: Record<string, any>): void;
export declare function handleNavAction(emit: SuListEmits, state: SuListState, btn: ButtonConfig | NavIcon): void;
export declare function handleIconMouse(state: SuListState, icon: NavIcon, show: boolean): void;
