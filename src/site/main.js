import Vue from 'vue';
import { SANDWICH_JSON_DATA } from '@/renderer/constants';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(App),
}).$mount('#app');

const data = window.localStorage.getItem(SANDWICH_JSON_DATA);
if (data) {
  const { components } = JSON.parse(data);
  if (components) app.$children.components = components;
}

window.addEventListener('message', e => {
  const { components } = e.data;
  if (components) app.$children.components = components;
});

if (window.self !== window.parent) {
  window.parent.postMessage({ readyState: document.readyState }, '*');
}
