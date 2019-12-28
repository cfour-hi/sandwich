import { COMPONENT_TYPE } from '@/renderer/constants';
import controlPanelPicture from './components/control-panel/Picture.vue';

export default {
  [COMPONENT_TYPE.picture]: {
    label: '图片',
    controlPanel: controlPanelPicture,
  },
};
