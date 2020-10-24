import { COMPONENT_TYPE } from '@/renderer/constants';

export default () => ({
  children: [COMPONENT_TYPE.选择题, COMPONENT_TYPE.输入框],
  buttonProps: { text: '提交' },
  buttonStyle: {
    height: '50px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#409eff',
  },
  props: {},
  style: {},
});
