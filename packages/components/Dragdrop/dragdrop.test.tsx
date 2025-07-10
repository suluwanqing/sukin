import { describe, it, expect, beforeEach } from 'vitest';
import { mount, config } from '@vue/test-utils';
import SuDragDrop from './Dragdrop.vue'; // 调整为你的组件路径
import type { DragDropItem } from './type'; // 调整为你的类型路径
// 定义事件载荷的类型，方便复用
type DragDropEventPayload = { source: DragDropItem[]; placed: DragDropItem[] };

// 模拟 ItemComponent 子组件
const ItemComponentStub = {
    props: ['item', 'removable'],
    emits: ['remove'],
    template: `
        <div class="item-stub" @click="$emit('remove', item)">
            {{ item.label }}
        </div>
    `,
};

// 全局配置 Stub
beforeEach(() => {
    config.global.stubs = {
        ItemComponent: ItemComponentStub,
    };
});

// 模拟数据
const mockItems: DragDropItem[] = [
    { id: '1', label: '项目一' },
    { id: '2', label: '项目二' },
    { id: '3', label: '项目三' },
];

const mockNestedItems: DragDropItem[] = [
    { id: 'n1', data: { uuid: 'nested-1' }, label: '深层项目一' },
    { id: 'n2', data: { uuid: 'nested-2' }, label: '深层项目二' },
];


describe('SuDragDrop.vue', () => {

    it('应能正确挂载并渲染默认 UI', () => {
        // 作用：测试组件是否能无 props 正常渲染
        const wrapper = mount(SuDragDrop);
        expect(wrapper.find('.su-drag-drop').exists()).toBe(true);
        expect(wrapper.find('.su-drag-drop__dropzone-text').text()).toBe('拖放到这里');
    });

    it('应能根据 items prop 渲染源列表', () => {
        // 作用：测试 items prop 是否能正确渲染
        const wrapper = mount(SuDragDrop, {
            props: { items: mockItems },
        });
        const sourceItems = wrapper.findAll('.su-drag-drop__source-list .item-stub');
        expect(sourceItems).toHaveLength(mockItems.length);
        expect(sourceItems[0].text()).toBe('项目一');
    });

    it('应能将项目从源列表拖放到放置区', async () => {
        // 作用：测试核心的拖放功能
        const wrapper = mount(SuDragDrop, {
            props: { items: mockItems },
        });

        const sourceItem = wrapper.find('.su-drag-drop__source-list .item-stub');
        const dropzone = wrapper.find('.su-drag-drop__dropzone');

        // 作用：模拟拖放所需的数据传输对象
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', '1');

        // 作用：触发拖放事件序列
        await sourceItem.trigger('dragstart', { dataTransfer });
        await dropzone.trigger('drop', { dataTransfer });

        // 作用：验证 UI 状态
        expect(wrapper.findAll('.su-drag-drop__source-list .item-stub')).toHaveLength(2);
        const placedItems = wrapper.findAll('.su-drag-drop__meta-placed-list .item-stub');
        expect(placedItems).toHaveLength(1);
    });

    it('应能从放置区移除项目', async () => {
        // 作用：测试移除已放置项目的功能
        const wrapper = mount(SuDragDrop, {
            props: { items: mockItems },
        });

        // 作用：前置步骤，先放置一个项目
        const dropzone = wrapper.find('.su-drag-drop__dropzone');
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', '1');
        await dropzone.trigger('drop', { dataTransfer });

        // 作用：触发移除事件
        const placedItem = wrapper.find('.su-drag-drop__meta-placed-list .item-stub');
        await placedItem.trigger('click');

        // 作用：验证 UI 状态是否复原
        expect(wrapper.findAll('.su-drag-drop__source-list .item-stub')).toHaveLength(3);
        expect(wrapper.find('.su-drag-drop__meta-placed-list .item-stub').exists()).toBe(false);
    });

    it('拖放和移除操作后应能触发 "change" 事件并携带正确的载荷', async () => {
        // 作用：测试事件系统是否按预期工作
        const wrapper = mount(SuDragDrop, {
            props: { items: mockItems },
        });
        const dropzone = wrapper.find('.su-drag-drop__dropzone');
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', '1');

        // 作用：测试拖放后的事件
        await dropzone.trigger('drop', { dataTransfer });
        const emitted = wrapper.emitted('change');

        // 作用：断言事件存在，并使用 'as' 将 'unknown' 类型的载荷转换为已知类型
        expect(emitted).toBeDefined();
        const payload1 = emitted![0][0] as DragDropEventPayload;
        expect(payload1.source).toHaveLength(2);
        expect(payload1.placed).toHaveLength(1);
        expect(payload1.placed[0].id).toBe('1');

        // 作用：测试移除后的事件
        const placedItem = wrapper.find('.su-drag-drop__meta-placed-list .item-stub');
        await placedItem.trigger('click');

        const payload2 = emitted![1][0] as DragDropEventPayload;
        expect(payload2.source).toHaveLength(3);
        expect(payload2.placed).toHaveLength(0);
    });

    it('应能正确处理自定义的深层 onlykey', async () => {
        // 作用：测试 onlykey prop 在深层嵌套对象上的表现
        const wrapper = mount(SuDragDrop, {
            props: {
                items: mockNestedItems,
                onlykey: 'data.uuid',
            },
        });
        const dropzone = wrapper.find('.su-drag-drop__dropzone');

        // 作用：模拟使用深层 key 的拖放
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text/plain', 'nested-1');
        await dropzone.trigger('drop', { dataTransfer });

        // 作用：验证事件载荷
        const emitted = wrapper.emitted('change');
        expect(emitted).toBeDefined();
        const payload = emitted![0][0] as DragDropEventPayload;
        expect(payload.placed[0].data.uuid).toBe('nested-1');
    });
});