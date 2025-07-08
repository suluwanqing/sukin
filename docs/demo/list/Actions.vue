<template>
    <SuList :column="columns" :page-data="pageDataConfig" :data="allMockData" pagination-type="internal" :page-size="5"
        row-key="id" @edit-item="handleAction('编辑', $event)" @delete-item="handleAction('删除', $event)"
        @view-details="handleAction('查看', $event)" />
    <SuAlert v-if="actionInfo" :title="`操作: ${actionInfo.type}`" :type="alertType" closable @close="actionInfo = null"
        style="margin-top: 16px;">
        在项目上触发: {{ actionInfo.row.name }} (ID: {{ actionInfo.row.id }})
    </SuAlert>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

interface Column { label: string; value: string; }
interface RowAction { label: string; emit: string; icon?: string; type?: string; hidden?: (row: any) => boolean; }
interface PageData { data: any[]; actions: RowAction[]; }

const allMockData = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    name: `产品 ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
    stock: Math.floor(Math.random() * 200),
    status: ['有货', '缺货', '低库存'][Math.floor(Math.random() * 3)],
}));

const actionInfo = ref<{ type: string, row: any } | null>(null);
const alertType = computed(() => {
    if (!actionInfo.value) return 'info';
    const typeMap: { [key: string]: 'warning' | 'danger' | 'success' } = { '编辑': 'warning', '删除': 'danger', '查看': 'success' };
    return typeMap[actionInfo.value.type] || 'info';
});

const columns: Column[] = [
    { label: '产品名称', value: 'name' },
    { label: '库存', value: 'stock' },
    { label: '状态', value: 'status' }
];

const rowActions: RowAction[] = [
    { label: '查看', emit: 'view-details', type: 'success', icon: 'eye' },
    { label: '编辑', emit: 'edit-item', type: 'primary', icon: 'pencil' },
    {
        label: '删除',
        emit: 'delete-item',
        type: 'danger',
        icon: 'trash',
        hidden: (row) => row.stock > 50
    }
];

const pageDataConfig: PageData = reactive({
    data: [],
    actions: rowActions
});

const handleAction = (type: string, row: any) => {
    actionInfo.value = { type, row };
};
</script>

