import { COMPONENT_TYPE } from '@/renderer/constants';

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.button,
  text: '提交',
  style: {
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#409eff',
  },
  ...attrs,
});
