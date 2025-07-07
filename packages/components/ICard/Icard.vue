<template>
    <div :class="containerClasses" :style="containerStyles" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <div :class="bem.e('track')" :style="trackStyle">
            <div v-for="(item, index) in props.items" :key="item.id || index"
                :class="[bem.e('item'), { [bem.is('active', index === activeIndex)]: true }]"
                :style="getItemStyle(index)" @click="onCardClick(item, index, $event)"
                @mouseenter="handleCardItemMouseEnter(index, item, $event)"
                @mouseleave="handleCardItemMouseLeave(index, item, $event)">
                <slot :item="item" :index="index" :is-active="index === activeIndex">
                    <span> {{ index + 1 }}</span>
                </slot>
            </div>
        </div>

        <button
            v-if="props.mode === 'carousel' && props.showCarouselGoToFirst && totalItems > 1 && activeIndex === totalItems - 1 && !props.loop"
            :class="bem.e('go-to-first')" @click="setActive(0)" aria-label="Go to first card">
            返回
        </button>

        <div v-if="props.mode === 'peek' && props.showIndicators && totalItems > 1" :class="bem.e('indicators')">
            <button v-for="(_, index) in props.items" :key="`ind-${index}`"
                :class="[bem.e('indicator'), { [bem.is('active', index === activeIndex)]: true }]"
                @click="setActive(index)" aria-label="Go to card"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, defineOptions } from 'vue';
import { withDefaults, defineProps, defineEmits, defineExpose, useModel } from 'vue';
import { createNamespace } from '@sukin/utils';
import type { CardStackProps, CardStackEmits, CardStackExpose, CardStackItem, CardStackSize } from './type';
import { handleCardClick, handleCardHover as _handleCardHover } from './events';

defineOptions({ name: 'SuIcard' });

const bem = createNamespace('card-stack');

const CARD_SIZES_MAP: Record<CardStackSize, { width: number, height: number }> = {
    small: { width: 180, height: 240 },
    medium: { width: 240, height: 320 },
    large: { width: 300, height: 400 },
};

const props = withDefaults(defineProps<CardStackProps>(), {
    mode: 'stack',
    activeIndex: 0,
    size: 'medium',
    cardWidth: undefined,
    cardHeight: undefined,
    stackOffset: 80,
    stackRotate: 6,
    stackExtractedOffset: 40,
    stackExtraction: 'toggle',
    peekOffset: 60,
    peekScale: 0.85,
    loop: true,
    autoplay: false,
    autoplayInterval: 3000,
    pauseOnHover: true,
    showNavigationButtons: false,
    showIndicators: false,
    showCarouselGoToFirst: true,
});

const emit = defineEmits<CardStackEmits>();

const activeIndex = useModel(props, 'activeIndex');

const isStackActiveCardExtracted = ref(true);
const hoveredCardLocalIndex = ref<number | null>(null);
const totalItems = computed(() => props.items.length);

const resolvedCardWidth = computed<number | string>(() => {
    if (props.cardWidth !== undefined) {
        return props.cardWidth;
    }
    return CARD_SIZES_MAP[props.size || 'medium'].width;
});

const resolvedCardHeight = computed<number | string>(() => {
    if (props.cardHeight !== undefined) {
        return props.cardHeight;
    }
    return CARD_SIZES_MAP[props.size || 'medium'].height;
});

const getNumericResolvedCardWidth = computed<number>(() => {
    const width = resolvedCardWidth.value;
    if (typeof width === 'string') {
        const num = parseFloat(width);
        return isNaN(num) ? 0 : num;
    }
    return width;
});

const containerClasses = computed(() => [
    bem.b(),
    bem.m(props.mode),
    { [bem.m(`stack-extraction-${props.stackExtraction}`)]: props.mode === 'stack' }
]);

const containerStyles = computed(() => ({
    '--su-card-width': typeof resolvedCardWidth.value === 'number' ? `${resolvedCardWidth.value}px` : resolvedCardWidth.value,
    '--su-card-height': typeof resolvedCardHeight.value === 'number' ? `${resolvedCardHeight.value}px` : resolvedCardHeight.value,
    '--su-card-stack-offset': `${props.stackOffset}px`,
    '--su-card-stack-rotate': `${props.stackRotate}deg`,
    '--su-stack-extracted-offset': `${props.stackExtractedOffset}px`,
    '--su-peek-offset': `${props.peekOffset}%`,
    '--su-peek-scale': props.peekScale,
}));

const trackStyle = computed(() => {
    if (props.mode !== 'carousel' || !totalItems.value) return {};

    const cardWithGap = getNumericResolvedCardWidth.value + 20;
    const offsetToActiveCardLeft = activeIndex.value * cardWithGap;
    const carouselOffset = -(offsetToActiveCardLeft - (getNumericResolvedCardWidth.value / 2));

    return {
        '--carousel-offset': `${carouselOffset}px`
    };
});

