import { genRandomCode } from '@/common/tool';

export const config = {};
// 借助 webpack 在编译时加载组件配置
(r => {
  r.keys().forEach(k => {
    const defaultFn = r(k).default;
    // 组件配置必须存在 type 属性
    config[defaultFn().type] = defaultFn;
  });
})(require.context('./config', false, /\.js$/));

export default (type, { attrs = {} } = {}) => ({
  id: genRandomCode(),
  ...config[type](attrs),
});
