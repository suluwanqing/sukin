<template>
    <div>
        <SuList v-model:currentPage="currentPage" mode="full" :column="columns" :mynavs="filterNavs"
            :select-bt="filterButtons" :na-v-bt="navButtons" :nav-ic="navIcons" :page-data="pageData"
            :page-size="pageSize" :total="total" pagination-type="external" selectable row-key="id"
            :show-elevator="true" @selection-change="handleSelectionChange" @search="handleSearch" @reset="handleReset"
            @add-new="handleNavAction('新增')" @batch-delete="handleNavAction('批量删除')" @refresh="fetchPageData"
            @export="handleNavAction('导出')" @edit-item="handleRowAction('编辑', $event)"
            @delete-item="handleRowAction('删除', $event)" />

        <SuAlert v-if="alertMessage" title="操作触发" type="success" closable @close="alertMessage = ''"
            style="margin-top: 16px;">
            {{ alertMessage }}
        </SuAlert>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';

interface MockData { id: number; name: string; category: string; stock: number; status: string; }
interface Column { label: string; value: string; }
interface NavItem { name: string; type: 'selection' | 'input'; column: string; options?: { label: string; value: any }[]; placeholder?: string; icon?: string; }
interface NavButton { label: string; emit: string; icon?: string; type?: string; }
interface NavIcon { label: string; emit: string; icon: string; }
interface RowAction { label: string; emit: string; type?: string; icon?: string; }
interface PageData { data: any[]; actions: RowAction[]; }

const allMockData: MockData[] = Array.from({ length: 95 }, (_, i) => {
    const categories = ['电子产品', '书籍', '服装', '家居用品'] as const;
    const statuses = ['有货', '缺货', '低库存'] as const;
    return {
        id: i + 1,
        name: `产品 ${String.fromCharCode(65 + (i % 26))}-${i + 1}`,
        category: categories[i % 4],
        stock: Math.floor(Math.random() * 200),
        status: statuses[Math.floor(Math.random() * 3)],
    };
});

const currentPage = ref(1);
const pageSize = ref(7);
const total = ref(0);
const pageData: PageData = reactive({ data: [], actions: [] });
const searchParams = ref<Record<string, any>>({});
const alertMessage = ref('');

const columns: Column[] = [
    { label: 'ID', value: 'id' }, { label: '产品名称', value: 'name' }, { label: '类别', value: 'category' }, { label: '库存', value: 'stock' }, { label: '状态', value: 'status' }
];
const filterNavs: NavItem[] = [
    { name: '状态', type: 'selection', column: 'status', options: [{ label: '全部', value: '' }, { label: '有货', value: '有货' }, { label: '缺货', value: '缺货' }, { label: '低库存', value: '低库存' },] },
    { name: '产品', type: 'input', column: 'name', placeholder: '输入产品名称...', icon: 'magnifying-glass' }
];
const filterButtons: NavButton[] = [{ label: '搜索', emit: 'search', type: 'primary' }, { label: '重置', emit: 'reset', type: 'info' }];
const navButtons: NavButton[] = [{ label: '新增', emit: 'add-new', icon: 'plus', type: 'primary' }, { label: '批量删除', emit: 'batch-delete', icon: 'trash', type: 'danger' }];
const navIcons: NavIcon[] = [{ label: '刷新', emit: 'refresh', icon: 'arrows-rotate' }, { label: '导出', emit: 'export', icon: 'download' }];
const rowActions: RowAction[] = [{ label: '编辑', emit: 'edit-item', type: 'primary', icon: 'pencil' }, { label: '删除', emit: 'delete-item', type: 'danger', icon: 'trash' }];

const fetchDataFromAPI = (page: number, size: number, filters: Record<string, any>): Promise<{ data: MockData[], total: number }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            let filteredData = allMockData;
            if (filters.status) filteredData = filteredData.filter(item => item.status === filters.status);
            if (filters.name) filteredData = filteredData.filter(item => item.name.toLowerCase().includes(String(filters.name).toLowerCase()));
            const start = (page - 1) * size;
            const paginatedData = filteredData.slice(start, start + size);
            resolve({ data: paginatedData, total: filteredData.length });
        }, 300);
    });
};

const fetchPageData = async () => {
    const { data, total: newTotal } = await fetchDataFromAPI(currentPage.value, pageSize.value, searchParams.value);
    pageData.data = data;
    pageData.actions = rowActions;
    total.value = newTotal;
};

const handleSearch = (filters: Record<string, any>) => {
    searchParams.value = filters;
    currentPage.value = 1; fetchPageData();
    alertMessage.value = `正在使用筛选器搜索: ${JSON.stringify(filters)}`;
};
const handleReset = () => {
    searchParams.value = {};
    currentPage.value = 1; fetchPageData();
    alertMessage.value = '筛选条件已重置。';
};
const handleSelectionChange = (keys: number[]) => { if (keys.length > 0) alertMessage.value = `已选择 ${keys.length} 个项目。`; };
const handleRowAction = (type: string, row: MockData) => { alertMessage.value = `操作 '${type}' 已在行上触发: ${row.name}`; };
const handleNavAction = (type: string) => { alertMessage.value = `导航操作 '${type}' 已触发。`; }

watch(currentPage, fetchPageData);
onMounted(fetchPageData);
</script>