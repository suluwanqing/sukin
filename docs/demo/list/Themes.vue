<template>
    <div>
        <div style="margin-bottom: 20px; display: flex; flex-direction: column; gap: 15px;">
            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                <label style="font-weight: 500; color: #303133; flex-shrink: 0;">切换主题:</label>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <SuButton :type="currentTheme === 'ocean-blue' && !isPlain ? 'primary' : 'default'"
                        @click="setTheme('ocean-blue')">
                        海洋之蓝
                    </SuButton>
                    <SuButton :type="currentTheme === 'sunset-glow' && !isPlain ? 'primary' : 'default'"
                        @click="setTheme('sunset-glow')">
                        落日余晖
                    </SuButton>
                    <SuButton :type="currentTheme === 'forest-green' && !isPlain ? 'primary' : 'default'"
                        @click="setTheme('forest-green')">
                        森林之绿
                    </SuButton>
                    <SuButton :type="currentTheme === 'cosmic-purple' && !isPlain ? 'primary' : 'default'"
                        @click="setTheme('cosmic-purple')">
                        宇宙之紫
                    </SuButton>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                <label style="font-weight: 500; color: #303133; flex-shrink: 0;">切换风格:</label>
                <SuButton @click="isPlain = !isPlain">
                    {{ isPlain ? '切换为主题风格' : '切换为朴素风格' }}
                </SuButton>
            </div>
        </div>
        <SuList :column="columns" :page-data="{ data: mockData, actions: rowActions }" :data="mockData"
            pagination-type="internal" :page-size="3" row-key="id" :theme="currentTheme" :plain="isPlain"
            @apply-theme="handleAction" />

        <SuAlert v-if="actionInfo" title="操作反馈" type="success" closable @close="actionInfo = null"
            style="margin-top: 16px;">
            在项目上触发了 "{{ actionInfo.label }}" 操作：{{ actionInfo.row.element }}
        </SuAlert>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type SuListTheme = 'ocean-blue' | 'sunset-glow' | 'forest-green' | 'cosmic-purple';

const currentTheme = ref<SuListTheme>('ocean-blue');
const isPlain = ref(false);
const actionInfo = ref<{ label: string, row: any } | null>(null);

const setTheme = (theme: SuListTheme) => {
    currentTheme.value = theme;
    // Clicking a theme button should always exit plain mode
    isPlain.value = false;
};

const columns = [
    { label: '主题元素', value: 'element' },
    { label: '描述', value: 'description' },
    { label: '状态', value: 'status' }
];

const mockData = [
    { id: 1, element: '主色调', description: '用于关键操作和高亮显示', status: '已应用' },
    { id: 2, element: '渐变按钮', description: '提供更丰富的视觉效果', status: '已应用' },
    { id: 3, element: '选中行背景', description: '清晰标识用户选中的数据', status: '已应用' },
    { id: 4, element: '焦点样式', description: '提升可访问性和交互反馈', status: '已应用' },
    { id: 5, element: '悬停效果', description: '提供即时的交互反馈', status: '已应用' },
];

const rowActions = [
    { label: '应用', emit: 'apply-theme', type: 'primary', icon: 'check' },
];

const handleAction = ({ action, row }: { action: any, row: any }) => {
    actionInfo.value = { label: action.label, row };
};
</script>