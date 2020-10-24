import { SET_ACTIVE_COMPONENT_ID } from './mutation-types';

export default {
  state: {
    activeComponentId: '',
  },

  mutations: {
    [SET_ACTIVE_COMPONENT_ID](state, id) {
      state.activeComponentId = id;
    },
  },
};
