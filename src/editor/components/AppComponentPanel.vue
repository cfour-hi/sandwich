<template>
  <el-aside width="272px">
    <ul class="component-list">
      <li
        v-for="(component, type) in componentMenu.normal"
        :key="type"
        class="component-item"
        @click="handleClickComponent(type)"
      >
        <svg-icon :filename="component.iconname"></svg-icon>
        <span>{{ component.label }}</span>
      </li>
    </ul>

    <template v-if="activeComponent.type === COMPONENT_TYPE.表单">
      <div>{{ componentMenu.normal[activeComponent.type].label }}</div>
      <ul class="component-list">
        <li
          v-for="(component, type) in componentMenu[COMPONENT_TYPE.表单]"
          :key="type"
          class="component-item"
          @click="handleClickComponent(type, activeComponent.id)"
        >
          <svg-icon :filename="component.iconname"></svg-icon>
          <span>{{ component.label }}</span>
        </li>
      </ul>
    </template>
  </el-aside>
</template>

<script>
import * as componentMenu from '../component-menu';
import { COMPONENT_TYPE } from '@/renderer/constants';

export default {
  name: 'AppComponentPanel',

  data() {
    this.componentMenu = componentMenu;
    this.COMPONENT_TYPE = COMPONENT_TYPE;
    return {};
  },

  computed: {
    activeComponent() {
      return this.$store.getters.activeComponent || {};
    },
  },

  methods: {
    handleClickComponent(type, parent) {
      this.$store.dispatch('addComponent', { type, parent });
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #f7f9fc;
  height: 100%;
  padding: 16px;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);

  .component-list {
    display: flex;
    flex-wrap: wrap;
    width: 240px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;

    .component-item {
      .flex-center();
      flex-direction: column;
      box-sizing: border-box;
      width: 80px;
      height: 80px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #5d6482;
      background-color: #fff;
      cursor: pointer;

      .svg-icon {
        font-size: 24px;
        margin-bottom: 4px;
      }

      &:hover {
        .svg-icon {
          transform: translateY(-2px);
          transition: transform ease-in-out 0.1s;
        }
      }
    }
  }
}
</style>
