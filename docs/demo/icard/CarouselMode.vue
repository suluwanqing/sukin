<template>
    <div class="demo-container">
        <div class="controls">
            <!-- 自动播放控制 -->
            <label>
                <input type="checkbox" v-model="autoplay" /> 自动播放
            </label>
            <!-- 循环播放控制 -->
            <label>
                <input type="checkbox" v-model="loop" /> 循环播放
            </label>
            <!-- 只有非循环模式下才显示“返回第一项”按钮控制 -->
            <label v-if="!loop">
                <input type="checkbox" v-model="showGoToFirst" /> 最后一项显示“返回”
            </label>
        </div>


        <su-icard :items="items" mode="carousel" :autoplay="autoplay" :autoplay-interval="2000" :pause-on-hover="true"
            :loop="loop" :show-carousel-go-to-first="showGoToFirst" v-model:active-index="activeIndex"
            @click="handleCardClick">
            <template #default="{ index, isActive }">
                <div :class="['card-content-carousel', { 'is-active': isActive }]">
                    <h3>轮播卡片 {{ index + 1 }}</h3>
                    <p v-if="isActive">当前显示</p>
                </div>
            </template>
        </su-icard>
        <p class="demo-description">在轮播模式下，卡片水平滑动。您可以控制自动播放、循环播放，以及非循环模式下到达最后一项时是否显示“返回”按钮。</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const items = ref(Array.from({ length: 8 }, (_, i) => ({ id: i + 1 })));


const autoplay = ref(true);

const loop = ref(true);

const showGoToFirst = ref(true);

const activeIndex = ref(0);

const handleCardClick = (event, item, index) => {
    console.log(`点击了轮播模式下的卡片: ${index + 1}`);
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
    flex-wrap: wrap;
    justify-content: center;
    background-color: #e6ffed;
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
    accent-color: #4CAF50;
}

.card-content-carousel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #3b82f6;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 1.1em;
    font-weight: bold;
    padding: 10px;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
}

.card-content-carousel.is-active {
    background-color: #2563eb;
}

.card-content-carousel p {
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