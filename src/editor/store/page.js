import createComponent from '@/renderer/component-factory/create-component';
import {
  ADD_COMPONENT,
  SET_ACTIVE_COMPONENT_ID,
  UPDATE_ACTIVE_COMPONENT,
  MOVE_COMPONENT,
  DELETE_ACTIVE_COMPONENT,
  SET_COMPONENTS,
} from './mutation-types';

export default {
  state: {
    components: [],
    activeComponentId: '',
  },

  getters: {
    activeComponent({ components, activeComponentId }) {
      if (activeComponentId) {
        return components.find(c => c.id === activeComponentId);
      }
      return null;
    },
  },

  mutations: {
    [SET_COMPONENTS](state, comps) {
      state.components = comps;
    },

    [ADD_COMPONENT](state, comp) {
      state.components.push(comp);
    },

    [SET_ACTIVE_COMPONENT_ID](state, id) {
      state.activeComponentId = id;
    },

    [UPDATE_ACTIVE_COMPONENT](state, payload) {
      const activeComp = state.components.find(c => c.id === state.activeComponentId);
      const copyPayload = JSON.parse(JSON.stringify(payload));
      /**
       * 如果 payload 某个属性为引用类型数据
       * 需要将这个引用类型的全量数据都传递过来
       */
      Object.assign(activeComp, copyPayload);
    },

    [MOVE_COMPONENT](state, direction) {
      const index = state.components.findIndex(c => c.id === state.activeComponentId);
      const targetIndex = index + direction;
      const [targetComp] = state.components.splice(index, 1);
      state.components.splice(targetIndex, 0, targetComp);
    },

    [DELETE_ACTIVE_COMPONENT](state) {
      const index = state.components.findIndex(c => c.id === state.activeComponentId);
      state.components.splice(index, 1);
    },
  },

  actions: {
    addComponent({ commit }, { type, attrs = {} }) {
      const comp = createComponent(type, {
        ...JSON.parse(JSON.stringify(attrs)),
      });
      commit(ADD_COMPONENT, comp);
      commit(SET_ACTIVE_COMPONENT_ID, comp.id);
    },
  },
};
