<template>
    <su-icard :items="items" mode="stack" v-model:activeIndex="activeStackIndex" :stackOffset="60" :stackRotate="7"
        :stackExtractedOffset="90" @click="onCardClick">
        <template #default="{ item, isActive }">
            <div
                style="width: 100%; height: 100%; position: relative; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; color: white;">
                <img :src="item.imageUrl"
                    style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: -1; filter: brightness(0.7);" />
                <h3 style="margin-bottom: 10px;">{{ item.title }}</h3>
                <p v-if="isActive" style="font-size: 0.9em; margin-bottom: 20px;">{{ activeStackIndex }}</p>
            </div>
        </template>
    </su-icard>
    <p style="text-align: center; margin-top: 20px;">当前信息: {{ items[activeStackIndex].title }}</p>
</template>
<script setup>
import { ref } from 'vue';
const items = [
    { id: 1, title: 'Mountain', imageUrl: 'https://picsum.photos/id/20/240/320' },
    { id: 2, title: 'Forest', imageUrl: 'https://picsum.photos/id/21/240/320' },
    { id: 3, title: 'Ocean', imageUrl: 'https://picsum.photos/id/22/240/320' },
    { id: 4, title: 'City', imageUrl: 'https://picsum.photos/id/23/240/320' },
    { id: 5, title: 'Desert', imageUrl: 'https://picsum.photos/id/24/240/320' },
];

const activeStackIndex = ref(2);
const onCardClick = (event, item, index) => {
    console.log('Clicked:', item.title, 'Index:', index);
};
</script>
