import { genRandomCode } from '@/common/tool';

export const config = {};
// 借助 webpack 在编译时加载组件配置
(request => {
  request.keys().forEach(k => {
    const compMeta = request(k).default;
    config[compMeta.type] = compMeta;
  });
})(require.context('./config', false, /\.js$/));

export default (type, { attrs = {} } = {}) => ({
  id: genRandomCode(),
  ...config[type](attrs),
});