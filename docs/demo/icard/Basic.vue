<template>
    <div class="demo-container">

        <su-icard :items="items">
            <template #default="{ index }">

                <div class="basic-card">
                    卡片 {{ index + 1 }}
                </div>
            </template>
        </su-icard>
        <p class="demo-description">这是一个最基础的卡片组展示，使用默认的堆叠模式。</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const items = ref(Array.from({ length: 5 }, (_, i) => ({ id: i + 1 })));
</script>

<style scoped>
.demo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.basic-card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #60a5fa;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 1.2em;
    font-weight: bold;
}

.demo-description {
    margin-top: 20px;
    font-size: 0.9em;
    color: #666;
    text-align: center;
    max-width: 600px;
}
</style>