<template>
    <h3>循环轮播</h3>
    <su-icard :items="items" mode="carousel" v-model:activeIndex="activeCarouselIndex" :autoplay="true"
        :autoplayInterval="2500" :pauseOnHover="true" :loop="true">
        <template #default="{ item }">
            <div
                style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <img :src="item.imageUrl" style="width: 100%; height: 70%; object-fit: cover;" />
                <p style="margin-top: 10px; font-weight: bold;">{{ item.title }}</p>
            </div>
        </template>
    </su-icard>
    <p style="text-align: center; margin-top: 20px;">当前信息: {{ items[activeCarouselIndex].title }}</p>

    <h3 style="margin-top: 40px;">非循环 带返回</h3>
    <su-icard :items="items" mode="carousel" v-model:activeIndex="activeCarouselIndex" :autoplay="false" :loop="false"
        :showCarouselGoToFirst="true">
        <template #default="{ item }">
            <div
                style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <img :src="item.imageUrl" style="width: 100%; height: 70%; object-fit: cover;" />
                <p style="margin-top: 10px; font-weight: bold;">{{ item.title }}</p>
            </div>
        </template>
    </su-icard>
    <p style="text-align: center; margin-top: 20px;">当前信息: {{ items[activeCarouselIndex].title }}</p>
</template>
<script setup>
import { ref } from 'vue';
const items = [
    { id: 1, title: 'Carousel Item 1', imageUrl: 'https://picsum.photos/id/30/160/220' },
    { id: 2, title: 'Carousel Item 2', imageUrl: 'https://picsum.photos/id/31/160/220' },
    { id: 3, title: 'Carousel Item 3', imageUrl: 'https://picsum.photos/id/32/160/220' },
    { id: 4, title: 'Carousel Item 4', imageUrl: 'https://picsum.photos/id/33/160/220' },
    { id: 5, title: 'Carousel Item 5', imageUrl: 'https://picsum.photos/id/34/160/220' },
];

const activeCarouselIndex = ref(0);
</script>
