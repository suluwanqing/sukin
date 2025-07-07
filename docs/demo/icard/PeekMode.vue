<template>
    <div class="demo-container">
        <div class="controls">
            <label>
                <input type="checkbox" v-model="showIndicators" /> 显示底部指示器
            </label>
        </div>

     
        <su-icard :items="items" mode="peek" :peek-offset="50" 
            :peek-scale="0.8" 
            :show-indicators="showIndicators" 
            :autoplay="false" 
            :loop="true" 
            v-model:active-index="activeIndex" 
            @click="handleCardClick"
            >
            <template #default="{ index, isActive }">
                <div :class="['card-content-peek', { 'is-active': isActive }]">
                    <h3>窥视卡片 {{ index + 1 }}</h3>
                    <p v-if="isActive">当前中心</p>
                </div>
            </template>
        </su-icard>
        <p class="demo-description">在窥视模式下，中心卡片完全显示，两侧卡片部分露出。您可以控制是否显示底部导航指示器，以及调整 `peekOffset` 和 `peekScale` 观察效果。</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const items = ref(Array.from({ length: 7 }, (_, i) => ({ id: i + 1 })));
const showIndicators = ref(true);
const activeIndex = ref(0);
const handleCardClick = (event, item, index) => {
    console.log(`点击了窥视模式下的卡片: ${index + 1}`);
};
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

.controls {
    display: flex;
    gap: 20px;
    justify-content: center;
    background-color: #e0f7fa;
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 0.9em;
    color: #333;
}

.controls label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.controls input[type="checkbox"] {
    transform: scale(1.1);
    accent-color: #00bcd4;
}

.card-content-peek {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #9333ea;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 1.1em;
    font-weight: bold;
    padding: 10px;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
}

.card-content-peek.is-active {
    background-color: #7e22ce;
}

.card-content-peek p {
    font-size: 0.8em;
    margin-top: 5px;
    opacity: 0.9;
}

.demo-description {
    margin-top: 20px;
    font-size: 0.9em;
    color: #666;
    text-align: center;
    max-width: 600px;
}
</style>