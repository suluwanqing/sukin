import type { OptionDataItem, SelectionItem, CascaderOption } from 'sukin';

export const basicOptionsData: OptionDataItem[] = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen', disabled: true },
    { label: '杭州', value: 'hangzhou' },
];

export const groupedOptionsData: SelectionItem[] = [
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
];

export const cascaderRegionsData: CascaderOption[] = [
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
    {
        value: 'js', label: '江苏省', children: [
            {
                value: 'nj', label: '南京市', children: [
                    { value: 'qh', label: '秦淮区' },
                    { value: 'jl', label: '建邺区' },
                ]
            },
            {
                value: 'sz', label: '苏州市', children: [
                    { value: 'gc', label: '姑苏区' },
                    { value: 'ws', label: '吴中区' },
                ]
            },
        ]
    },
];