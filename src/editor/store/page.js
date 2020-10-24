import createComponent from '@/renderer/component-factory/create-component';
import {
  ADD_COMPONENT,
  SET_ACTIVE_COMPONENT_ID,
  UPDATE_ACTIVE_COMPONENT,
  MOVE_COMPONENT,
  DELETE_COMPONENT,
  SET_COMPONENTS,
} from './mutation-types';

export default {
  state: {
    components: { root: { id: 'root', type: 'root', children: [] } },
    activeComponentId: null,
  },

  getters: {
    activeComponent(state) {
      return state.components[state.activeComponentId];
    },
  },

  mutations: {
    [SET_COMPONENTS](state, comps) {
      state.components = comps;
    },

    [ADD_COMPONENT](state, component) {
      state.components = { ...state.components, [component.id]: component };
      state.components[component.parent].children.push(component.id);
    },

    [SET_ACTIVE_COMPONENT_ID](state, id) {
      state.activeComponentId = id;
    },

    [UPDATE_ACTIVE_COMPONENT](state, payload) {
      payload = JSON.parse(JSON.stringify(payload));
      Object.assign(state.components[state.activeComponentId], payload);
    },

    [MOVE_COMPONENT](state, { id, dir }) {
      const parentComponent = state.components[state.components[id].parent];
      const index = parentComponent.children.findIndex(cid => cid === id);
      const targetIndex = index + dir;
      parentComponent.children.splice(index, 1);
      parentComponent.children.splice(targetIndex, 0, id);
    },

    [DELETE_COMPONENT](state, component) {
      delete state.components[component.id];

      const { children } = state.components[component.parent];
      const index = children?.findIndex(id => id === component.id);
      if (index >= 0) children.splice(index, 1);
    },
  },

  actions: {
    async addComponent({ dispatch, commit }, { type, parent }) {
      const component = createComponent(type);
      component.parent = parent ?? 'root';

      const { children: originalChildren } = component;
      if (originalChildren) component.children = [];

      commit(ADD_COMPONENT, component);
      if (component.parent === 'root') {
        commit(SET_ACTIVE_COMPONENT_ID, component.id);
      }

      if (Array.isArray(originalChildren)) {
        const children = await Promise.all(
          originalChildren.map(t => {
            return new Promise(async resolve => {
              const { id } = await dispatch('addComponent', {
                type: t,
                parent: component.id,
              });
              resolve(id);
            });
          })
        );
        commit(UPDATE_ACTIVE_COMPONENT, { children });
      }

      return component;
    },

    moveComponent({ state }, { id, dir }) {
      const parentComponent = state.components[state.components[id].parent];
      const index = parentComponent.children.findIndex(cid => cid === id);
      const targetIndex = index + dir;
      parentComponent.children.splice(index, 1);
      parentComponent.children.splice(targetIndex, 0, id);
    },

    async deleteComponent({ dispatch, commit, state }, id) {
      const deleteId = id ?? state.activeComponentId;
      const component = state.components[deleteId];

      // 删除行为深度优先
      if (Array.isArray(component.children)) {
        await Promise.all(
          component.children?.map(childId => {
            return new Promise(async resolve => {
              await dispatch('deleteComponent', childId);
              resolve();
            });
          })
        );
      }

      commit(DELETE_COMPONENT, component);

      if (!id) commit(SET_ACTIVE_COMPONENT_ID, null);
    },
  },
};
