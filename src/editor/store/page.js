import NP from 'number-precision';
import createComponent from '@/renderer/component-factory/create-component';
import {
  ADD_COMPONENT,
  SET_ACTIVE_COMPONENT_ID,
  UPDATE_ACTIVE_COMPONENT,
} from './mutation-types';

/**
 * 调整组件的定位 y 值（与顶部的距离）
 * @param {Array} comps
 */
const processCompsLocation = comps => {
  comps.forEach((comp, index, self) => {
    if (index === 0) {
      comp.y = 0;
    } else {
      const prevComp = self[index - 1];
      comp.y = prevComp.y + prevComp.height;
    }
  });
};

export default {
  state: {
    components: [],
    activeComponentId: '',
  },

  getters: {
    activeComponentIndex({ components, activeComponentId }) {
      if (activeComponentId) {
        return components.findIndex(c => c.id === activeComponentId);
      }
      return -1;
    },

    activeComponent({ components }, { activeComponentIndex }) {
      if (activeComponentIndex < 0) {
        return null;
      }
      return components[activeComponentIndex];
    },
  },

  mutations: {
    [ADD_COMPONENT](state, comp) {
      state.components.push(comp);
    },

    [SET_ACTIVE_COMPONENT_ID](state, id) {
      state.activeComponentId = id;
    },

    [UPDATE_ACTIVE_COMPONENT](state, payload) {
      const activeComp = state.components.find(
        c => c.id === state.activeComponentId
      );
      Object.assign(activeComp, JSON.parse(JSON.stringify(payload)));
      processCompsLocation(state.components);
    },
  },

  actions: {
    addComponent({ state, commit }, { type, attrs = {} }) {
      const y = state.components
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
