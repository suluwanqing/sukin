import { type Ref } from 'vue';
import type {
    DraggableItem,
    EventContext,
    ExportData,
    ScheduleTheme 
} from './type';

let draggedItemData: DraggableItem | null = null;
let dragOverCellKey: string | null = null;

export function handleDragStart(event: DragEvent, item: DraggableItem) {
    if (!event.dataTransfer || !(event.target instanceof HTMLElement)) return;
    const itemJson = JSON.stringify(item);
    event.dataTransfer.setData('application/json', itemJson);
    event.dataTransfer.effectAllowed = 'move';
    draggedItemData = item;
    event.target.classList.add('is-dragging');
}

export function handleDragEnd(event: DragEvent) {
    draggedItemData = null;
    dragOverCellKey = null;
    if (event.target instanceof HTMLElement) {
        event.target.classList.remove('is-dragging');
    }
}

export function handleDragOver(event: DragEvent, sectionIndex: number, cellIndex: number) {
    event.preventDefault();
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
    }
    dragOverCellKey = `${sectionIndex}-${cellIndex}`;
}

export function handleDragLeave(sectionIndex: number, cellIndex: number) {
    if (dragOverCellKey === `${sectionIndex}-${cellIndex}`) {
        dragOverCellKey = null;
    }
}

export function handleDrop(event: DragEvent, sectionIndex: number, cellIndex: number, context: EventContext) {
    event.preventDefault();
    dragOverCellKey = null;
    if (!event.dataTransfer) return;
    const itemDataString = event.dataTransfer.getData('application/json');
    if (!itemDataString) return;
    try {
        const droppedItem: DraggableItem = JSON.parse(itemDataString);
        const limitValue = droppedItem[context.quantityKey];

        if (typeof limitValue === 'number') {
            const currentUsage = context.itemUsage.value[droppedItem.name] || 0;
            if (currentUsage >= limitValue) {
                return;
            }
            context.itemUsage.value[droppedItem.name] = currentUsage + 1;
        }

        context.gridCellContents.value[`${sectionIndex}-${cellIndex}`] = droppedItem;
    } catch (e) {
        console.error('Failed to parse dropped item data:', e);
    }
}

export function removeCellContent(sectionIndex: number, cellIndex: number, context: EventContext) {
    const key = `${sectionIndex}-${cellIndex}`;
    const itemToRemove = context.gridCellContents.value[key];

    if (itemToRemove && typeof itemToRemove[context.quantityKey] === 'number') {
        if (context.itemUsage.value[itemToRemove.name]) {
            context.itemUsage.value[itemToRemove.name]--;
        }
    }

    delete context.gridCellContents.value[key];
}

export function handleSaveData(context: EventContext) {
    const data: ExportData = {
        gridContents: JSON.parse(JSON.stringify(context.gridCellContents.value)),
        labels: context.props.labels!,
        metaInfo: context.props.metaInfo!,
        gridStructure: context.props.gridStructure!,
        layout: {
            direction: context.props.direction!,
        },
    };
    context.emit('export-data', data);
}

export function isDragOver(section: number, cell: number): boolean {
    return dragOverCellKey === `${section}-${cell}`;
}

export function createCanvasTheme(options?: Partial<ScheduleTheme>): ScheduleTheme { 
    const defaultTheme: ScheduleTheme = {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        backgroundColor: '#f0f9f8',
        padding: 15,
        gap: 8,
        container: {
            backgroundColor: '#ffffff',
            borderColor: '#d4e8e6',
            borderWidth: 1,
            borderRadius: 8
        },
        header: {
            backgroundColor: '#e0f2f1',
            borderColor: '#b2dfdb',
            borderWidth: 1,
            borderRadius: 6,
            font: {
                size: 14,
                weight: 'bold',
                color: '#00796b',
                family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }
        },
        meta: {
            backgroundColor: '#f0f4c3',
            borderColor: '#e6ee9c',
            borderWidth: 1,
            borderRadius: 6,
            font: {
                size: 12,
                weight: 'normal',
                color: '#33691e',
                family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }
        },
        cell: {
            backgroundColor: '#ffffff',
            borderColor: '#d4e8e6',
            borderWidth: 1,
            borderStyle: 'dashed',
            borderRadius: 6,
            placeholder: {
                text: 'Drop Here',
                size: 12,
                weight: 'italic',
                color: '#9e9e9e',
                family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }
        },
        droppedItem: {
            backgroundColor: '#fffde7',
            borderColor: '#fff9c4',
            borderWidth: 1,
            borderRadius: 6,
            font: {
                size: 14,
                weight: '500',
                color: '#795548',
                family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }
        }
    };
    if (options) {
        Object.assign(defaultTheme, options);
    }
    return defaultTheme;
}

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, font: { size: number; weight: string; family: string; color: string }) {
    ctx.fillStyle = font.color;
    ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
}

