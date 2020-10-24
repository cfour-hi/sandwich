import Vue from 'vue';
import Vuex from 'vuex';
import page from './page';
import component from './component';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    page,
    component,
  },
});
