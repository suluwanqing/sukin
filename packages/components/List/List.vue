<template>
    <div :class="[bem.b(), `theme-${props.theme}`, { 'is-plain': props.plain }]" ref="wrapperRef">
        <div v-if="props.showFilters && props.mode === 'full' && (selectionNavs.length > 0 || inputNavs.length > 0)"
            :class="bem.e('filters')">
            <div :class="bem.e('filter-items')">
                <template v-for="(nav, i) in selectionNavs" :key="'sel' + i">
                    <div :class="bem.e('filter-item')">
                        <span :class="bem.e('filter-label')">{{ nav.name }}:</span>
                        <select :class="bem.e('filter-select')" v-model="state.selectedValues[nav.column]">
                            <option v-for="opt in nav.options" :key="opt.value" :value="opt.value">{{ opt.label }}
                            </option>
                        </select>
                    </div>
                </template>
                <template v-for="(nav, i) in inputNavs" :key="'input' + i">
                    <div :class="bem.e('filter-item')">
                        <div :class="bem.e('filter-input-wrapper')">
                            <span :class="bem.e('filter-label')">{{ nav.name }}:</span>
                            <input type="text" v-model="state.selectedValues[nav.column]" :placeholder="nav.placeholder"
                                :class="bem.e('filter-input')" />
                            <span v-if="nav.icon" :class="bem.e('filter-search-icon')">
                                <SuIcon :icon="nav.icon" />
                            </span>
                        </div>
                    </div>
                </template>
            </div>
            <div v-if="props.selectBt.length > 0" :class="bem.e('filter-actions')">
                <SuButton v-for="(btn, i) in props.selectBt" :key="i" :type="btn.type"
                    @click="handleNavAction(emit, state, btn)">{{
                    btn.label }}</SuButton>
            </div>
        </div>

        <div v-if="props.mode !== 'simple' && ((props.showNavButtons && props.naVBt.length > 0) || (props.showNavIcons && state.internalNavIc.length > 0))"
            :class="bem.e('nav')">
            <div v-if="props.showNavButtons && props.naVBt.length > 0" :class="bem.e('nav-buttons')">
                <SuButton v-for="(btn, i) in props.naVBt" :key="i" :type="btn.type" :icon="btn.icon"
                    @click="handleNavAction(emit, state, btn)">{{ btn.label }}</SuButton>
            </div>
            <div v-if="props.showNavIcons && state.internalNavIc.length > 0" :class="bem.e('nav-icons')">
                <div v-for="(icon, i) in state.internalNavIc" :key="i" :class="bem.e('nav-icon-item')"
                    @mouseover="handleIconMouse(state, icon, true)" @mouseleave="handleIconMouse(state, icon, false)">
                    <span :class="bem.e('nav-icon-wrapper')" @click="handleNavAction(emit, state, icon)">
                        <SuIcon :icon="icon.icon" class="nav-func-icon" />
                    </span>
                    <span v-if="icon.show" :class="bem.e('tooltip')">{{ icon.label }}</span>
                </div>
            </div>
        </div>

        <div :class="bem.e('content')">
            <div v-if="props.mode !== 'simple'" :class="bem.e('col-toggle-bar')">
                <span :class="bem.e('col-toggle-title')">显示列:</span>
                <span v-for="col in props.column" :key="col.value" @click="handleToggleColumn(state, col.value)"
                    :class="[bem.e('col-toggle-item'), { [bem.em('col-toggle-item', 'inactive')]: !state.visibleColumns.includes(col.value) }]">
                    <SuIcon :icon="state.visibleColumns.includes(col.value) ? 'eye' : 'eye-slash'"
                        class="col-toggle-icon" />
                    {{ col.label }}
                </span>
                <span v-if="hasActions" @click="state.isActionsColumnVisible = !state.isActionsColumnVisible"
                    :class="[bem.e('col-toggle-item'), { [bem.em('col-toggle-item', 'inactive')]: !state.isActionsColumnVisible }]">
                    <SuIcon :icon="state.isActionsColumnVisible ? 'eye' : 'eye-slash'" class="col-toggle-icon" />操作
                </span>
            </div>

            <div :class="bem.e('table-wrapper')">
                <div :class="bem.e('table-header')" ref="headerRef">
                    <div :class="bem.e('table-row')">
                        <span v-if="props.selectable" :style="columnStyles['selection']"
                            :class="[bem.e('table-cell'), bem.em('table-cell', 'selection')]">
                            <input type="checkbox" :checked="isAllOnPageSelected" :disabled="!processedData.length"
                                @change="handleToggleAllOnPage(emit, props, state, isAllOnPageSelected, processedData)" />
                        </span>
                        <span v-for="col in props.column" v-show="state.visibleColumns.includes(col.value)"
                            :style="columnStyles[col.value]" :key="'header-' + col.value" :class="bem.e('table-cell')"
                            :title="col.label">
                            <span :class="bem.e('cell-inner')">{{ col.label }}</span>
                        </span>
                        <span v-if="hasActions && state.isActionsColumnVisible" :style="columnStyles['actions']"
                            :class="[bem.e('table-cell'), bem.em('table-cell', 'actions')]">操作</span>
                    </div>
                </div>
                <div :class="bem.e('table-body')" ref="bodyRef">
                    <template v-if="processedData.length > 0">
                        <div v-for="(row, idx) in processedData" :key="row[props.rowKey] || idx"
                            :class="[bem.e('table-row'), { 'is-selected': isRowSelected(row) }]">
                            <span v-if="props.selectable" :style="columnStyles['selection']"
                                :class="[bem.e('table-cell'), bem.em('table-cell', 'selection')]">
                                <input type="checkbox" :checked="isRowSelected(row)"
                                    @change="handleToggleRow(emit, props, state, row)" />
                            </span>
                            <span v-for="col in props.column" v-show="state.visibleColumns.includes(col.value)"
                                :key="'cell-' + col.value" :style="columnStyles[col.value]" :class="bem.e('table-cell')"
                                :title="getCellTitle(row, col)">
                                <span :class="bem.e('cell-inner')">
                                    <template v-if="Array.isArray(row[col.value])">
                                        <span v-for="(item, i) in row[col.value]" :key="i">{{ item }}<span
                                                v-if="i < row[col.value].length - 1"
                                                :class="bem.e('cell-array-separator')">|</span></span>
                                    </template>
                                    <template v-else>{{ row[col.value] }}</template>
                                </span>
                            </span>
                            <span v-if="hasActions && state.isActionsColumnVisible && finalPageData.actions"
                                :style="columnStyles['actions']"
                                :class="[bem.e('table-cell'), bem.em('table-cell', 'actions')]">
                                <template v-for="(action, actionIdx) in finalPageData.actions" :key="actionIdx">
                                    <SuButton v-if="!action.hidden || !action.hidden(row)" :type="action.type"
                                        :icon="action.icon" size="small" @click="handleRowAction(emit, action, row)">{{
                                            action.label }}</SuButton>
                                </template>
                            </span>
                        </div>
                    </template>
                    <div v-else :class="bem.e('no-data')">暂无数据</div>
                </div>
            </div>

            <div :class="bem.e('pagination')">
                <SuButton plain :disabled="finalCurrentPage <= 1" @click="goToPage(1)" icon="backward-step">首页
                </SuButton>
                <SuButton plain :disabled="finalCurrentPage <= 1" @click="goToPage(finalCurrentPage - 1)"
                    icon="arrow-left">
                    上一页
                </SuButton>
                <span class="su-list__page-info"><span class="su-list__page-info-current">{{ finalCurrentPage }}</span>
                    / {{
                        finalTotalPages }}</span>
                <span v-if="props.showElevator" :class="bem.e('page-elevator')">
                    <span :class="bem.e('elevator-text')">第</span>
                    <input type="number" v-model.number="state.jumpPageInput"
                        @keyup.enter="goToPage(state.jumpPageInput)" @blur="goToPage(state.jumpPageInput)"
                        :class="bem.e('page-input')" />
                    <span :class="bem.e('elevator-text')">页</span>
                </span>
                <SuButton plain :disabled="finalCurrentPage >= finalTotalPages" @click="goToPage(finalCurrentPage + 1)"
                    icon="arrow-right">下一页</SuButton>
                <SuButton plain :disabled="finalCurrentPage >= finalTotalPages" @click="goToPage(finalTotalPages)"
                    icon="forward-step">尾页</SuButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, defineOptions, reactive, computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { createNamespace } from '@sukin/utils';
