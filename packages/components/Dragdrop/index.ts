//用来整合组件,最后统一导出
import Drag from './Dragdrop.vue'
import { withInstall } from '@sukin/utils/install'
export const SuDragDrop = withInstall(Drag)

export * from './type'