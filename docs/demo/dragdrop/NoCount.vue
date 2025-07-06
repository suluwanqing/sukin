<template>
    <div>
        <p>下方组件已设置 <code>:show-count="false"</code>，隐藏了计数区域。</p>
        <SuDragDrop :items="allItems" :show-count="false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const allItems = ref([
    { id: 'tool-a', name: '扳手 🔧' },
    { id: 'tool-b', name: '锤子 🔨' },
    { id: 'tool-c', name: '螺丝刀 🪛' },
]);
</script>