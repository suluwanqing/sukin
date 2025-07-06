<template>
    <div class="demo-wrapper">
        <h3>水平布局 (Horizontal)</h3>
        <SuDataform :sections="formSections" direction="horizontal" initial-form="登录" />

        <h3 style="margin-top: 40px;">小尺寸 (Small)</h3>
        <SuDataform :sections="formSections" size="small" initial-form="注册" />
    </div>
</template>

<script setup lang="ts">
import { SuDataform } from "sukin";
import { formSections } from './data';
</script>

<style scoped>
.demo-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
}


.su-dataform {
    background-color: white;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>