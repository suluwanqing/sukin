<template>
    <div class="demo-container">
        <div class="sizes-section">
            <h2>预设尺寸 (`size` 属性)</h2>
            <div class="size-group">
                <!-- 小尺寸卡片 -->
                <su-icard :items="itemsSmall" mode="stack" size="small">
                    <template #default="{ index }">
                        <div class="size-card small">小尺寸 {{ index + 1 }}</div>
                    </template>
                </su-icard>
                <!-- 中尺寸卡片 -->
                <su-icard :items="itemsMedium" mode="stack" size="medium">
                    <template #default="{ index }">
                        <div class="size-card medium">中尺寸 {{ index + 1 }}</div>
                    </template>
                </su-icard>
                <!-- 大尺寸卡片 -->
                <su-icard :items="itemsLarge" mode="stack" size="large">
                    <template #default="{ index }">
                        <div class="size-card large">大尺寸 {{ index + 1 }}</div>
                    </template>
                </su-icard>
            </div>
        </div>

        <div class="sizes-section">
            <h2>自定义尺寸 (`card-width`, `card-height` 属性)</h2>
            <div class="size-group">
                <!-- 自定义尺寸 1：数字类型，宽200px，高150px -->
                <su-icard :items="itemsCustom1" mode="stack" :card-width="200" :card-height="150">
                    <template #default="{ index }">
                        <div class="size-card custom-1">自定义 200x150 {{ index + 1 }}</div>
                    </template>
                </su-icard>
                <!-- 自定义尺寸 2：字符串类型（包含单位），宽300px，高200px -->
                <su-icard :items="itemsCustom2" mode="stack" card-width="300px" card-height="200px">
                    <template #default="{ index }">
                        <div class="size-card custom-2">自定义 300x200 {{ index + 1 }}</div>
                    </template>
                </su-icard>
                <!-- 自定义尺寸 3：更灵活的 CSS 单位 -->
                <su-icard :items="itemsCustom3" mode="stack" card-width="25vw" card-height="35vh">
                    <template #default="{ index }">
                        <div class="size-card custom-3">自定义 25vw x 35vh {{ index + 1 }}</div>
                    </template>
                </su-icard>
            </div>
        </div>
        <p class="demo-description">此示例展示了如何通过 `size` 属性设置预设尺寸，以及通过 `card-width` 和 `card-height`
            属性自定义卡片尺寸。自定义尺寸的优先级更高，可以传入数字（默认px）或带单位的字符串。</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const itemsSmall = ref(Array.from({ length: 3 }, (_, i) => ({ id: `small-${i + 1}` })));
const itemsMedium = ref(Array.from({ length: 3 }, (_, i) => ({ id: `medium-${i + 1}` })));
const itemsLarge = ref(Array.from({ length: 3 }, (_, i) => ({ id: `large-${i + 1}` })));
const itemsCustom1 = ref(Array.from({ length: 3 }, (_, i) => ({ id: `custom1-${i + 1}` })));
const itemsCustom2 = ref(Array.from({ length: 3 }, (_, i) => ({ id: `custom2-${i + 1}` })));
const itemsCustom3 = ref(Array.from({ length: 3 }, (_, i) => ({ id: `custom3-${i + 1}` })));
</script>

<style scoped>
.demo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.sizes-section {
    width: 100%;
    max-width: 900px;
    text-align: center;
}

.sizes-section h2 {
    margin-bottom: 25px;
    color: #333;
    font-size: 1.5em;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
}

.size-group {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-bottom: 20px;
}

.size-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    padding: 10px;
    box-sizing: border-box;
    font-size: 0.9em;
    
}


.size-card.small {
    background-color: #22c55e;
   
}

.size-card.medium {
    background-color: #efb80b;
}

.size-card.large {
    background-color: #0ea5e9;
}

.size-card.custom-1 {
    background-color: #f43f5e;
}

.size-card.custom-2 {
    background-color: #a855f7;
}

.size-card.custom-3 {
    background-color: #14b8a6;
}

.demo-description {
    margin-top: 20px;
    font-size: 0.9em;
    color: #666;
    text-align: center;
    max-width: 800px;
}
</style>