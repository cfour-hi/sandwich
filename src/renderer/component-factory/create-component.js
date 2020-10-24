import { genRandomCode } from '@/common/tool';

export const config = {};
// 借助 webpack 在编译时加载组件配置
(r => {
  r.keys().forEach(k => {
    const defaultFn = r(k).default;
    const [type] = k.match(/(?<=\/)[^.]+(?=\.js$)/);
    config[type] = defaultFn;
  });
})(require.context('./config', false, /\.js$/));

function createComponent(type) {
  const id = genRandomCode();
  const componentMenu = config[type]();
  return {
    id,
    type,
    ...componentMenu,
  };
}

export default createComponent;
