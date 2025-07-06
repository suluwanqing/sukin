<template>
    <div :ref="setScheduleTableRef" :class="[bem.b(), bem.m(size), bem.m(props.direction)]">
        <div :class="bem.e('draggable-area')">
            <div :class="bem.e('draggable-list')">
                <div v-for="item in processedDraggableItems" :key="item.name"
                    :class="[bem.e('draggable-item'), { 'is-disabled': item.disabled }]" :draggable="!item.disabled"
                    @dragstart="handleDragStart($event, item)" @dragend="handleDragEnd">
                    <span>{{ item.label }}</span>
                    <span v-if="item[props.quantityKey] !== undefined" :class="bem.e('item-quantity')">
                        ({{ item.remaining }})
                    </span>
                </div>
            </div>
            <div :class="bem.e('actions-group')">
                <button @click="runPreview" :class="[bem.e('button'), bem.e('preview-button')]">预览</button>
                <button @click="runExportImage" :class="[bem.e('button'), bem.e('export-image-button')]">导出图片</button>
                <button @click="handleSaveData(eventContext)"
                    :class="[bem.e('button'), bem.e('save-button')]">保存数据</button>
            </div>
        </div>

        <div :class="bem.e('box-container')" :style="boxContainerStyle">
            <div v-if="showCorner" :class="bem.e('corner')" :style="cornerStyle"></div>
            <div v-if="showLabels" :class="bem.e('labels-header')" :style="labelsHeaderStyle">
                <div v-for="(label, index) in props.labels" :key="index" :class="bem.e('label-item')">
                    <span>{{ label.label }}</span>
                </div>
            </div>
            <div v-if="showMeta" :class="bem.e('meta-header')" :style="metaHeaderStyle">
                <div v-for="(meta, metaIndex) in visibleMetaInfo" :key="metaIndex" :class="bem.e('meta-item')">
                    <span>{{ meta.label }}</span>
                </div>
            </div>
            <div :class="bem.e('grid-wrapper')" :style="gridWrapperStyle">
                <template v-if="hasGridCells">
                    <div v-for="(cellCount, sectionIndex) in props.gridStructure" :key="sectionIndex"
                        :class="bem.e('grid-section')" :style="gridSectionStyle(cellCount)">
                        <div v-for="cellIndex in cellCount" :key="`${sectionIndex}-${cellIndex - 1}`"
                            :class="[bem.e('cell'), isDragOver(sectionIndex, cellIndex - 1) && 'is-drag-over']"
                            @dragover.prevent="handleDragOver($event, sectionIndex, cellIndex - 1)"
                            @dragleave="handleDragLeave(sectionIndex, cellIndex - 1)"
                            @drop="handleDrop($event, sectionIndex, cellIndex - 1, eventContext)">

                            <div v-if="getCellContent(sectionIndex, cellIndex - 1)" :class="bem.e('dropped-item')">
                                {{ getCellContent(sectionIndex, cellIndex - 1)!.label }}
                                <button @click.stop="removeCellContent(sectionIndex, cellIndex - 1, eventContext)"
                                    :class="bem.e('remove-button')" title="Remove item">
                                    ×
                                </button>
                            </div>

                            <div v-else :class="bem.e('cell-placeholder')">
                                Drop Here
                            </div>

                        </div>
                    </div>
                </template>
                <div v-else :class="bem.e('grid-empty')">
                    Grid layout not available.
                </div>
            </div>
        </div>

        <div v-if="isPreviewVisible" :class="bem.e('preview-overlay')" @click="closePreview">
            <div :class="bem.e('preview-modal')" @click.stop>
                <div :class="bem.e('preview-header')">
                    <h3>预览</h3>
                    <button @click="closePreview" :class="bem.e('preview-close-button')" title="关闭">×</button>
                </div>
                <div :class="bem.e('preview-content')" ref="canvasContainerRef">
                </div>
                <div :class="bem.e('preview-footer')">
                    <button @click="runExportImage" :class="[bem.e('button'), bem.e('export-image-button')]">下载
                        PNG</button>
                    <button @click="closePreview" :class="[bem.e('button'), bem.em('button', 'secondary')]">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, defineOptions, watch } from 'vue';
import {
    handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop,
    removeCellContent, handleSaveData, isDragOver, generateCanvasPreview,
    exportCanvasAsImage, createCanvasTheme
} from './events';
import type { ScheduleProps, ScheduleEmits, GridCellContents, EventContext, ProcessedDraggableItem } from './type';
import { createNamespace } from '@sukin/utils';

const bem = createNamespace('schedule-table');

defineOptions({
    name: 'SuSchedule',
})

const props = withDefaults(defineProps<ScheduleProps>(), {
    draggableItems: () => [],
    metaInfo: () => [],
    labels: () => [],
    gridStructure: () => [],
    direction: 'horizontal',
    size: 'medium',
    quantityKey: 'quantity',
});

const emit = defineEmits<ScheduleEmits>();
const gridCellContents = ref<GridCellContents>({});
const scheduleTableElement = ref<HTMLDivElement>();
const itemUsage = ref<Record<string, number>>({});

watch(gridCellContents, (newContents) => {
    const newUsage: Record<string, number> = {};
    Object.values(newContents).forEach(item => {
        if (item && typeof item[props.quantityKey] === 'number') {
            newUsage[item.name] = (newUsage[item.name] || 0) + 1;
        }
    });
    itemUsage.value = newUsage;
}, { deep: true, immediate: true });

