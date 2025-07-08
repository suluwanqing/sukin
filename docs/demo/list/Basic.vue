<template>
    <SuList :column="columns" :data="allMockData" pagination-type="internal" mode="standard" :page-size="5"
        :na-v-bt="navButtons" :nav-ic="navIcons" :show-elevator="true" @add-new="handleEvent('“新增”按钮被点击')"
        @refresh="handleEvent('“刷新”图标被点击')" />
    <SuAlert v-if="eventMessage" title="事件触发" type="success" closable @close="eventMessage = ''"
        style="margin-top: 16px;">
        {{ eventMessage }}
    </SuAlert>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Column { label: string; value: string; }
interface NavButton { label: string; emit: string; icon?: string; type?: string; }
interface NavIcon { label: string; emit: string; icon: string; }

const allMockData = Array.from({ length: 95 }, (_, i) => {
    const categories = ['电子产品', '书籍', '服装', '家居用品'] as const;
    const statuses = ['有货', '缺货', '低库存'] as const;
    return {
        id: i + 1,
        name: `产品 ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
        category: categories[i % 4],
        stock: Math.floor(Math.random() * 200),
        status: statuses[Math.floor(Math.random() * 3)],
        lastUpdate: `2023-10-${Math.floor(Math.random() * 30) + 1}`,
    };
});

const eventMessage = ref('');

const columns: Column[] = [
    { label: 'ID', value: 'id' },
    { label: '产品名称', value: 'name' },
    { label: '类别', value: 'category' },
    { label: '库存', value: 'stock' },
    { label: '状态', value: 'status' }
];

const navButtons: NavButton[] = [
    { label: '新增', emit: 'add-new', icon: 'plus', type: 'primary' }
];

const navIcons: NavIcon[] = [
    { label: '刷新', emit: 'refresh', icon: 'arrows-rotate' }
];

const handleEvent = (message: string) => {
    eventMessage.value = message;
    setTimeout(() => eventMessage.value = '', 3000);
};
</script>