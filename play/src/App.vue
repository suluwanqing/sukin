<!-- 此示例代码已完全适配最终版的 SuList 组件，无需修改 -->
<template>
    <div class="demo-container">
        <h1 class="demo-title">SuList Component Demo</h1>

        <!-- SECTION A: INTERACTIVE CONTROLS -->
        <div class="control-panel">
            <h3 class="panel-title">Component Controls</h3>
            <div class="controls-grid">
                <div class="control-group">
                    <label>Pagination Mode:</label>
                    <button @click="togglePaginationMode" class="control-button">
                        Switch to {{ paginationMode === 'external' ? 'Internal' : 'External' }}
                    </button>
                </div>
                <div class="control-group">
                    <label for="show-filters">Show Filters:</label>
                    <input type="checkbox" id="show-filters" v-model="showFilters" />
                </div>
                <div class="control-group">
                    <label for="show-actions">Show Actions Column:</label>
                    <input type="checkbox" id="show-actions" v-model="showActionsColumn" />
                </div>
                <div class="control-group">
                    <label for="show-elevator">Show Page Jumper:</label>
                    <input type="checkbox" id="show-elevator" v-model="showElevator" />
                </div>
            </div>
        </div>

        <!-- SECTION B: STATE DISPLAY -->
        <div class="state-display">
            <h3>Parent Component State</h3>
            <div class="state-grid">
                <div><strong>Active Mode:</strong> <span class="state-value mode">{{ paginationMode }} pagination</span>
                </div>
                <div><strong>Current Page:</strong> <span class="state-value">{{ currentPage }}</span></div>
                <div><strong>Search Params:</strong> <span class="state-value code">{{ JSON.stringify(searchParams)
                }}</span></div>
                <div><strong>Selected IDs:</strong> <span class="state-value code">{{ selectedIds.join(', ') || 'None'
                }}</span></div>
            </div>
        </div>

        <!-- SECTION C: THE SULIST COMPONENT -->
        <SuList :pagination-type="paginationMode" :data="dataForInternalMode" :page-data="pageDataForExternalMode"
            :total="totalForExternalMode" v-model:currentPage="currentPage" :page-size="pageSize" :column="tableColumns"
            :mynavs="listNavs" :na-v-bt="navButtons" :nav-ic="iconButtons" :select-bt="searchButtons" :selectable="true"
            :show-filters="showFilters" :show-nav-buttons="true" :show-nav-icons="true"
            :show-actions-column="showActionsColumn" :show-elevator="showElevator" row-key="id" mode="full"
            @selection-change="handleSelectionChange" @search="handleSearch" @reset="handleReset"
            @add-user="handleAddUser" @export-data="handleExport" @refresh-data="handleRefresh" @edit="handleEdit"
            @delete="handleDelete" />
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
// 假设 SuList 从您的组件库中正确导入
import { SuList } from 'sukin';

