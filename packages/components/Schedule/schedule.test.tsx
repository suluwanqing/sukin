import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SuSchedule from './Schedule.vue';
import type { DraggableItem, Label, MetaInfo, ExportData } from './type';

// 用于测试的模拟数据
const mockDraggableItems: DraggableItem[] = [
    { name: 'chinese', label: '语文' },
    { name: 'math', label: '数学', quantity: 1 },
    { name: 'english', label: '英语' },
];
const mockLabels: Label[] = [{ label: 'Mon' }, { label: 'Tue' }];
const mockMetaInfo: MetaInfo[] = [{ label: 'P1' }, { label: 'P2' }];
const mockGridStructure: number[] = [2, 2];

describe('SuSchedule.vue', () => {
    it('应能正确挂载并渲染默认状态', () => {
        const wrapper = mount(SuSchedule);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('.su-schedule-table__grid-empty').exists()).toBe(true);
    });

    it('应能根据 Props 渲染所有元素', () => {
        const wrapper = mount(SuSchedule, {
            props: {
                draggableItems: mockDraggableItems,
                labels: mockLabels,
                metaInfo: mockMetaInfo,
                gridStructure: mockGridStructure,
            },
        });

        expect(wrapper.findAll('.su-schedule-table__draggable-item')).toHaveLength(3);
        expect(wrapper.findAll('.su-schedule-table__label-item')).toHaveLength(2);
        expect(wrapper.findAll('.su-schedule-table__meta-item')).toHaveLength(2);
        expect(wrapper.findAll('.su-schedule-table__cell')).toHaveLength(4);
    });

    it('应能将项目拖放到单元格中', async () => {
        const wrapper = mount(SuSchedule, {
            props: { draggableItems: mockDraggableItems, gridStructure: [1] },
        });

        const draggableItem = wrapper.find('.su-schedule-table__draggable-item');
        const cell = wrapper.find('.su-schedule-table__cell');

        // 模拟拖放所需的数据传输对象
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('application/json', JSON.stringify(mockDraggableItems[0]));

        // 触发拖放事件序列
        await draggableItem.trigger('dragstart', { dataTransfer });
        await cell.trigger('drop', { dataTransfer });

        // 验证项目已成功放置
        const droppedItem = cell.find('.su-schedule-table__dropped-item');
        expect(droppedItem.exists()).toBe(true);
        expect(droppedItem.text()).toContain('语文');
    });

    it('应遵循数量限制并在用完后禁用项目', async () => {
        const wrapper = mount(SuSchedule, {
            props: { draggableItems: mockDraggableItems, gridStructure: [2] },
        });

        const mathItem = wrapper.findAll('.su-schedule-table__draggable-item')[1];
        const cell = wrapper.find('.su-schedule-table__cell');

        // 模拟拖放
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('application/json', JSON.stringify(mockDraggableItems[1]));
        await cell.trigger('drop', { dataTransfer });

        // 验证数量已减少且项目被禁用
        expect(mathItem.text()).toContain('(0)');
        expect(mathItem.classes()).toContain('is-disabled');
    });

    it('点击移除按钮后应能从单元格中移除项目', async () => {
        const wrapper = mount(SuSchedule, {
            props: { draggableItems: mockDraggableItems, gridStructure: [1] },
        });
        const cell = wrapper.find('.su-schedule-table__cell');

        // 先放置一个项目
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('application/json', JSON.stringify(mockDraggableItems[0]));
        await cell.trigger('drop', { dataTransfer });
        expect(cell.find('.su-schedule-table__dropped-item').exists()).toBe(true);

        // 点击移除按钮
        await cell.find('.su-schedule-table__remove-button').trigger('click');

        // 验证项目已被移除
        expect(cell.find('.su-schedule-table__dropped-item').exists()).toBe(false);
    });

    it('点击保存按钮后应触发 "export-data" 事件并携带正确的载荷', async () => {
        const wrapper = mount(SuSchedule, {
            props: {
                draggableItems: mockDraggableItems,
                labels: mockLabels,
                metaInfo: mockMetaInfo,
                gridStructure: mockGridStructure,
            },
        });

        // 放置一个项目以产生数据
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('application/json', JSON.stringify(mockDraggableItems[0]));
        await wrapper.find('.su-schedule-table__cell').trigger('drop', { dataTransfer });

        // 点击保存按钮
        await wrapper.find('.su-schedule-table__save-button').trigger('click');

        // 获取触发的事件
        const emittedEvent = wrapper.emitted('export-data');

        // 断言事件已被定义且只触发了一次
        expect(emittedEvent).toBeDefined();
        expect(emittedEvent!).toHaveLength(1);

        // 安全地获取事件载荷并进行验证
        const payload = emittedEvent![0][0] as ExportData;
        expect(payload.gridContents['0-0']?.name).toBe('chinese');
        expect(payload.labels).toEqual(mockLabels);
    });
});