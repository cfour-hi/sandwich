import { COMPONENT_TYPE } from '@/renderer/constants';
import controlPanelPicture from './components/control-panel/Picture.vue';
import controlPanelChoiseQuestion from './components/control-panel/ChoiseQuestion.vue';

export default {
  [COMPONENT_TYPE.picture]: {
    label: '图片',
    controlPanel: controlPanelPicture,
  },
  [COMPONENT_TYPE.choiseQuestion]: {
    label: '选择题',
    controlPanel: controlPanelChoiseQuestion,
  },
};
