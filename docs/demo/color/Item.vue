<template>
    <div class="color-card-elegant" :title="`点击复制: ${color}`" @click="$emit('copy', { color, name })"
        :style="{ '--hover-color': color }">
        <div class="color-swatch" :style="{ backgroundColor: color }">
            <div class="color-overlay"></div>
        </div>
        <div class="color-info">
            <span class="color-name">{{ name }}</span>
            <span class="color-hex">{{ color }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    color: { type: String, required: true },
    name: { type: String, required: true },
});
defineEmits(['copy']);
</script>

<style scoped>
.color-card-elegant {
    --hover-color: #000;
    border-radius: 12px;
    background-color: #ffffff;
    border: 1px solid #f0f0f0;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    position: relative;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.color-card-elegant:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 28px -5px rgba(0, 0, 0, 0.12), 0 12px 12px -5px rgba(0, 0, 0, 0.06);
    border-color: rgba(var(--hover-color), 0.15);
}

.color-swatch {
    height: 100px;
    position: relative;
    overflow: hidden;
}

.color-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%);
}

.color-info {
    padding: 16px;
    text-align: left;
    background: #fff;
}

.color-name {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 6px;
    letter-spacing: 0.2px;
}

.color-hex {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 13px;
    color: #64748b;
    letter-spacing: 0.3px;
    display: inline-block;
    padding: 2px 6px;
    background-color: #f8fafc;
    border-radius: 4px;
}


.color-card-elegant:active {
    transform: translateY(-3px) scale(0.98);
    transition: all 0.1s ease;
}
</style>