import SuButton from '../Button/Button.vue';
import SuIcon from '../Icon/Icon.vue';
import {
    handleToggleRow, handleToggleAllOnPage, handleToggleColumn,
    handleRowAction, handleNavAction, handleIconMouse
} from './events';
import type { SuListProps, SuListState, Column, SuListEmits } from './type';

defineOptions({ name: 'SuList' });
const bem = createNamespace('list');

const props = withDefaults(defineProps<SuListProps>(), {
    data: () => [],
    pageData: () => ({ data: [], actions: [] }),
    paginationType: 'external',
    pageSize: 10,
    currentPage: 1,
    total: 0,
    showFilters: true,
    showNavButtons: true,
    showNavIcons: true,
    showActionsColumn: true,
    showElevator: false,
    mode: 'full',
    selectable: false,
    rowKey: 'id',
    mynavs: () => [],
    selectBt: () => [],
    naVBt: () => [],
    navIc: () => [],
    column: () => [],
    theme: 'ocean-blue',
    plain: false,
});

const emit = defineEmits<SuListEmits>();

const state = reactive<SuListState>({
    selectedValues: {},
    visibleColumns: [],
    internalCurrentPage: 1,
    jumpPageInput: 1,
    selectedRowKeys: new Set(),
    internalNavIc: [],
    isActionsColumnVisible: true,
});

const wrapperRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const columnStyles = ref<Record<string, { width?: string, flex?: string }>>({});
let resizeObserver: ResizeObserver | null = null;

