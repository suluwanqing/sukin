<template>
    <div class="demo-wrapper" style="padding: 20px; background: #eee; border-radius: 12px;">
        <SuDataform :sections="formSections" :background-image="imageUrl" initial-form="登录" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuDataform } from "sukin";
const formSections = [
    // 表单一：简单的非分步表单
    {
        title: '登录',
        step: false,
        fields: [
            {
                id: 'login_username',
                label: '用户名',
                type: 'text',
                placeholder: '请输入您的用户名',
                required: true
            },
            {
                id: 'login_password',
                label: '密码',
                type: 'password',
                placeholder: '请输入密码',
                required: true,
                rules: [{ name: 'minLength', length: 6, message: '密码至少需要6位' }]
            }
        ]
    },
    // 表单二：复杂的分步表单
    {
        title: '注册',
        step: true,
        step_model: {
            All_Steps: 3 // 定义总步数
        },
        steps: [
            // 步骤一：账户信息
            {
                step: 1,
                fields: [
                    {
                        id: 'reg_email',
                        label: '电子邮箱',
                        type: 'email',
                        placeholder: '用于接收验证邮件',
                        required: true,
                        rules: ['email']
                    },
                    {
                        id: 'reg_password',
                        label: '设置密码',
                        type: 'password',
                        placeholder: '至少8位',
                        required: true,
                        rules: [{ name: 'minLength', length: 8 }]
                    }
                ]
            },
            // 步骤二：验证码，包含自定义异步验证逻辑
            {
                step: 2,
                fields: [
                    {
                        id: 'verification_code',
                        label: '验证码',
                        type: 'text',
                        placeholder: '请输入6位验证码',
                        required: true
                    }
                ],
                func: async (formData) => {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return formData.verification_code === '123456' ? true : '您输入的验证码不正确。';
                }
            },
            // 步骤三：个人资料 (昵称为可选)
            {
                step: 3,
                fields: [
                    {
                        id: 'nickname',
                        label: '昵称 (可选)',
                        type: 'text',
                        placeholder: '给自己起个好听的名字吧',
                        required: false // 明确标记为可选
                    }
                ]
            }
        ]
    }
];
const imageUrl = ref('https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80');
</script>

<style scoped>
.demo-wrapper {
    max-width: 500px;
    margin: 0 auto;
}
</style>