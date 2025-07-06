<template>
    <div class="demo-wrapper">
        <p>当前路径: {{ value?.join(' > ') || '无' }}</p>
        <SuSelection v-model="value" :items="cascaderRegionsData" placeholder="请选择省/市/区" mode="cascader" clearable
            size="default" />
        <button @click="value = ['gd', 'gz', 'th']">设为广东-广州-天河</button>
        <button @click="value = []">清空</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SuSelection } from 'sukin';
import { cascaderRegionsData } from './data';
const value = ref(null);
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
    max-width: 280px;
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