const finalCurrentPage = computed(() => props.paginationType === 'internal' ? state.internalCurrentPage : props.currentPage);
const finalTotalPages = computed(() => {
    const total = props.paginationType === 'internal' ? props.data.length : props.total;
    return Math.ceil(total / props.pageSize) || 1;
});
const processedData = computed(() => {
    if (props.paginationType === 'internal') {
        const start = (state.internalCurrentPage - 1) * props.pageSize;
        const end = start + props.pageSize;
        return props.data.slice(start, end);
    }
    return props.pageData.data;
});
const finalPageData = computed(() => ({
    data: processedData.value,
    actions: props.pageData.actions,
}));
const selectionNavs = computed(() => props.mynavs.filter(item => item.type === 'selection'));
const inputNavs = computed(() => props.mynavs.filter(item => item.type === 'input'));
const hasActions = computed(() => props.showActionsColumn && !!props.pageData?.actions?.length);
const isAllOnPageSelected = computed(() => {
    if (!props.selectable || !processedData.value.length) return false;
    return processedData.value.every(row => state.selectedRowKeys.has(row[props.rowKey]));
});

const isRowSelected = (row: Record<string, any>): boolean => state.selectedRowKeys.has(row[props.rowKey]);
const getCellTitle = (row: Record<string, any>, col: Column): string => {
    const value = row[col.value];
    return Array.isArray(value) ? value.join(' | ') : String(value ?? '');
};
const goToPage = (page: number | string) => {
    let pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) { pageNum = 1; }
    if (pageNum > finalTotalPages.value) { pageNum = finalTotalPages.value; }
    state.jumpPageInput = pageNum;
    if (props.paginationType === 'internal') { state.internalCurrentPage = pageNum; }
    emit('update:currentPage', pageNum);
};

const updateLayout = () => {
    const headerEl = headerRef.value;
    const bodyEl = bodyRef.value;
    if (!headerEl || !bodyEl || !processedData.value.length) {
        columnStyles.value = {};
        return;
    }

    columnStyles.value = {};
    const scrollbarWidth = bodyEl.offsetWidth - bodyEl.clientWidth;
    headerEl.style.paddingRight = `${scrollbarWidth}px`;

    nextTick(() => {
        const availableWidth = bodyEl.clientWidth;
        const headerRow = headerEl.querySelector(`.${bem.e('table-row')}`);
        const bodyRows = bodyEl.querySelectorAll(`.${bem.e('table-row')}`);
        if (!headerRow) return;

        const allRows = [headerRow, ...Array.from(bodyRows)];
        const minColumnWidths = new Map<number, number>();

        allRows.forEach(row => {
            Array.from(row.children).forEach((cell, index) => {
                const currentMax = minColumnWidths.get(index) || 0;
                minColumnWidths.set(index, Math.max(currentMax, (cell as HTMLElement).offsetWidth));
            });
        });

        const totalMinWidth = Array.from(minColumnWidths.values()).reduce((sum, w) => sum + w, 0);

        const newStyles: Record<string, { width?: string, flex?: string }> = {};
        let cellIndex = 0;

        const applyStyle = (key: string, flexValue?: number) => {
            const minWidth = minColumnWidths.get(cellIndex);
            if (minWidth === undefined) return;

            if (totalMinWidth > availableWidth) {
                newStyles[key] = { width: `${minWidth}px`, flex: 'none' };
            } else {
                const flex = flexValue ?? 1;
                newStyles[key] = { flex: `${flex} 1 ${minWidth}px` };
            }
            cellIndex++;
        };

        if (props.selectable) applyStyle('selection', 0.5);
        props.column.forEach(col => {
            if (state.visibleColumns.includes(col.value)) {
                applyStyle(col.value, col.flex);
            }
        });
        if (hasActions.value && state.isActionsColumnVisible) applyStyle('actions', 1);

        columnStyles.value = newStyles;
    });
};

const handleBodyScroll = () => {
    if (headerRef.value && bodyRef.value) {
        headerRef.value.scrollLeft = bodyRef.value.scrollLeft;
    }
};

onMounted(() => {
    state.visibleColumns = props.column.map(c => c.value);
    state.isActionsColumnVisible = props.showActionsColumn;

    if (wrapperRef.value) {
        resizeObserver = new ResizeObserver(updateLayout);
        resizeObserver.observe(wrapperRef.value);
    }
    if (bodyRef.value) {
        bodyRef.value.addEventListener('scroll', handleBodyScroll);
    }
    nextTick(updateLayout);
});

onBeforeUnmount(() => {
    if (resizeObserver && wrapperRef.value) resizeObserver.unobserve(wrapperRef.value);
    if (bodyRef.value) bodyRef.value.removeEventListener('scroll', handleBodyScroll);
    resizeObserver = null;
});

watch(finalCurrentPage, (newPage) => { state.jumpPageInput = newPage; }, { immediate: true });
watch(() => props.navIc, (newIcons) => { state.internalNavIc = newIcons.map(icon => ({ ...icon, show: false })); }, { immediate: true, deep: true });
watch([processedData, () => state.visibleColumns, () => state.isActionsColumnVisible], () => { nextTick(updateLayout); }, { deep: true, immediate: true });
</script>

<style scoped>
@import "./style.css";
</style>