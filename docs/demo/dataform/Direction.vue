<template>
    <div class="demo-wrapper">
        <h3>水平布局 (Horizontal)</h3>
        <SuDataform :sections="formSections" direction="horizontal" initial-form="登录" />

        <h3 style="margin-top: 40px;">小尺寸 (Small)</h3>
        <SuDataform :sections="formSections" size="small" initial-form="注册" />
    </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.demo-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e0e0e0;
}


.su-dataform {
    background-color: white;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>