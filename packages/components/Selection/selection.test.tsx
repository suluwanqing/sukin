import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ref, computed, defineComponent, nextTick } from 'vue';
import SuSelection from './Selection.vue'; 


const regionsData = [
    {
        value: 'gd', label: '广东省', children: [
            {
                value: 'gz', label: '广州市', children: [
                    { value: 'th', label: '天河区' },
                    { value: 'hy', label: '海珠区' },
                ]
            },
            {
                value: 'sz', label: '深圳市', children: [
                    { value: 'ft', label: '福田区' },
                    { value: 'lh', label: '罗湖区' },
                ]
            },
        ]
    },
    {
        value: 'zj', label: '浙江省', children: [
            {
                value: 'hz', label: '杭州市', children: [
                    { value: 'xh', label: '西湖区' },
                    { value: 'xd', label: '萧山区' },
                ]
            },
            {
                value: 'nb', label: '宁波市', children: [
                    { value: 'jy', label: '江北区' },
                    { value: 'yh', label: '鄞州区' },
                ]
            },
        ]
    },
];

// 定义一个测试组件，用于模拟 App.vue 中的联动逻辑
const TestLinkedSelectors = defineComponent({
    components: { SuSelection },
    setup() {
        const selectedProvince = ref(null);
        const selectedCity = ref(null);
        const selectedDistrict = ref(null);

        const provinceOptions = computed(() => {
            return regionsData.map(p => ({ label: p.label, value: p.value }));
        });

        const cityOptions = computed(() => {
            if (!selectedProvince.value) {
                return [];
            }
            const province = regionsData.find(p => p.value === selectedProvince.value);
            return province ? province.children.map(c => ({ label: c.label, value: c.value })) : [];
        });

        const districtOptions = computed(() => {
            if (!selectedCity.value) {
                return [];
            }
            const province = regionsData.find(p => p.value === selectedProvince.value);
            if (!province) {
                return [];
            }
            const city = province.children.find(c => c.value === selectedCity.value);
            return city ? city.children.map(d => ({ label: d.label, value: d.value })) : [];
        });

        const handleProvinceChange = (value) => {
            selectedProvince.value = value;
            selectedCity.value = null; // 省份变化，清空城市和区县
            selectedDistrict.value = null;
        };

        const handleCityChange = (value) => {
            selectedCity.value = value;
            selectedDistrict.value = null; // 城市变化，清空区县
        };

        return {
            selectedProvince,
            selectedCity,
            selectedDistrict,
            provinceOptions,
            cityOptions,
            districtOptions,
            handleProvinceChange,
            handleCityChange,
        };
    },
    template: `
    <div class="linked-selectors-container">
      <SuSelection
        :modelValue="selectedProvince"
        @update:modelValue="handleProvinceChange"
        :items="provinceOptions"
        placeholder="请选择省份"
        mode="dropdown"
      />
      <SuSelection
        :modelValue="selectedCity"
        @update:modelValue="handleCityChange"
        :items="cityOptions"
        placeholder="请选择城市"
        mode="dropdown"
        :disabled="!selectedProvince"
      />
      <SuSelection
        :modelValue="selectedDistrict"
        @update:modelValue="selectedDistrict = $event"
        :items="districtOptions"
        placeholder="请选择区县"
        mode="dropdown"
        :disabled="!selectedCity"
      />
    </div>
  `,
});

