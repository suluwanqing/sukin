<template>
    <su-icard :items="items" mode="stack" :stackOffset="50" :stackRotate="5" @click="handleCardClick">
        <template #default="{ item, index, isActive }">
            <div :class="['custom-icard-content', item.className]">
                <h3>{{ item.text }}</h3>
                <p v-if="isActive">
                    页数{{ index + 1 }}!
                </p>
                <button v-if="isActive">
                    点击
                </button>
            </div>
        </template>
    </su-icard>
    <p style="margin-top: 40px; text-align: center; color: #666;">
        <strong style="color: #333;">提示：</strong>此示例展示了在卡片内部放置任意 HTML (如 h3, p, button) 和应用动态样式。
    </p>
</template>
<script setup>
const items = [
    { id: 1, text: 'Hello Vue', className: 'custom-icard-content--vue' },
    { id: 2, text: 'Custom DOM', className: 'custom-icard-content--dom' },
    { id: 3, text: 'Flexibility', className: 'custom-icard-content--flex' },
    { id: 4, text: 'Rich Content', className: 'custom-icard-content--rich' },
];

const handleCardClick = (event, item, index) => {
    console.log(`Card ${item.text} clicked! Index: ${index}`);
};
</script>
<style scoped>
.custom-icard-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    color: white;
}

.custom-icard-content h3 {
    margin-bottom: 10px;
}

.custom-icard-content p {
    font-size: 0.9em;
}

.custom-icard-content button {
    margin-top: 15px;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.custom-icard-content button:hover {
    background-color: rgba(255, 255, 255, 0.3);
}


.custom-icard-content--vue {
    background-color: #42b983;
}

.custom-icard-content--dom {
    background-color: #34495e;
}

.custom-icard-content--flex {
    background-color: #ffc107;
    color: #333;
}

.custom-icard-content--rich {
    background-color: #17a2b8;
}
</style>
