import 'normalize.css';
import './styles/app.less';
import './element-ui';
import Vue from 'vue';
import App from './App.vue';
import SvgIcon from './components/SvgIcon.vue';

Vue.config.productionTip = false;
Vue.component(SvgIcon.name, SvgIcon);

// 借助 webpack 在编译时加载 svg 图标
(request => request.keys().map(request))(
  require.context('./assets/svg-icon', false, /\.svg$/)
);

new Vue({
  render: h => h(App),
}).$mount('#app');
