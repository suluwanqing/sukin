import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import SuSelection from './Item.vue';
import type { SelectionItem } from './type';


const SuOptionStub = {
    name: 'SuOption',
    props: ['item', 'active'],
    template: `
    <div 
      :class="[
        'su-selection__option', 
        { 'is-active': active },
        { 'is-disabled': item.disabled }
      ]">
      {{ item.label }}
    </div>
  `,
};


const mockItems: SelectionItem[] = [
    { type: 'group', label: 'Fruits' },
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana', disabled: true },
    { type: 'group', label: 'Vegetables' },
    { value: 'carrot', label: 'Carrot' },
];

describe('SuSelection.vue', () => {

    it('should render items and groups correctly from items prop', () => {
       
        const TestHarness = defineComponent({
            components: { SuSelection },
            template: `<SuSelection :items="items" v-model="model" />`,
            setup() {
                const items = ref(mockItems);
                const model = ref('');
                return { items, model };
            }
        });

        const wrapper = mount(TestHarness, {
            global: {
                stubs: { SuOption: SuOptionStub, SuIcon: true }
            }
        });

        const groupLabels = wrapper.findAll('.su-selection__group-label');
        expect(groupLabels).toHaveLength(2);

        const options = wrapper.findAll('.su-selection__option');
        expect(options).toHaveLength(3);
        expect(options[0].text()).toBe('Apple');
    });

    it('should handle single selection in dropdown mode', async () => {
        const TestHarness = defineComponent({
            components: { SuSelection },
            template: `<SuSelection mode="dropdown" :items="items" v-model="model" />`,
            setup() {
                const items = ref(mockItems);
                const model = ref(null);
                return { items, model };
            }
        });

        const wrapper = mount(TestHarness, {
            global: { stubs: { SuOption: SuOptionStub, SuIcon: true } }
        });

        await wrapper.find('.su-selection__trigger').trigger('click');

        await wrapper.findAll('.su-selection__option')[0].trigger('click');

        
        expect(wrapper.vm.model).toBe('apple');
    });

    it('should handle multiple selection in list mode', async () => {
        const TestHarness = defineComponent({
            components: { SuSelection },
            template: `<SuSelection mode="list" multiple :items="items" v-model="model" />`,
            setup() {
                const items = ref(mockItems);
                const model = ref([]);
                return { items, model };
            }
        });

        const wrapper = mount(TestHarness, {
            global: { stubs: { SuOption: SuOptionStub, SuIcon: true } }
        });

        const options = wrapper.findAll('.su-selection__option');

        await options[0].trigger('click'); 
        await options[2].trigger('click'); 

        expect(wrapper.vm.model).toEqual(['apple', 'carrot']);

        await options[0].trigger('click'); 
        expect(wrapper.vm.model).toEqual(['carrot']);
    });

    it('should not select a disabled option', async () => {
        const TestHarness = defineComponent({
            components: { SuSelection },
            template: `<SuSelection multiple :items="items" v-model="model" />`,
            setup() {
                const items = ref(mockItems);
                const model = ref([]);
                return { items, model };
            }
        });

        const wrapper = mount(TestHarness, {
            global: { stubs: { SuOption: SuOptionStub, SuIcon: true } }
        });

        
        await wrapper.findAll('.su-selection__option')[1].trigger('click');
        expect(wrapper.vm.model).toEqual([]);
    });
});