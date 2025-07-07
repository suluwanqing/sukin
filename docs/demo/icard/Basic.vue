<template>
    <div>
        <div class="container">
            <h3>堆叠</h3>
            <su-icard :items="items" mode="stack" />
        </div>

        <div class="container">
            <h3>轮播</h3>
            <su-icard :items="items" mode="carousel" :loop="true" />

        </div>
        <div class="container">
            <h3>透视</h3>
            <su-icard :items="items" mode="peek" :loop="true" />
        </div>


    </div>
</template>
<script setup>
const items = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    { id: 4, title: 'Card 4' },
    { id: 5, title: 'Card 5' },
];
</script>
