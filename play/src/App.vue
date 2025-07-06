<template>
    <div id="app">
        <h1>SuSelection 组件示例</h1>

        <div class="section">
            <h2>1. 单选模式 (Dropdown, 默认值, 清除功能)</h2>
            <p>当前值: `{{ singleValue || '无' }}`</p>
            <SuSelection v-model="singleValue" :items="basicOptions" placeholder="请选择一个城市" clearable mode="dropdown"
                @change="logChange('单选', $event)" />
            <button @click="singleValue = 'beijing'">设为北京</button>
            <button @click="singleValue = 'shanghai'">设为上海</button>
            <button @click="singleValue = null">清空</button>
        </div>

        <div class="section">
            <h2>2. 多选模式 (Dropdown, 默认值, 清除功能)</h2>
            <p>当前值: `{{ multipleValues.join(', ') || '无' }}`</p>
            <SuSelection v-model="multipleValues" :items="basicOptions" multiple placeholder="请选择多个城市" clearable
                mode="dropdown" @change="logChange('多选', $event)" />
            <button @click="multipleValues = ['beijing', 'shanghai']">设为北京和上海</button>
            <button @click="multipleValues = []">清空</button>
        </div>

        <div class="section">
            <h2>3. 禁用模式 (Dropdown)</h2>
            <p>单选 (禁用):</p>
            <SuSelection v-model="singleValue" :items="basicOptions" disabled placeholder="此组件已禁用" mode="dropdown" />
            <p>多选 (禁用):</p>
            <SuSelection v-model="multipleValues" :items="basicOptions" multiple disabled placeholder="此组件已禁用"
                mode="dropdown" />
        </div>

        <div class="section">
            <h2>4. 不同尺寸 (Dropdown)</h2>
            <p>Small:</p>
            <SuSelection v-model="singleValueSize" :items="basicOptions" size="small" placeholder="小尺寸"
                mode="dropdown" />
            <p>Default:</p>
            <SuSelection v-model="singleValueSize" :items="basicOptions" size="default" placeholder="默认尺寸"
                mode="dropdown" />
            <p>Large:</p>
            <SuSelection v-model="singleValueSize" :items="basicOptions" size="large" placeholder="大尺寸"
                mode="dropdown" />
        </div>

        <div class="section">
            <h2>5. 不同形状 (Dropdown)</h2>
            <p>Round (默认):</p>
            <SuSelection v-model="singleValueShape" :items="basicOptions" shape="round" placeholder="圆形"
                mode="dropdown" />
            <p>Square:</p>
            <SuSelection v-model="singleValueShape" :items="basicOptions" shape="square" placeholder="方形"
                mode="dropdown" />
        </div>

        <div class="section">
            <h2>6. Box 模式 (类似按钮组/标签选择器)</h2>
            <p>当前值: `{{ boxValues.join(', ') || '无' }}`</p>
            <SuSelection v-model="boxValues" :items="basicOptions" multiple mode="box" />
            <button @click="boxValues = ['beijing', 'hangzhou']">设为北京和杭州</button>
            <button @click="boxValues = []">清空</button>
        </div>

        <div class="section">
            <h2>7. 包含禁用选项和分组 (Dropdown 模式)</h2>
            <p>当前值: `{{ groupedValues.join(', ') || '无' }}`</p>
            <SuSelection v-model="groupedValues" :items="groupedOptions" multiple clearable placeholder="请选择 (含分组)"
                mode="dropdown" @change="logChange('分组多选', $event)" />
            <button @click="groupedValues = ['shanghai', 'chengdu']">设为上海和成都</button>
            <button @click="groupedValues = []">清空</button>
        </div>

        <div class="section">
            <h2>8. 默认无选中 (Dropdown)</h2>
            <p>当前值: `{{ noDefaultValue || '无' }}`</p>
            <SuSelection v-model="noDefaultValue" :items="basicOptions" placeholder="默认无选中" mode="dropdown" />
        </div>

        <div class="section">
            <h2>9. 联动选择器 (省市县三级联动)</h2>
            <p>已选: {{ selectedProvinceLabel || '无' }} > {{ selectedCityLabel || '无' }} > {{ selectedDistrictLabel || '无'
                }}</p>
            <div class="linked-selectors">
                <SuSelection :modelValue="selectedProvince" @update:modelValue="handleProvinceChange"
                    :items="provinceOptions" placeholder="请选择省份" mode="dropdown" />
                <SuSelection :modelValue="selectedCity" @update:modelValue="handleCityChange" :items="cityOptions"
                    placeholder="请选择城市" mode="dropdown" :disabled="!selectedProvince" />
                <SuSelection :modelValue="selectedDistrict" @update:modelValue="selectedDistrict = $event"
                    :items="districtOptions" placeholder="请选择区县" mode="dropdown" :disabled="!selectedCity" />
            </div>
            <button @click="resetLinkedSelectors">重置联动选择</button>
        </div>

        <div class="section">
            <button @click="resetAll">重置所有示例</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SuSelection } from 'sukin'; // <<< 关键：只导入 SuSelection