// --- 1. CORE STATE ---
const masterData = ref([
    { id: 1, name: 'John Brown', email: 'john.brown@example.com', status: 'active', role: 'Admin' },
    { id: 2, name: 'Jim Green', email: 'jim.green@example.com', status: 'active', role: 'User' },
    { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', status: 'inactive', role: 'User' },
    { id: 4, name: 'Joe Black', email: 'joe.black@example.com', status: 'active', role: 'Developer' },
    { id: 5, name: 'Susan White', email: 'susan.white@example.com', status: 'pending', role: 'User' },
    { id: 6, name: 'Peter Jones', email: 'peter.jones@example.com', status: 'active', role: 'Developer' },
    { id: 7, name: 'Linda Smith', email: 'linda.smith@example.com', status: 'inactive', role: 'Guest' },
    { id: 8, name: 'Michael Johnson', email: 'michael.j@example.com', status: 'active', role: 'Admin' },
    { id: 9, name: 'Chris Lee', email: 'chris.lee@example.com', status: 'pending', role: 'User' },
    { id: 10, name: 'Patricia Garcia', email: 'pat.g@example.com', status: 'active', role: 'User' },
    { id: 11, name: 'David Miller', email: 'david.m@example.com', status: 'active', role: 'User' },
    { id: 12, name: 'Sarah Wilson', email: 'sarah.w@example.com', status: 'inactive', role: 'Guest' },
]);

const paginationMode = ref('external');
const showFilters = ref(true);
const showActionsColumn = ref(true);
const showElevator = ref(true);

const currentPage = ref(1);
const pageSize = ref(4);
const searchParams = reactive({ status: 'all', email: '' });
const selectedIds = ref([]);

// --- 2. CONFIGURATIONS FOR SuList PROPS ---
const tableColumns = [
    { label: 'ID', value: 'id' }, { label: 'Name', value: 'name' },
    { label: 'Email Address', value: 'email' }, { label: 'Status', value: 'status' },
];
const listNavs = [
    {
        name: 'Status', type: 'selection', column: 'status', options: [
            { label: 'All', value: 'all' }, { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' }, { label: 'Pending', value: 'pending' },
        ]
    },
    { name: 'Email', type: 'input', column: 'email', placeholder: 'Search by email...', },
];
const searchButtons = [{ label: 'Search', emit: 'search' }, { label: 'Reset', type: 'default', emit: 'reset' }];
const navButtons = [{ label: 'Add User', type: 'primary', emit: 'add-user' }];
const iconButtons = [{ label: 'Refresh', icon: 'arrows-rotate', emit: 'refresh-data' }];
const rowActions = [
    { label: 'Edit', type: 'primary', emit: 'edit' },
    { label: 'Delete', type: 'danger', emit: 'delete', hidden: (row) => row.role === 'Admin' },
];

// --- 3. COMPUTED PROPERTIES (DATA LOGIC) ---
const filteredData = computed(() => {
    return masterData.value.filter(item => {
        const statusMatch = searchParams.status === 'all' || item.status === searchParams.status;
        const emailMatch = item.email.toLowerCase().includes(searchParams.email.toLowerCase());
        return statusMatch && emailMatch;
    });
});

const dataForInternalMode = computed(() => {
    return paginationMode.value === 'internal' ? filteredData.value : [];
});

const totalForExternalMode = computed(() => {
    return paginationMode.value === 'external' ? filteredData.value.length : 0;
});
const pageDataForExternalMode = computed(() => {
    if (paginationMode.value !== 'external') return { data: [], actions: [] };

    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    const dataForPage = filteredData.value.slice(start, end);

    return { data: dataForPage, actions: rowActions };
});

// --- 4. EVENT HANDLERS & METHODS ---
const togglePaginationMode = () => {
    paginationMode.value = paginationMode.value === 'external' ? 'internal' : 'external';
    currentPage.value = 1;
};

const handleSearch = (filters) => {
    console.log('Search triggered with:', filters);
    searchParams.status = filters.status;
    searchParams.email = filters.email;
    currentPage.value = 1;
};

const handleReset = () => {
    console.log('Reset triggered');
    searchParams.status = 'all';
    searchParams.email = '';
    currentPage.value = 1;
};

const handleSelectionChange = (keys) => {
    console.log('Selection changed:', keys);
    selectedIds.value = keys;
};

const handleAddUser = () => { alert('Action: Add a new user.'); };
const handleRefresh = () => { alert('Action: Refreshing data!'); };
const handleExport = () => { alert('Action: Exporting data!'); };
const handleEdit = (row) => { alert(`Action: Edit user with ID ${row.id}`); };
const handleDelete = (row) => {
    if (confirm(`Are you sure you want to delete ${row.name}?`)) {
        masterData.value = masterData.value.filter(item => item.id !== row.id);
        alert('User deleted.');
    }
};
</script>

<style scoped>
.demo-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    max-width: 1200px;
    margin: 20px auto;
    padding: 24px;
    background-color: #f7f8fa;
    border-radius: 12px;
}

.demo-title {
    margin-bottom: 24px;
    text-align: center;
    color: #1a1a1a;
    font-weight: 600;
}

.control-panel,
.state-display {
    background-color: #fff;
    border: 1px solid #eef0f3;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.panel-title,
.state-display h3 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #333;
    border-bottom: 1px solid #eef0f3;
    padding-bottom: 12px;
    font-size: 18px;
    font-weight: 500;
}

.controls-grid,
.state-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px 24px;
}

.control-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.control-group label {
    font-weight: 500;
    color: #555;
}

.control-button {
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
}

.control-button:hover {
    border-color: #409eff;
    color: #409eff;
}

.state-grid>div {
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 4px 0;
}

.state-value {
    font-weight: 500;
    color: #333;
    background-color: #f4f4f5;
    padding: 3px 6px;
    border-radius: 4px;
    margin-left: 8px;
}

.state-value.mode {
    color: #fff;
    background-color: #409eff;
}

.state-value.code {
    font-family: 'Courier New', Courier, monospace;
}

input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
}
</style>