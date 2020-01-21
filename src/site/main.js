import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(App),
}).$mount('#app');

window.addEventListener('message', e => {
  const { components } = e.data;
  const [appVM] = app.$children;
  if (components) appVM.components = components;
});

if (window.self !== window.parent) {
  window.parent.postMessage({ readyState: document.readyState }, '*');
}