const processedDraggableItems = computed<ProcessedDraggableItem[]>(() => {
    return props.draggableItems.map(item => {
        const used = itemUsage.value[item.name] || 0;
        const limitValue = item[props.quantityKey];
        const hasLimit = typeof limitValue === 'number';
        const remaining = hasLimit ? limitValue! - used : Infinity;

        return {
            ...item,
            remaining,
            disabled: hasLimit && remaining <= 0
        };
    });
});

const setScheduleTableRef = (el: any) => {
    if (el) {
        scheduleTableElement.value = el;
    }
};

const eventContext: EventContext = {
    props,
    emit,
    gridCellContents,
    itemUsage,
    quantityKey: props.quantityKey
};

const canvasTheme = createCanvasTheme();
const isPreviewVisible = ref(false);
const canvasContainerRef = ref<HTMLElement | null>(null);

async function runPreview() {
    try {
        const canvas = await generateCanvasPreview(scheduleTableElement, canvasTheme);
        isPreviewVisible.value = true;
        await nextTick();
        if (canvasContainerRef.value) {
            canvasContainerRef.value.innerHTML = '';
            canvasContainerRef.value.appendChild(canvas);
        }
    } catch (error) {
        console.error("Failed to generate preview:", error);
    }
}
function closePreview() {
    isPreviewVisible.value = false;
    if (canvasContainerRef.value) canvasContainerRef.value.innerHTML = '';
}

async function runExportImage() {
    await exportCanvasAsImage(scheduleTableElement, canvasTheme, `schedule-${new Date().toISOString().split('T')[0]}.png`);
    if (isPreviewVisible.value) closePreview();
}

const isVertical = computed(() => props.direction === 'vertical');
const maxCellsPerSection = computed(() => Math.max(0, ...(props.gridStructure || []).map(Number)))
const visibleMetaInfo = computed(() => props.metaInfo!.slice(0, maxCellsPerSection.value));
const showLabels = computed(() => props.labels && props.labels!.length > 0);
const showMeta = computed(() => props.metaInfo && props.metaInfo!.length > 0 && maxCellsPerSection.value > 0);
const showCorner = computed(() => showLabels.value && showMeta.value);
const hasGridCells = computed(() => props.gridStructure!.some(count => count > 0));
function getCellContent(section: number, cell: number) { return gridCellContents.value[`${section}-${cell}`] || null; }
const META_HEADER_SIZE = '60px';
const boxContainerStyle = computed(() => {
    const gridTemplateRows: string[] = [];
    const gridTemplateColumns: string[] = [];
    if (isVertical.value) {
        if (showMeta.value) gridTemplateRows.push(`minmax(0, ${META_HEADER_SIZE})`);
        gridTemplateRows.push('1fr');
        if (showLabels.value) gridTemplateColumns.push('auto');
        gridTemplateColumns.push('1fr');
    } else {
        if (showLabels.value) gridTemplateRows.push('auto');
        gridTemplateRows.push('1fr');
        if (showMeta.value) gridTemplateColumns.push(`minmax(0, ${META_HEADER_SIZE})`);
        gridTemplateColumns.push('1fr');
    }
    return {
        gridTemplateRows: gridTemplateRows.join(' '),
        gridTemplateColumns: gridTemplateColumns.join(' '),
    };
});
const cornerStyle = computed(() => ({ gridRow: '1 / 2', gridColumn: '1 / 2' }));
const labelsHeaderStyle = computed(() => {
    const style: Record<string, any> = {
        gridTemplateColumns: `repeat(${props.labels!.length}, minmax(0, 1fr))`,
        gridRow: '1 / 2',
        gridColumn: showMeta.value ? '2 / 3' : '1 / -1',
    };
    if (isVertical.value) {
        style.gridTemplateColumns = '';
        style.gridTemplateRows = `repeat(${props.labels!.length}, minmax(0, 1fr))`;
        style.gridColumn = '1 / 2';
        style.gridRow = showMeta.value ? '2 / 3' : '1 / -1';
    }
    return style;
});
const metaHeaderStyle = computed(() => {
    const style: Record<string, any> = {
        gridTemplateRows: `repeat(${maxCellsPerSection.value}, minmax(0, 1fr))`,
        gridColumn: '1 / 2',
        gridRow: showLabels.value ? '2 / 3' : '1 / -1',
    };
    if (isVertical.value) {
        style.gridTemplateRows = '';
        style.gridTemplateColumns = `repeat(${maxCellsPerSection.value}, minmax(0, 1fr))`;
        style.gridRow = '1 / 2';
        style.gridColumn = showLabels.value ? '2 / 3' : '1 / -1';
    }
    return style;
});
const gridWrapperStyle = computed(() => {
    const style: Record<string, any> = {
        gridTemplateColumns: `repeat(${props.gridStructure!.length}, minmax(0, 1fr))`,
        gridRow: showLabels.value ? '2 / 3' : '1 / -1',
        gridColumn: showMeta.value ? '2 / 3' : '1 / -1',
    };
    if (isVertical.value) {
        style.gridTemplateColumns = '';
        style.gridTemplateRows = `repeat(${props.gridStructure!.length}, minmax(0, 1fr))`;
        style.gridColumn = showLabels.value ? '2 / 3' : '1 / -1';
        style.gridRow = showMeta.value ? '2 / 3' : '1 / -1';
    }
    return style;
});
function gridSectionStyle(cellCount: number) {
    if (cellCount === 0) return { display: 'none' };
    return isVertical.value
        ? { gridTemplateColumns: `repeat(${cellCount}, minmax(0, 1fr))` }
        : { gridTemplateRows: `repeat(${cellCount}, minmax(0, 1fr))` };
}
</script>

<style scoped>
@import './style.css';
</style>