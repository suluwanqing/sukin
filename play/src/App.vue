<template>
  <div class="demo-container">
    <h1 class="demo-title">SuDataform 组件示例</h1>
    <SuDataform :sections="formSections" initial-form="登录" @submit="handleSubmit" @close="handleClose" />
    <div v-if="eventMessage" class="event-feedback">
      <p><strong>事件触发:</strong></p>
      <pre>{{ eventMessage }}</pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { SuDataform } from "sukin"

const eventMessage = ref('');
const formSections = [

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
        required: true, // 作用：标记为必填
        rules: [{ name: 'minLength', length: 6, message: '密码至少需要6位' }]
      }
    ]
  },
  // 注册表单
  {
    title: '注册',
    step: true,
    step_model: { All_Steps: 3 },
    steps: [
      {
        step: 1,
        fields: [
          {
            id: 'reg_email',
            label: '电子邮箱',
            type: 'email',
            placeholder: '用于接收验证邮件',
            required: true, // 作用：必填且需要通过 email 规则
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
      {
        step: 3,
        fields: [
          {
            id: 'nickname',
            label: '昵称（可选）', // 作用：这是一个可选字段
            type: 'text',
            placeholder: '给自己起个好听的名字吧',
            required: false // 或不写此字段
          }
        ]
      }
    ]
  }
];

const handleSubmit = (formType: string, data: Record<string, any>) => {
  const message = `表单类型: ${formType}\n提交的数据:\n${JSON.stringify(data, null, 2)}`;
  eventMessage.value = message;
};

const handleClose = () => {
  eventMessage.value = `关闭按钮被点击。\n时间: ${new Date().toLocaleTimeString()}`;
};
</script>

<style scoped>
.demo-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 0 25px 25px 25px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  overflow: hidden;
}

.demo-title {
  text-align: center;
  color: #333;
  margin-top: 25px;
  margin-bottom: 24px;
}

.event-feedback {
  margin-top: 25px;
  padding: 15px;
  background-color: #eef7ff;
  border: 1px solid #b3d4fc;
  border-radius: 8px;
  color: #333;
}

.event-feedback pre {
  background-color: #f7fafc;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>