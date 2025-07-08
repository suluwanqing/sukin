<template>
    <div class="demo-wrapper">
        <p>当前值: {{ value.join(', ') || '无' }}</p>
        <SuSelection v-model="value" :items="groupedOptionsData" multiple placeholder="请选择 (含分组)" mode="dropdown" clearable />
        <button @click="value = ['chongqing', 'chengdu']">设为重庆和成都</button>
        <button @click="value = []">清空</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SuSelection } from 'sukin';

const groupedOptionsData = [
    {
        label: '直辖市',
        options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '天津', value: 'tianjin', disabled: true },
            { label: '重庆', value: 'chongqing' },
        ]
    },
    {
        label: '省会城市',
        options: [
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
            { label: '杭州', value: 'hangzhou' },
            { label: '成都', value: 'chengdu' },
        ]
    },
];



const value = ref([]);
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
    max-width: 300px;
}
button {
    padding: 8px 12px;
    background-color: var(--vp-c-brand-1);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    margin-right: 8px;
}
button:hover {
    background-color: var(--vp-c-brand-2);
}
</style>