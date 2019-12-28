import { COMPONENT_TYPE } from '@/renderer/constants';

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.picture,
  height: 231.75,
  y: 0,
  url: '',
  ...attrs,
});
