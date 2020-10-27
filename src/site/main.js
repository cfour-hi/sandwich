import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(App),
}).$mount('#app');

function setComponents(components) {
  if (components) {
    const [appVM] = app.$children;
    if (components) appVM.components = components;
  }
}

const data = window.localStorage.getItem('SANDWICH_JSON_DATA');
if (data) {
  const { components } = JSON.parse(data);
  setComponents(components);
}

window.addEventListener('message', e => {
  const { components } = e.data;
  setComponents(components);
});

if (window.self !== window.parent) {
  window.parent.postMessage({ readyState: document.readyState }, '*');
}
