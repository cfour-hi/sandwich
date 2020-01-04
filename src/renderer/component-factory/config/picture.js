import { COMPONENT_TYPE } from '@/renderer/constants';

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.picture,
  src: {
    url: '',
    width: 0,
    height: 0,
  },
  ...attrs,
});
