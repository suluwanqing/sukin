<template>
    <SuList :column="columns" :data="allMockData" pagination-type="internal" mode="standard" :page-size="5" selectable
        row-key="id" @selection-change="handleSelectionChange" />
    <SuAlert v-if="selectedCount > 0" title="选择信息" type="info" closable @close="selectedIds = []"
        style="margin-top: 16px;">
        <p>已选择 {{ selectedCount }} 项。</p>
        <p>ID: {{ selectedIds.join(', ') }}</p>
    </SuAlert>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Column { label: string; value: string; }

const allMockData = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    name: `产品 ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
    category: ['电子产品', '书籍', '服装', '家居用品'][i % 4],
    stock: Math.floor(Math.random() * 200)
}));

const selectedIds = ref<number[]>([]);
const selectedCount = computed(() => selectedIds.value.length);

const columns: Column[] = [
    { label: 'ID', value: 'id' },
    { label: '产品名称', value: 'name' },
    { label: '类别', value: 'category' }
];

const handleSelectionChange = (keys: number[]) => {
    selectedIds.value = keys;
};
</script>