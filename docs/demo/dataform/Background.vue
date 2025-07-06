<template>
    <div class="demo-wrapper" style="padding: 20px; background: #eee; border-radius: 12px;">
        <SuDataform :sections="formSections" :background-image="imageUrl" initial-form="登录" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuDataform } from "sukin";
import { formSections } from './data';

// 使用一个好看的、免费的背景图片 URL
const imageUrl = ref('https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80');
</script>

<style scoped>
.demo-wrapper {
    max-width: 500px;
    margin: 0 auto;
}
</style>