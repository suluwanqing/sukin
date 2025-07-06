<template>
    <div class="demo-wrapper">
        <p>当前值: {{ value.join(', ') || '无' }}</p>
        <SuSelection v-model="value" :items="basicOptionsData" multiple placeholder="请选择多个城市" mode="dropdown"
            clearable />
        <button @click="value = ['beijing', 'shanghai']">设为北京和上海</button>
        <button @click="value = []">清空</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuSelection } from 'sukin';
import { basicOptionsData } from './data';

const value = ref < string[] > (['beijing']);
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
    max-width: 400px;
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