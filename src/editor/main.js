import 'normalize.css';
import './styles/app.less';
import './element-ui';
import Vue from 'vue';
import store from './store/index';
import App from './App.vue';
import SvgIcon from '@/common/svg-icon/index';
import Renderer from '@/renderer/main';

Vue.config.productionTip = false;

Vue.use(SvgIcon);
Vue.use(Renderer);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
