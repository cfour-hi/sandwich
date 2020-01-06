import { COMPONENT_TYPE } from '@/renderer/constants';

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.textarea,
  rows: 1,
  title: '输入框',
  desc: '',
  required: false,
  ...attrs,
});
