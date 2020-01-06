import { COMPONENT_TYPE } from '@/renderer/constants';
import controlPanelPicture from './components/control-panel/Picture.vue';
import controlPanelChoiseQuestion from './components/control-panel/ChoiseQuestion.vue';
import controlPanelTextarea from './components/control-panel/Textarea.vue';

export default {
  [COMPONENT_TYPE.picture]: {
    label: '图片',
    controlPanel: controlPanelPicture,
  },
  [COMPONENT_TYPE.choiseQuestion]: {
    label: '选择题',
    controlPanel: controlPanelChoiseQuestion,
  },
  [COMPONENT_TYPE.textarea]: {
    label: '输入框',
    controlPanel: controlPanelTextarea,
  },
};