// --- 示例数据 ---
const basicOptions = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen', disabled: true }, // 禁用项
    { label: '杭州', value: 'hangzhou' },
];

const groupedOptions = [
    {
        label: '直辖市',
        options: [
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '天津', value: 'tianjin', disabled: true },
            { label: '重庆', value: 'chongqing' },
        ]
    },
    {
        label: '省会城市',
        options: [
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
            { label: '杭州', value: 'hangzhou' },
            { label: '成都', value: 'chengdu' },
        ]
    },
    { label: '其他城市', value: 'other' },
];

// --- 联动选择器数据 ---
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


// --- 响应式数据 ---
const singleValue = ref('shanghai');
const multipleValues = ref(['beijing', 'guangzhou']);
const singleValueSize = ref(null);
const singleValueShape = ref(null);
const boxValues = ref(['hangzhou']);
const groupedValues = ref(['chongqing', 'chengdu']);
const noDefaultValue = ref(null);

// 联动选择器的数据
const selectedProvince = ref(null);
const selectedCity = ref(null);
const selectedDistrict = ref(null);


// --- 联动选择器 computed 属性 ---
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

// 显示联动选择器的选中文本
const selectedProvinceLabel = computed(() => provinceOptions.value.find(p => p.value === selectedProvince.value)?.label);
const selectedCityLabel = computed(() => cityOptions.value.find(c => c.value === selectedCity.value)?.label);
const selectedDistrictLabel = computed(() => districtOptions.value.find(d => d.value === selectedDistrict.value)?.label);


// --- 方法 ---
const logChange = (type, value) => {
    console.log(`${type} change 事件触发，新值:`, value);
};

// 联动选择器的处理函数
const handleProvinceChange = (value) => {
    selectedProvince.value = value;
    selectedCity.value = null; // 省份变化，清空城市和区县
    selectedDistrict.value = null;
};

const handleCityChange = (value) => {
    selectedCity.value = value;
    selectedDistrict.value = null; // 城市变化，清空区县
};

const resetLinkedSelectors = () => {
    selectedProvince.value = null;
    selectedCity.value = null;
    selectedDistrict.value = null;
    console.log('联动选择器已重置！');
};

const resetAll = () => {
    singleValue.value = 'shanghai';
    multipleValues.value = ['beijing', 'guangzhou'];
    singleValueSize.value = null;
    singleValueShape.value = null;
    boxValues.value = ['hangzhou'];
    groupedValues.value = ['chongqing', 'chengdu'];
    noDefaultValue.value = null;
    resetLinkedSelectors(); // 重置联动选择器
    console.log('所有示例已重置！');
};
</script>

<style>
/* App.vue 的基本样式 */
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.section {
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.section h2 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 10px;
}

.section p {
    margin-bottom: 10px;
    font-size: 14px;
    color: #666;
}

.su-selection {
    margin-bottom: 15px;
    margin-right: 10px;
}

.linked-selectors {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    /* 允许在小屏幕上换行 */
}

button {
    padding: 8px 15px;
    margin-right: 10px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #66b1ff;
}

button:active {
    background-color: #3a8ee6;
}
</style>