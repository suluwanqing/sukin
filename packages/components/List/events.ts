import type { SuListProps, SuListState, Action, ButtonConfig, NavIcon, SuListEmits } from './type';
import { SELECTION_CHANGE } from './constants';
type EmitFn = (event: string, ...args: any[]) => void;

export function handleToggleRow(emit: SuListEmits, props: SuListProps, state: SuListState, row: Record<string, any>) {
    if (!props.selectable) return;
    const key = props.rowKey ? row[props.rowKey] : undefined;
    if (key === undefined) return;

    if (state.selectedRowKeys.has(key)) {
        state.selectedRowKeys.delete(key);
    } else {
        state.selectedRowKeys.add(key);
    }
    (emit as EmitFn)(SELECTION_CHANGE, Array.from(state.selectedRowKeys));
}

export function handleToggleAllOnPage(emit: SuListEmits, props: SuListProps, state: SuListState, isAllSelected: boolean, processedData: Record<string, any>[]) {
    if (!props.selectable || !processedData.length) return;

    const currentPageRowKeys = processedData
        .map(r => props.rowKey ? r[props.rowKey] : undefined)
        .filter(key => key !== undefined);

    currentPageRowKeys.forEach(key => {
        if (isAllSelected) {
            state.selectedRowKeys.delete(key);
        } else {
            state.selectedRowKeys.add(key);
        }
    });

    (emit as EmitFn)(SELECTION_CHANGE, Array.from(state.selectedRowKeys));
}

export function handleToggleColumn(state: SuListState, colValue: string) {
    const index = state.visibleColumns.indexOf(colValue);
    if (index > -1) {
        state.visibleColumns.splice(index, 1);
    } else {
        state.visibleColumns.push(colValue);
    }
}

export function handleRowAction(emit: SuListEmits, action: Action, row: Record<string, any>) {
    (emit as EmitFn)(action.emit, row);
}

export function handleNavAction(emit: SuListEmits, state: SuListState, btn: ButtonConfig | NavIcon) {
    (emit as EmitFn)(btn.emit, state.selectedValues);
}

export function handleIconMouse(state: SuListState, icon: NavIcon, show: boolean) {
    const targetIcon = state.internalNavIc.find(i => i.label === icon.label);
    if (targetIcon) {
        targetIcon.show = show;
    }
}