import store from './store/index';
import { SANDWICH_JSON_DATA } from './constants';

/**
 * 保存页面数据到本地
 */
export const saveSandwichPage = () => {
  window.localStorage.setItem(
    SANDWICH_JSON_DATA,
    JSON.stringify({
      version: process.env.VUE_APP_VERSION,
      components: store.state.page.components,
    })
  );
};
