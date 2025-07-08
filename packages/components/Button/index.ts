//用来整合组件,最后统一导出

import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'

import { withInstall } from '@sukin/utils/install'
export * from './type'
export const SuButton = withInstall(Button)
export const SuButtonGroup = withInstall(ButtonGroup)
