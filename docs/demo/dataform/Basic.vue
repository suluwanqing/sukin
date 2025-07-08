<template>
    <div class="demo-wrapper">
        <SuDataform :sections="formSections" initial-form="登录" @submit="handleSubmit" @close="handleClose" />
        <div v-if="eventMessage" class="event-feedback">
            <p><strong>事件反馈:</strong></p>
            <pre>{{ eventMessage }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SuDataform } from "sukin";
const formSections  = [
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
const eventMessage = ref('');
const handleSubmit = (formType: string, data: Record<string, any>) => {
    eventMessage.value = `表单 "${formType}" 已提交\n数据: ${JSON.stringify(data, null, 2)}`;
};

const handleClose = () => {
    eventMessage.value = `关闭按钮于 ${new Date().toLocaleTimeString()} 被点击。`;
};
</script>

<style scoped>
.demo-wrapper {
    max-width: 460px;
    margin: 0 auto;
}

.event-feedback {
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    background-color: #f3f4f6;
    border: 1px solid #e5e7eb;
    white-space: pre-wrap;
    word-wrap: break-word;
}
</style>