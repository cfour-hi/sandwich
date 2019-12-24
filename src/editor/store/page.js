import NP from 'number-precision';
import createComponent from '@/renderer/component-factory/create-component';
import { ADD_COMPONENT, SET_ACTIVE_COMPONENT_ID } from './mutation-types';

export default {
  state: {
    comps: [],
    activeComponentId: '',
  },

  mutations: {
    [ADD_COMPONENT](state, comp) {
      state.comps.push(comp);
    },

    [SET_ACTIVE_COMPONENT_ID](state, id) {
      state.activeComponentId = id;
    },
  },

  actions: {
    addComponent({ state, commit }, { type, attrs = {} }) {
      const y = state.comps
        .map(c => c.height)
        .reduce((p, c) => NP.plus(p, c), 0);
      const comp = createComponent(type, {
        ...JSON.parse(JSON.stringify(attrs)),
        y,
      });

      commit(ADD_COMPONENT, comp);
      commit(SET_ACTIVE_COMPONENT_ID, comp.id);
    },
  },
};
