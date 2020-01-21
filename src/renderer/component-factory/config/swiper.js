import { COMPONENT_TYPE } from '@/renderer/constants';

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.swiper,
  pictures: [], // picture => { url: '', width: 0; height: 0 }
  speed: 0.3,
  autoplay: false,
  delay: 2,
  ...attrs,
});
