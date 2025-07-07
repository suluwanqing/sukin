<template>
    <div :class="containerClasses" :style="containerStyles" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <div :class="bem.e('track')" :style="trackStyle">
            <div v-for="(item, index) in props.items" :key="item.id || index"
                :class="[bem.e('item'), { [bem.is('active', index === activeIndex)]: true }]"
                :style="getItemStyle(index)" @click="onCardClick(item, index, $event)"
                @mouseenter="handleCardItemMouseEnter(index, item, $event)"
                @mouseleave="handleCardItemMouseLeave()">
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
    stackExtraction: 'click',
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
const totalItems = computed(() => props.items.length);

const extractedIndex = ref<number | null>(null);
const hoveredCardLocalIndex = ref<number | null>(null);

const resolvedCardWidth = computed<number | string>(() => {
    if (props.cardWidth !== undefined) return props.cardWidth;
    return CARD_SIZES_MAP[props.size || 'medium'].width;
});

const resolvedCardHeight = computed<number | string>(() => {
    if (props.cardHeight !== undefined) return props.cardHeight;
    return CARD_SIZES_MAP[props.size || 'medium'].height;
});

const getNumericResolvedCardWidth = computed<number>(() => {
    const width = resolvedCardWidth.value;
    return typeof width === 'number' ? width : parseFloat(width) || 0;
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
    return { '--carousel-offset': `${carouselOffset}px` };
});

const getItemStyle = (index: number) => {
    switch (props.mode) {
        case 'peek':
            const diff = index - activeIndex.value;
            let transform = '';
            if (diff === 0) {
                transform = 'translateX(0) scale(1)';
            } else {
                const sign = Math.sign(diff);
                transform = `translateX(calc(${sign} * var(--su-peek-offset))) scale(var(--su-peek-scale))`;
            }
            return { transform, zIndex: 10 - Math.abs(diff), opacity: diff === 0 ? 1 : 0.6 };

        case 'stack':
            const virtualCenter = totalItems.value / 2 - 0.5;
            const iValue = index - virtualCenter;
            let transformStack = `translateX(-50%) translateX(calc(${iValue} * var(--su-card-stack-offset))) rotate(calc(${iValue} * var(--su-card-stack-rotate)))`;
            let zIndexStack: string | number = 0;
            let isExtracted = false;

            if (props.stackExtraction === 'click' && index === extractedIndex.value) {
                isExtracted = true;
                zIndexStack = '200';
            }
            if (props.stackExtraction === 'hover' && index === hoveredCardLocalIndex.value) {
                isExtracted = true;
                zIndexStack = '300';
            }
            if (props.stackExtraction === 'none' && index === activeIndex.value) {
                zIndexStack = '200';
            }

            if (isExtracted) {
                transformStack += ` translateY(calc(-1 * var(--su-stack-extracted-offset)))`;
            }

            return { transform: transformStack, zIndex: zIndexStack, left: '50%', top: '0' };

        default:
            return {};
    }
};

let autoplayTimer: ReturnType<typeof setInterval> | null = null;
let isPaused = ref(false);

const startAutoplay = () => {
    if (props.autoplay && !isPaused.value && totalItems.value > 1) {
        stopAutoplay();
        autoplayTimer = setInterval(() => setActive(activeIndex.value + 1), props.autoplayInterval);
    }
};

const stopAutoplay = () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
};

const resetAutoplay = () => {
    stopAutoplay();
    if (props.autoplay && !isPaused.value) startAutoplay();
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
    hoveredCardLocalIndex.value = null;
};

const handleCardItemMouseEnter = (index: number, item: CardStackItem, event: MouseEvent) => {
    if (props.mode === 'stack') hoveredCardLocalIndex.value = index;
    _handleCardHover(event, item, index, emit);
};

const handleCardItemMouseLeave = () => {
    hoveredCardLocalIndex.value = null;
};

const onCardClick = (item: CardStackItem, index: number, event: MouseEvent) => {
    if (props.mode === 'stack' && props.stackExtraction === 'click') {
        if (extractedIndex.value === index) {
            extractedIndex.value = null;
        } else {
            extractedIndex.value = index;
        }
    }

    setActive(index);
    resetAutoplay();
    handleCardClick(event, item, index, emit);
};

const setActive = (index: number) => {
    if (!totalItems.value) return;
    let newIndex = props.loop
        ? (index % totalItems.value + totalItems.value) % totalItems.value
        : Math.max(0, Math.min(index, totalItems.value - 1));

    if (newIndex !== activeIndex.value) {
        activeIndex.value = newIndex;
    }
};

onMounted(resetAutoplay);
onBeforeUnmount(stopAutoplay);

watch(activeIndex, resetAutoplay);

watch(totalItems, (newVal) => {
    if (activeIndex.value >= newVal && newVal > 0) activeIndex.value = 0;
    else if (newVal === 0) activeIndex.value = 0;

    if (extractedIndex.value !== null && extractedIndex.value >= newVal) {
        extractedIndex.value = null;
    }
    resetAutoplay();
});

watch(() => [props.autoplay, props.autoplayInterval, props.loop, props.mode, props.pauseOnHover, props.stackExtraction], resetAutoplay, { deep: true });

defineExpose<CardStackExpose>({
    setActive,
    next: () => setActive(activeIndex.value + 1),
    prev: () => setActive(activeIndex.value - 1),
});
</script>

<style scoped>
@import './style.css';
</style>