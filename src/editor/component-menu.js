import { COMPONENT_TYPE } from '@/renderer/constants';
import controlPanelPicture from './components/control-panel/Picture.vue';
import controlPanelChoiseQuestion from './components/control-panel/ChoiseQuestion.vue';
import controlPanelTextarea from './components/control-panel/Textarea.vue';
import controlPanelText from './components/control-panel/Text.vue';
import controlPanelSwiper from './components/control-panel/Swiper.vue';
import controlPanelForm from './components/control-panel/Form.vue';

export const form = {
  [COMPONENT_TYPE.选择题]: {
    label: '选择题',
    controlPanel: controlPanelChoiseQuestion,
    iconname: 'check-square',
  },
  [COMPONENT_TYPE.输入框]: {
    label: '输入框',
    controlPanel: controlPanelTextarea,
    iconname: 'edit-square',
  },
};

export const normal = {
  [COMPONENT_TYPE.图片]: {
    label: '图片',
    controlPanel: controlPanelPicture,
    iconname: 'image',
  },
  [COMPONENT_TYPE.文本]: {
    label: '文字',
    controlPanel: controlPanelText,
    iconname: 'font-colors',
  },
  [COMPONENT_TYPE.轮播图]: {
    label: '轮播图',
    controlPanel: controlPanelSwiper,
    iconname: 'interation',
  },
  [COMPONENT_TYPE.表单]: {
    label: '表单',
    controlPanel: controlPanelForm,
    iconname: 'interation',
  },
};
