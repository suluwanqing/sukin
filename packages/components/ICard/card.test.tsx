import { mount } from '@vue/test-utils';
import { defineComponent, ref, watch } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { nextTick } from 'vue';
import CardStack from './Icard.vue';
import { UPDATE_MODEL_EVENT, CLICK_EVENT, HOVER_EVENT } from './constant';

const mockCardData = [
    { id: 1, title: 'Card 1' },
    { id: 2, title: 'Card 2' },
    { id: 3, title: 'Card 3' },
    { id: 4, title: 'Card 4' },
    { id: 5, title: 'Card 5' },
];

describe('CardStack.vue', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });
    const WrapperComponent = defineComponent({
        components: { CardStack },
        props: {
            mode: String,
            items: Array,
            autoplay: Boolean,
            autoplayInterval: Number,
            pauseOnHover: Boolean,
            showIndicators: Boolean,
            showCarouselGoToFirst: Boolean,
            activeIndex: {
                type: Number,
                default: 0,
            },
        },
        template: `
            <CardStack
                :mode="mode"
                :items="items"
                v-model:activeIndex="localActiveIndex"
                :autoplay="autoplay"
                :autoplayInterval="autoplayInterval"
                :pauseOnHover="pauseOnHover"
                :showIndicators="showIndicators"
                :showCarouselGoToFirst="showCarouselGoToFirst"
            >
                <template #default="{ item, index }">
                    <div class="test-card-content">
                        Card: {{ item.title }} - Index: {{ index }}
                    </div>
                </template>
            </CardStack>
        `,
        setup(props, { emit }) {
            const localActiveIndex = ref(props.activeIndex);

            watch(() => props.activeIndex, (newVal) => {
                localActiveIndex.value = newVal;
            });

            watch(localActiveIndex, (newVal) => {
                emit(UPDATE_MODEL_EVENT, newVal);
            });

            return { localActiveIndex };
        }
    });

    it('renders correctly with default props', () => {
        const wrapper = mount(CardStack, {
            props: { items: mockCardData },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.findAll('.su-card-stack__item').length).toBe(mockCardData.length);
        expect(wrapper.classes()).toContain('su-card-stack--stack');
    });

    it('updates activeIndex via v-model when a card is clicked', async () => {
        const wrapper = mount(WrapperComponent, {
            props: {
                mode: 'carousel',
                items: mockCardData,
                activeIndex: 0,
            },
        });

        expect(wrapper.vm.localActiveIndex).toBe(0);

        await wrapper.findAll('.su-card-stack__item')[2].trigger('click');
        await nextTick();

        expect(wrapper.emitted(UPDATE_MODEL_EVENT)?.[0][0]).toBe(2);
        expect(wrapper.vm.localActiveIndex).toBe(2);

        await wrapper.findAll('.su-card-stack__item')[0].trigger('click');
        await nextTick();
        expect(wrapper.emitted(UPDATE_MODEL_EVENT)?.[1][0]).toBe(0);
        expect(wrapper.vm.localActiveIndex).toBe(0);
    });

    it('emits click and hover events with correct payload', async () => {
        const wrapper = mount(CardStack, {
            props: { items: mockCardData },
        });

        const firstCard = wrapper.findAll('.su-card-stack__item')[0];
        await firstCard.trigger('click');
        expect(wrapper.emitted(CLICK_EVENT)).toBeTruthy();
        expect(wrapper.emitted(CLICK_EVENT)?.[0][1]).toEqual(mockCardData[0]);
        expect(wrapper.emitted(CLICK_EVENT)?.[0][2]).toBe(0);

        await firstCard.trigger('mouseenter');
        expect(wrapper.emitted(HOVER_EVENT)).toBeTruthy();
        expect(wrapper.emitted(HOVER_EVENT)?.[0][1]).toEqual(mockCardData[0]);
        expect(wrapper.emitted(HOVER_EVENT)?.[0][2]).toBe(0);
    });

    it('applies correct classes for different modes', () => {
        const stackWrapper = mount(CardStack, { props: { items: mockCardData, mode: 'stack' } });
        expect(stackWrapper.classes()).toContain('su-card-stack--stack');

        const carouselWrapper = mount(CardStack, { props: { items: mockCardData, mode: 'carousel' } });
        expect(carouselWrapper.classes()).toContain('su-card-stack--carousel');

        const peekWrapper = mount(CardStack, { props: { items: mockCardData, mode: 'peek' } });
        expect(peekWrapper.classes()).toContain('su-card-stack--peek');
    });

    describe('Stack Mode', () => {
        it('applies extracted transform to active card', async () => {
            const wrapper = mount(WrapperComponent, {
                props: {
                    mode: 'stack',
                    items: mockCardData,
                    activeIndex: 0,
                    stackExtractedOffset: 50,
                    stackOffset: 100,
                    stackRotate: 5
                },
            });

            const initialActiveCard = wrapper.findAll('.su-card-stack__item')[0];
            expect(initialActiveCard.classes()).toContain('is-active');

            await wrapper.setProps({ activeIndex: 1 });
            await nextTick();

            const newActiveCard = wrapper.findAll('.su-card-stack__item')[1];
            expect(newActiveCard.classes()).toContain('is-active');
            expect(initialActiveCard.classes()).not.toContain('is-active');
        });
    });

    describe('Carousel Mode', () => {
        it('autoplay advances localActiveIndex at specified interval', async () => {
            const wrapper = mount(WrapperComponent, {
                props: {
                    mode: 'carousel',
                    items: mockCardData,
                    autoplay: true,
                    autoplayInterval: 1000,
                    loop: true,
                    activeIndex: 0,
                },
            });

            expect(wrapper.vm.localActiveIndex).toBe(0);

            vi.advanceTimersByTime(1000);
            await nextTick();
            expect(wrapper.vm.localActiveIndex).toBe(1);

            vi.advanceTimersByTime(1000);
            await nextTick();
            expect(wrapper.vm.localActiveIndex).toBe(2);
        });

        it('autoplay pauses on mouseenter and resumes on mouseleave', async () => {
            const wrapper = mount(WrapperComponent, {
                props: {
                    mode: 'carousel',
                    items: mockCardData,
                    autoplay: true,
                    autoplayInterval: 1000,
                    pauseOnHover: true,
                    loop: true,
                    activeIndex: 0,
                },
            });

            expect(wrapper.vm.localActiveIndex).toBe(0);

            await wrapper.trigger('mouseenter');
            vi.advanceTimersByTime(1000);
            await nextTick();
            expect(wrapper.vm.localActiveIndex).toBe(0);

            await wrapper.trigger('mouseleave');
            vi.advanceTimersByTime(1000);
            await nextTick();
            expect(wrapper.vm.localActiveIndex).toBe(1);
        });

        it('"Go to First" button appears at the last card (non-loop) and resets to first', async () => {
            const wrapper = mount(WrapperComponent, {
                props: {
                    mode: 'carousel',
                    items: mockCardData,
                    loop: false,
                    showCarouselGoToFirst: true,
                    activeIndex: 0,
                },
            });

            expect(wrapper.find('.su-card-stack__go-to-first').exists()).toBe(false);

            wrapper.vm.localActiveIndex = mockCardData.length - 1;
            await nextTick();

            expect(wrapper.find('.su-card-stack__go-to-first').exists()).toBe(true);

            await wrapper.find('.su-card-stack__go-to-first').trigger('click');
            await nextTick();
            expect(wrapper.vm.localActiveIndex).toBe(0);
        });
    });

    describe('Peek Mode', () => {
        it('indicators are shown and change active card on click', async () => {
            const wrapper = mount(WrapperComponent, {
                props: {
                    mode: 'peek',
                    items: mockCardData,
                    showIndicators: true,
                    activeIndex: 0,
                },
            });

            expect(wrapper.find('.su-card-stack__indicators').exists()).toBe(true);
            const indicators = wrapper.findAll('.su-card-stack__indicator');
            expect(indicators.length).toBe(mockCardData.length);

            expect(indicators[0].classes()).toContain('is-active');
            expect(indicators[1].classes()).not.toContain('is-active');

            await indicators[2].trigger('click');
            await nextTick();

            expect(wrapper.emitted(UPDATE_MODEL_EVENT)?.[0][0]).toBe(2);
            expect(wrapper.vm.localActiveIndex).toBe(2);
            expect(indicators[0].classes()).not.toContain('is-active');
            expect(indicators[2].classes()).toContain('is-active');
        });
    });

    it('handles empty items array gracefully', () => {
        const wrapper = mount(CardStack, {
            props: { items: [] },
        });

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.findAll('.su-card-stack__item').length).toBe(0);
    });

    it('exposed methods (setActive, next, prev) work correctly', async () => {
        const wrapper = mount(CardStack, {
            props: { items: mockCardData, mode: 'carousel', loop: true, activeIndex: 0 },
        });

        (wrapper.vm as any).next();
        await nextTick();
        expect(wrapper.vm.activeIndex).toBe(1);

        (wrapper.vm as any).prev();
        await nextTick();
        expect(wrapper.vm.activeIndex).toBe(0);

        (wrapper.vm as any).setActive(3);
        await nextTick();
        expect(wrapper.vm.activeIndex).toBe(3);

        (wrapper.vm as any).setActive(mockCardData.length);
        await nextTick();
        expect(wrapper.vm.activeIndex).toBe(0);

        (wrapper.vm as any).setActive(-1);
        await nextTick();
        expect(wrapper.vm.activeIndex).toBe(mockCardData.length - 1);
    });
});