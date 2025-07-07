<template>
    <div class="app-container">
        <h2>模式：Peek (大尺寸卡片, 自动播放, 鼠标悬停暂停, 带指示器)</h2>
        <SuIcard :items="cardData" mode="peek" v-model:activeIndex="currentPeekIndex" size="large" :loop="true"
            :autoplay="true" :autoplayInterval="4000" :pauseOnHover="true" :showIndicators="true">
            <template #default="{ item, isActive }">
                <div class="custom-card" :class="{ 'is-active-card': isActive }">
                    <img :src="item.imageUrl" :alt="item.title">
                    <h3>{{ item.title }}</h3>
                    <p v-if="isActive">{{ item.description }}</p>
                </div>
            </template>
        </SuIcard>
        <p class="status-text">当前激活卡片 (大尺寸): {{ cardData[currentPeekIndex].title }}</p>

        <hr>

        <h2>模式：Carousel (小尺寸卡片, 自动播放, 非循环, 尾部跳转按钮)</h2>
        <SuIcard :items="cardData" mode="carousel" size="small" :cardWidth="160" :cardHeight="220" :loop="false"
            :autoplay="true" :autoplayInterval="3000" :pauseOnHover="true" v-model:activeIndex="currentCarouselIndex"
            :showIndicators="false" :showCarouselGoToFirst="true" :showNavigationButtons="false">
            <template #default="{ item }">
                <div class="carousel-card">
                    <img :src="item.imageUrl" :alt="item.title">
                    <h4>{{ item.title }}</h4>
                </div>
            </template>
        </SuIcard>
        <p class="status-text">当前激活卡片 (小尺寸): {{ cardData[currentCarouselIndex].title }}</p>

        <hr>

        <h2>模式：Stack (点击切换抽出/收回)</h2>
        <SuIcard :items="cardData.slice(0, 5)" mode="stack" size="medium" :stackExtractedOffset="80" :stackOffset="60"
            :stackRotate="8" v-model:activeIndex="currentStackToggleIndex" :autoplay="false" :showIndicators="false"
            :showCarouselGoToFirst="false" :showNavigationButtons="false" stackExtraction="toggle">
            <template #default="{ item, isActive }">
                <div class="stack-card" :class="{ 'is-active-stack-card': isActive }">
                    <p>{{ item.title }}</p>
                </div>
            </template>
        </SuIcard>
        <p class="status-text">当前激活栈式卡片 (点击切换抽出/收回): {{ cardData[currentStackToggleIndex].title }}</p>

        <hr>

        <h2>模式：Stack (鼠标悬浮抽出)</h2>
        <SuIcard :items="cardData.slice(0, 5)" mode="stack" size="medium" :stackExtractedOffset="60" :stackOffset="60"
            :stackRotate="8" v-model:activeIndex="currentStackHoverIndex" :autoplay="false" :showIndicators="false"
            :showCarouselGoToFirst="false" :showNavigationButtons="false" stackExtraction="hover">
            <template #default="{ item, isActive }">
                <div class="stack-card" :class="{ 'is-active-stack-card': isActive }">
                    <p>{{ item.title }}</p>
                </div>
            </template>
        </SuIcard>
        <p class="status-text">当前激活栈式卡片 (鼠标悬浮抽出): {{ cardData[currentStackHoverIndex].title }}</p>

        <hr>

        <h2>模式：Stack (无抽出)</h2>
        <SuIcard :items="cardData.slice(0, 5)" mode="stack" size="medium" :stackOffset="60" :stackRotate="8"
            v-model:activeIndex="currentStackNoneIndex" :autoplay="false" :showIndicators="false"
            :showCarouselGoToFirst="false" :showNavigationButtons="false" stackExtraction="none">
            <template #default="{ item, isActive }">
                <div class="stack-card" :class="{ 'is-active-stack-card': isActive }">
                    <p>{{ item.title }}</p>
                </div>
            </template>
        </SuIcard>
        <p class="status-text">当前激活栈式卡片 (无抽出): {{ cardData[currentStackNoneIndex].title }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { SuIcard } from "sukin"

const currentPeekIndex = ref(0);
const currentCarouselIndex = ref(0);
const currentStackToggleIndex = ref(2);
const currentStackHoverIndex = ref(0);
const currentStackNoneIndex = ref(4);

const cardData = ref([
    { id: 1, title: '壮丽山景', imageUrl: 'https://picsum.photos/id/10/280/400', description: '雄伟的山峰直插云霄。' },
    { id: 2, title: '魔法森林', imageUrl: 'https://picsum.photos/id/11/280/400', description: '隐藏的小径和古老的树木。' },
    { id: 3, title: '浩瀚海洋', imageUrl: 'https://picsum.photos/id/12/280/400', description: '无尽的蓝色，汹涌的波浪。' },
    { id: 4, title: '都市霓虹', imageUrl: 'https://picsum.photos/id/13/280/400', description: '灯火璀璨，繁忙的城市。' },
    { id: 5, title: '寂静沙漠', imageUrl: 'https://picsum.photos/id/14/280/400', description: '阳光下的寂静沙丘。' },
    { id: 6, title: '神秘湖泊', imageUrl: 'https://picsum.photos/id/15/280/400', description: '平静的湖水倒映着浮云。' },
]);
</script>

<style>
body {
    background-color: #f4f7f9;
    margin: 0;
    padding: 0;
}

.app-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

h2 {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 30px;
    color: #4a4a4a;
}

hr {
    margin: 80px 0;
    border: 0;
    border-top: 1px solid #e0e0e0;
}

.status-text {
    text-align: center;
    margin-top: 50px;
    font-weight: bold;
    color: #666;
    font-size: 1.1em;
}

.custom-card {
    width: 100%;
    height: 100%;
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    overflow: hidden;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    padding-bottom: 25px;
}

.custom-card img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: brightness(0.6);
    transition: transform 0.5s ease;
}

.custom-card h3 {
    margin: 0 15px 5px 15px;
    font-size: 1.6em;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.custom-card p {
    margin: 0 15px 0 15px;
    font-size: 0.9em;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.custom-card.is-active-card h3,
.custom-card.is-active-card p {
    opacity: 1;
    transform: translateY(0);
}

.custom-card.is-active-card img {
    transform: scale(1.05);
}

.carousel-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #333;
    border-radius: 10px;
    overflow: hidden;
}

.carousel-card img {
    width: 100%;
    height: 70%;
    object-fit: cover;
    border-bottom: 1px solid #eee;
}

.carousel-card h4 {
    margin: 10px 0;
    font-size: 1.1em;
    color: #555;
}

.stack-card {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.5em;
    color: #888;
    background-color: transparent;
    /* Your example has transparent, if you want solid, change here */
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: all 0.5s ease;
}

.stack-card.is-active-stack-card {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid #ddd;
}
</style>