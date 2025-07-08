<template>
    <div class="demo-wrapper">
        <p>单选 (禁用):</p>
        <SuSelection v-model="value1" :items="basicOptionsData" disabled placeholder="此组件已禁用" mode="dropdown" />
        <p>多选 (禁用单个选项):</p>
        <SuSelection v-model="value2" :items="basicOptionsData" multiple mode="dropdown" />
        <p>多选 (禁用整个组件):</p>
        <SuSelection v-model="value3" :items="basicOptionsData" multiple disabled placeholder="此组件已完全禁用"
            mode="dropdown" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuSelection } from 'sukin';

const basicOptionsData = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen', disabled: true },
    { label: '杭州', value: 'hangzhou' },
];



const value1 = ref < string | null > ('beijing');
const value2 = ref < string[] > (['hangzhou']); 
const value3 = ref < string[] > (['shanghai']);
</script>

<style scoped>
.demo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    margin-top: 16px;
}

p {
    font-size: 14px;
    color: var(--vp-c-text-2);
    margin: 0;
}

.su-selection {
    max-width: 250px;
    margin-bottom: 10px;
}
</style>