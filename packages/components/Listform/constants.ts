// @file SuForm/constants.ts
// @description Constants for SuForm component.

import type { FormAction } from './type';

export const DEFAULT_FORM_TITLE = '表单';

export const DEFAULT_FORM_ACTIONS: FormAction[] = [
    { label: '提交', emit: 'submit' },
    { label: '取消', emit: 'cancel' },
    { label: '重置', emit: 'reset' },
];