async function drawScheduleToCanvas(componentRef: Ref<HTMLElement | undefined>, theme: ScheduleTheme): Promise<HTMLCanvasElement> { 
    const rootEl = componentRef.value;
    if (!rootEl) throw new Error("Component root element is not available.");

    const containerEl = rootEl.querySelector<HTMLElement>('.su-schedule-table__box-container');
    if (!containerEl) throw new Error("Schedule container not found.");

    const cells = containerEl.querySelectorAll<HTMLElement>('.su-schedule-table__cell');
    const headers = containerEl.querySelectorAll<HTMLElement>('.su-schedule-table__label-item');
    const metas = containerEl.querySelectorAll<HTMLElement>('.su-schedule-table__meta-item');

    const allElements = [...Array.from(cells), ...Array.from(headers), ...Array.from(metas)];
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;

    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        minX = Math.min(minX, rect.left);
        minY = Math.min(minY, rect.top);
        maxX = Math.max(maxX, rect.right);
        maxY = Math.max(maxY, rect.bottom);
    });

    const contentWidth = maxX - minX + theme.padding * 2;
    const contentHeight = maxY - minY + theme.padding * 2;

    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = contentWidth * dpr;
    canvas.height = contentHeight * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = theme.backgroundColor;
    ctx.fillRect(0, 0, contentWidth, contentHeight);

    ctx.fillStyle = theme.container.backgroundColor;
    ctx.strokeStyle = theme.container.borderColor;
    ctx.lineWidth = theme.container.borderWidth;
    drawRoundRect(ctx, 0, 0, contentWidth, contentHeight, theme.container.borderRadius);
    ctx.fill();
    ctx.stroke();

    const drawStyledBox = (el: HTMLElement, style: any, text?: string) => {
        const rect = el.getBoundingClientRect();
        const x = rect.left - minX + theme.padding;
        const y = rect.top - minY + theme.padding;

        ctx.fillStyle = style.backgroundColor;
        ctx.strokeStyle = style.borderColor;
        ctx.lineWidth = style.borderWidth;
        if ('borderStyle' in style && style.borderStyle === 'dashed') ctx.setLineDash([5, 3]);
        else ctx.setLineDash([]);

        drawRoundRect(ctx, x, y, rect.width, rect.height, style.borderRadius);
        ctx.fill();
        ctx.stroke();

        if (text && 'font' in style) {
            drawText(ctx, text, x + rect.width / 2, y + rect.height / 2, style.font);
        }
    };

    headers.forEach(el => drawStyledBox(el, theme.header, el.innerText));
    metas.forEach(el => drawStyledBox(el, theme.meta, el.innerText));
    cells.forEach(el => {
        const contentEl = el.querySelector<HTMLElement>('.su-schedule-table__dropped-item');
        if (contentEl) {
            drawStyledBox(el, theme.droppedItem, contentEl.innerText.replace(/×$/, '').trim());
        } else {
            drawStyledBox(el, theme.cell);
            const rect = el.getBoundingClientRect();
            const x = rect.left - minX + theme.padding;
            const y = rect.top - minY + theme.padding;
            drawText(ctx, theme.cell.placeholder.text, x + rect.width / 2, y + rect.height / 2, theme.cell.placeholder);
        }
    });

    return canvas;
}

export async function generateCanvasPreview(componentRef: Ref<HTMLElement | undefined>, theme: ScheduleTheme): Promise<HTMLCanvasElement> {
    return await drawScheduleToCanvas(componentRef, theme);
}

export async function exportCanvasAsImage(componentRef: Ref<HTMLElement | undefined>, theme: ScheduleTheme, filename = 'schedule.png') { 
    try {
        const canvas = await drawScheduleToCanvas(componentRef, theme);
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Failed to export image:", error);
    }
}