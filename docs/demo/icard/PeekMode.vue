<template>
    <su-icard :items="items" mode="peek" v-model:activeIndex="activePeekIndex" :autoplay="true" :autoplayInterval="3500"
        :pauseOnHover="true" :loop="true" :peekOffset="70" :peekScale="0.7" :showIndicators="true">
        <template #default="{ item, isActive }">
            <div
                style="width: 100%; height: 100%; position: relative; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; color: white;">
                <img :src="item.imageUrl"
                    style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: -1; filter: brightness(0.6);" />
                <h3 style="margin-bottom: 15px; opacity: 0; transition: opacity 0.3s;"
                    :style="{ opacity: isActive ? 1 : 0 }">{{ item.title }}</h3>
            </div>
        </template>
    </su-icard>
    <p style="text-align: center; margin-top: 20px;">当前信息: {{ items[activePeekIndex].title }}</p>
</template>
<script setup>
import { ref } from 'vue';
const items = [
    { id: 1, title: 'Peek 1', imageUrl: 'https://picsum.photos/id/40/280/380' },
    { id: 2, title: 'Peek 2', imageUrl: 'https://picsum.photos/id/41/280/380' },
    { id: 3, title: 'Peek 3', imageUrl: 'https://picsum.photos/id/42/280/380' },
    { id: 4, title: 'Peek 4', imageUrl: 'https://picsum.photos/id/43/280/380' },
    { id: 5, title: 'Peek 5', imageUrl: 'https://picsum.photos/id/44/280/380' },
];

const activePeekIndex = ref(0);
</script>