const getItemStyle = (index: number) => {
    switch (props.mode) {
        case 'peek':
            const diff = index - activeIndex.value;
            const zIndex = 10 - Math.abs(diff);
            let transform = '';
            let opacity = 1;

            if (diff === 0) {
                transform = 'translateX(0) scale(1)';
                opacity = 1;
            } else {
                const sign = Math.sign(diff);
                transform = `translateX(calc(${sign} * var(--su-peek-offset))) scale(var(--su-peek-scale))`;
                opacity = 0.6;
            }
            return { transform, zIndex, opacity };

        case 'stack':
            let iValue: number;
            if (totalItems.value % 2 === 0) {
                const virtualCenter = totalItems.value / 2 - 0.5;
                iValue = index - virtualCenter;
            } else {
                const centerIndex = Math.floor(totalItems.value / 2);
                iValue = index - centerIndex;
            }

            let transformStack = `translateX(-50%)`;
            transformStack += ` translateX(calc(${iValue} * var(--su-card-stack-offset)))`;
            transformStack += ` rotate(calc(${iValue} * var(--su-card-stack-rotate)))`;


            let zIndexStack: string | number = '1';


            if (index === activeIndex.value) {
                zIndexStack = '200';
                if (props.stackExtraction === 'toggle' && isStackActiveCardExtracted.value) {
                    transformStack += ` translateY(calc(-1 * var(--su-stack-extracted-offset)))`;
                }
            }

            if (props.mode === 'stack' && props.stackExtraction === 'hover' && index === hoveredCardLocalIndex.value) {
                transformStack += ` translateY(calc(-1 * var(--su-stack-extracted-offset)))`;
                zIndexStack = '300';
            }

            return { transform: transformStack, zIndex: zIndexStack, left: '50%', top: '0' } as Record<string, string | number>;

        default:
            return {};
    }
};

let autoplayTimer: ReturnType<typeof setInterval> | null = null;
let isPaused = ref(false);

const startAutoplay = () => {
    if (props.autoplay && !isPaused.value && totalItems.value > 1) {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            setActive(activeIndex.value + 1);
        }, props.autoplayInterval);
    }
};

const stopAutoplay = () => {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
};

const resetAutoplay = () => {
    stopAutoplay();
    if (props.autoplay && !isPaused.value) {
        startAutoplay();
    }
};

const handleMouseEnter = () => {
    if (props.pauseOnHover && props.autoplay) {
        isPaused.value = true;
        stopAutoplay();
    }
};

const handleMouseLeave = () => {
    if (props.pauseOnHover && props.autoplay) {
        isPaused.value = false;
        startAutoplay();
    }
    if (props.mode === 'stack') {
        hoveredCardLocalIndex.value = null;
    }
};

const handleCardItemMouseEnter = (index: number, item: CardStackItem, event: MouseEvent) => {
    if (props.mode === 'stack') {
        hoveredCardLocalIndex.value = index;
    }
    _handleCardHover(event, item, index, emit);
};

const handleCardItemMouseLeave = (index: number, item: CardStackItem, event: MouseEvent) => {
    if (props.mode === 'stack' && hoveredCardLocalIndex.value === index) {
        hoveredCardLocalIndex.value = null;
    }
};

onMounted(() => {
    resetAutoplay();
});

onBeforeUnmount(() => {
    stopAutoplay();
});

const onCardClick = (item: CardStackItem, index: number, event: MouseEvent) => {
    if (props.mode === 'stack' && index === activeIndex.value && props.stackExtraction === 'toggle') {
        isStackActiveCardExtracted.value = !isStackActiveCardExtracted.value;
    } else if (index !== activeIndex.value && props.mode === 'stack' && props.stackExtraction === 'toggle') {
        // 如果点击了非激活卡片，并且当前模式是 toggle，则新激活的卡片应处于抽出状态
        isStackActiveCardExtracted.value = true;
    }

    setActive(index);
    resetAutoplay();
    handleCardClick(event, item, index, emit);
};

const setActive = (index: number) => {
    if (!totalItems.value) return;

    let newIndex = index;
    if (props.loop) {
        newIndex = (index % totalItems.value + totalItems.value) % totalItems.value;
    } else {
        newIndex = Math.max(0, Math.min(index, totalItems.value - 1));
    }

    if (newIndex !== activeIndex.value) {
        activeIndex.value = newIndex;
    }
};

watch(activeIndex, (newVal, oldVal) => {
    if (props.mode === 'stack' && props.stackExtraction === 'toggle' && newVal !== oldVal) {
        // 当 activeIndex 改变时，新的激活卡片默认处于抽出状态
        isStackActiveCardExtracted.value = true;
    }
    resetAutoplay();
});
watch(totalItems, (newVal) => {
    if (activeIndex.value >= newVal) {
        activeIndex.value = 0;
    }
    resetAutoplay();
});
watch(() => [props.autoplay, props.autoplayInterval, props.loop, props.mode, props.pauseOnHover, props.stackExtraction], resetAutoplay, { deep: true });

const next = () => setActive(activeIndex.value + 1);
const prev = () => setActive(activeIndex.value - 1);

defineExpose<CardStackExpose>({ setActive, next, prev });
</script>

<style scoped>
@import './style.css';
</style>
