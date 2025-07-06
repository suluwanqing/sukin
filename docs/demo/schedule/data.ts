import type { DraggableItem, Label, MetaInfo } from 'sukin';

export const draggableItems: DraggableItem[] = [
    { name: 'CH', label: '语文' },
    { name: 'MA', label: '数学' },
    { name: 'EN', label: '英语' },
    { name: 'PE', label: '体育' },
    { name: 'AR', label: '美术' },
    { name: 'MU', label: '音乐' },
    { name: 'CS', label: '计算机' },
];

export const labels: Label[] = [
    { label: "周一" }, { label: '周二' }, { label: "周三" }, { label: "周四" }, { label: "周五" },
];

export const metaInfo: MetaInfo[] = [
    { label: "8:00-9:40" }, { label: "10:00-11:40" }, { label: "14:00-15:40" }, { label: "16:00-17:40" },
];

export const gridStructure: number[] = [4, 4, 4, 4, 4];