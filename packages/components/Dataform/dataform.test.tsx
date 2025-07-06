import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, config } from '@vue/test-utils';
import { nextTick } from 'vue';
import DataForm from './Dataform.vue';
import type { FormSection } from './type';

// 模拟 SuAlert 子组件
const AlertStub = {
    props: ['title', 'closable'],
    template: '<div class="alert-stub">{{ title }}</div>',
};

// 在每次测试前应用 stub
beforeEach(() => {
    config.global.stubs = {
        SuAlert: AlertStub,
    };
    vi.useFakeTimers();
});

// 每次测试后恢复
afterEach(() => {
    vi.useRealTimers();
    config.global.stubs = {};
});

// 用于测试的模拟数据
const mockSections: FormSection[] = [
    {
        title: 'Login',
        step: false,
        fields: [
            { id: 'username', label: 'Username', type: 'text', required: true },
            { id: 'password', label: 'Password', type: 'password', required: true, rules: [{ name: 'minLength', length: 6 }] },
        ],
    },
    {
        title: 'Register',
        step: true,
        step_model: { All_Steps: 3 },
        steps: [
            {
                step: 1,
                fields: [{ id: 'email', label: 'Email', type: 'email', required: true, rules: ['email'] }],
            },
            {
                step: 2,
                fields: [{ id: 'code', label: 'Code', type: 'text', required: true }],
                func: async (data) => {
                    if (data.code === '123456') return true;
                    return 'Verification code is incorrect.';
                },
            },
            {
                step: 3,
                fields: [{ id: 'nickname', label: 'Nickname', type: 'text', required: true }],
            },
        ],
    },
];

describe('DataForm.vue', () => {
    it('should render correctly and switch forms', async () => {
        const wrapper = mount(DataForm, {
            props: { sections: mockSections, initialForm: 'Login' },
        });

        expect(wrapper.find('h2').text()).toBe('Login');
        const registerButton = wrapper.findAll('.su-form-panel__button--nav')[1];
        await registerButton.trigger('click');
        expect(wrapper.find('h2').text()).toBe('Register');
    });

    it('should show field error on blur when invalid', async () => {
        const wrapper = mount(DataForm, {
            props: { sections: mockSections, initialForm: 'Login' },
        });
        const usernameInput = wrapper.find<HTMLInputElement>('#username');

        await usernameInput.setValue('');
        await usernameInput.trigger('blur');
        expect(wrapper.find('.su-form-panel__error').text()).toBe('此字段为必填项');
        // [FIXED] 使用 findComponent 来检查组件是否存在
        expect(wrapper.findComponent(AlertStub).exists()).toBe(false);
    });

    it('should show general alert on submit failure and hide it after timeout', async () => {
        const wrapper = mount(DataForm, {
            props: { sections: mockSections, initialForm: 'Login' },
        });

        await wrapper.find('.su-form-panel__button--primary').trigger('click');


        const alertWrapper = wrapper.findComponent(AlertStub);
        expect(alertWrapper.exists()).toBe(true);
        expect(alertWrapper.props('title')).toBe('字段 "Username": 此字段为必填项');
        expect(wrapper.emitted('submit')).toBeUndefined();

        await vi.runAllTimersAsync();
        expect(wrapper.findComponent(AlertStub).exists()).toBe(false);
    });

    it('should emit submit event with data on successful submission', async () => {
        const wrapper = mount(DataForm, {
            props: { sections: mockSections, initialForm: 'Login' },
        });

        await wrapper.find('#username').setValue('testuser');
        await wrapper.find('#password').setValue('password123');
        await wrapper.find('.su-form-panel__button--primary').trigger('click');

        expect(wrapper.emitted('submit')).toHaveLength(1);
        expect(wrapper.emitted('submit')![0]).toEqual([
            'Login',
            { username: 'testuser', password: 'password123' },
        ]);
        expect(wrapper.findComponent(AlertStub).exists()).toBe(false);
    });

    it('should navigate through steps correctly', async () => {
        const wrapper = mount(DataForm, {
            props: { sections: mockSections, initialForm: 'Register' },
        });

        expect(wrapper.find('#email').exists()).toBe(true);
        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('.su-form-panel__button--primary').trigger('click');
        expect(wrapper.find('#code').exists()).toBe(true);

        await wrapper.find('.su-form-panel__button--secondary').trigger('click');
        expect(wrapper.find('#email').exists()).toBe(true);
    });

    it('should handle async step validation (func)', async () => {
        const wrapper = mount(DataForm, {
            props: { sections: mockSections, initialForm: 'Register' },
        });

        await wrapper.find('#email').setValue('test@example.com');
        await wrapper.find('.su-form-panel__button--primary').trigger('click');

        const nextButton = wrapper.find('.su-form-panel__button--primary');
        const codeInput = wrapper.find('#code');

        // 测试异步验证失败
        await codeInput.setValue('wrong-code');
        await nextButton.trigger('click');
        await nextTick();

        // [FIXED] 使用 findComponent 获取组件包装器，然后检查 props
        const alertWrapper = wrapper.findComponent(AlertStub);
        expect(alertWrapper.exists()).toBe(true);
        expect(alertWrapper.props('title')).toBe('Verification code is incorrect.');
        expect(wrapper.find('#nickname').exists()).toBe(false);

        // 测试异步验证成功
        await codeInput.setValue('123456');
        await nextButton.trigger('click');
        await nextTick();

        expect(wrapper.findComponent(AlertStub).exists()).toBe(false);
        expect(wrapper.find('#nickname').exists()).toBe(true);
    });
});