describe('Linked SuSelection Components (JS Template)', () => {
    let wrapper; 

    beforeEach(() => {
        document.body.innerHTML = ''; // 清理 DOM
        wrapper = mount(TestLinkedSelectors);
    });

    // 辅助函数：获取所有 SuSelection 组件的实例
    const getSelectionInstances = () => wrapper.findAllComponents(SuSelection);

    // 辅助函数：打开指定选择器的下拉面板
    const openDropdown = async (selectionWrapper) => {
        const trigger = selectionWrapper.find('.su-selection__trigger');
        if (trigger.exists()) {
            await trigger.trigger('click');
            await nextTick();
        }
    };

    // 辅助函数：选择指定选择器中的一个选项
    const selectOption = async (selectionWrapper, label) => {
        await openDropdown(selectionWrapper);
        const option = selectionWrapper.findAll('.su-selection__option').find(o => o.text() === label);
        expect(option?.exists()).toBe(true);
        await option?.trigger('click');
        await nextTick();
    };

    it('initializes with all but province selector disabled', () => {
        const selections = getSelectionInstances();
        const provinceSelector = selections[0];
        const citySelector = selections[1];
        const districtSelector = selections[2];

        expect(provinceSelector.props('modelValue')).toBeNull();
        expect(citySelector.props('modelValue')).toBeNull();
        expect(districtSelector.props('modelValue')).toBeNull();

        expect(provinceSelector.props('disabled')).toBe(false);
        expect(citySelector.props('disabled')).toBe(true);
        expect(districtSelector.props('disabled')).toBe(true);

        expect(provinceSelector.find('.su-selection__trigger-text').text()).toBe('请选择省份');
        expect(citySelector.find('.su-selection__trigger-text').text()).toBe('请选择城市');
        expect(districtSelector.find('.su-selection__trigger-text').text()).toBe('请选择区县');
    });

    it('selects a province and enables city selector', async () => {
        const selections = getSelectionInstances();
        const provinceSelector = selections[0];
        const citySelector = selections[1];
        const districtSelector = selections[2];

        await selectOption(provinceSelector, '广东省');

        expect(wrapper.vm.selectedProvince).toBe('gd'); // 验证 vm 状态更新
        expect(provinceSelector.props('modelValue')).toBe('gd');
        expect(provinceSelector.find('.su-selection__trigger-text').text()).toBe('广东省');

        expect(citySelector.props('disabled')).toBe(false); // 城市选择器应已启用
        expect(citySelector.find('.su-selection__trigger-text').text()).toBe('请选择城市'); // 城市值应已清空

        // 验证城市选项是否正确加载
        await openDropdown(citySelector);
        const cityOptions = citySelector.findAll('.su-selection__option');
        expect(cityOptions.length).toBe(2); // 广州市，深圳市
        expect(cityOptions[0].text()).toBe('广州市');
        expect(cityOptions[1].text()).toBe('深圳市');
    });

    it('selects a city and enables district selector', async () => {
        const selections = getSelectionInstances();
        const provinceSelector = selections[0];
        const citySelector = selections[1];
        const districtSelector = selections[2];

        await selectOption(provinceSelector, '广东省');
        await selectOption(citySelector, '广州市');

        expect(wrapper.vm.selectedCity).toBe('gz');
        expect(citySelector.props('modelValue')).toBe('gz');
        expect(citySelector.find('.su-selection__trigger-text').text()).toBe('广州市');

        expect(districtSelector.props('disabled')).toBe(false); // 区县选择器应已启用
        expect(districtSelector.find('.su-selection__trigger-text').text()).toBe('请选择区县'); // 区县值应已清空

        // 验证区县选项是否正确加载
        await openDropdown(districtSelector);
        const districtOptions = districtSelector.findAll('.su-selection__option');
        expect(districtOptions.length).toBe(2); // 天河区，海珠区
        expect(districtOptions[0].text()).toBe('天河区');
        expect(districtOptions[1].text()).toBe('海珠区');
    });

    it('selects a district', async () => {
        const selections = getSelectionInstances();
        const provinceSelector = selections[0];
        const citySelector = selections[1];
        const districtSelector = selections[2];

        await selectOption(provinceSelector, '广东省');
        await selectOption(citySelector, '广州市');
        await selectOption(districtSelector, '天河区');

        expect(wrapper.vm.selectedDistrict).toBe('th');
        expect(districtSelector.props('modelValue')).toBe('th');
        expect(districtSelector.find('.su-selection__trigger-text').text()).toBe('天河区');
    });

    it('resets city and district when province changes', async () => {
        const selections = getSelectionInstances();
        const provinceSelector = selections[0];
        const citySelector = selections[1];
        const districtSelector = selections[2];

        // 预先选择一个完整的路径
        await selectOption(provinceSelector, '广东省');
        await selectOption(citySelector, '广州市');
        await selectOption(districtSelector, '天河区');

        // 更改省份
        await selectOption(provinceSelector, '浙江省');

        expect(wrapper.vm.selectedProvince).toBe('zj');
        expect(wrapper.vm.selectedCity).toBeNull(); // 城市应重置
        expect(wrapper.vm.selectedDistrict).toBeNull(); // 区县应重置

        expect(citySelector.props('modelValue')).toBeNull();
        expect(districtSelector.props('modelValue')).toBeNull();

        // 验证城市选项是否已更新为浙江省的城市
        await openDropdown(citySelector);
        const cityOptions = citySelector.findAll('.su-selection__option');
        expect(cityOptions.length).toBe(2); // 杭州市，宁波市
        expect(cityOptions[0].text()).toBe('杭州市');
        expect(cityOptions[1].text()).toBe('宁波市');
    });

    it('resets district when city changes', async () => {
        const selections = getSelectionInstances();
        const provinceSelector = selections[0];
        const citySelector = selections[1];
        const districtSelector = selections[2];

        // 预先选择一个完整的路径
        await selectOption(provinceSelector, '广东省');
        await selectOption(citySelector, '广州市');
        await selectOption(districtSelector, '天河区');

        // 更改城市
        await selectOption(citySelector, '深圳市');

        expect(wrapper.vm.selectedCity).toBe('sz');
        expect(wrapper.vm.selectedDistrict).toBeNull(); // 区县应重置

        expect(districtSelector.props('modelValue')).toBeNull();

        // 验证区县选项是否已更新为深圳市的区县
        await openDropdown(districtSelector);
        const districtOptions = districtSelector.findAll('.su-selection__option');
        expect(districtOptions.length).toBe(2); // 福田区，罗湖区
        expect(districtOptions[0].text()).toBe('福田区');
        expect(districtOptions[1].text()).toBe('罗湖区');
    });
});