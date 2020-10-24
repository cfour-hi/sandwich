<template>
  <el-aside :style="controlPanelStyle">
    <template v-if="activeComponent">
      <div
        v-show="activeComponent.parent !== 'root'"
        class="back"
        @click="handleClickBack"
      >
        返回
      </div>
      <!-- <div class="ear">
        <svg-icon
          v-for="component in components"
          :key="component.id"
          :filename="componentMenu[component.type].iconname"
          @click.native="handleClickSVG(component.id)"
        />
      </div> -->

      <!-- 这里必须设置 key -->
      <!-- 不然相同类型组件之间的切换 -->
      <!-- 使用的仍是同一个 panel 组件 -->
      <!-- 会导致组件内容不更新的问题 -->
      <Component
        :is="componentMenu[activeComponent.type].controlPanel"
        :key="activeComponent.id"
        :component="activeComponent"
        class="control-panel"
      />
    </template>
  </el-aside>
</template>

<script>
import * as componentMenu from '@/editor/component-menu';
import { SET_ACTIVE_COMPONENT_ID } from '@/editor/store/mutation-types';

export default {
  name: 'AppAsideRight',

  data() {
    this.componentMenu = Object.values(componentMenu).reduce(
      (acc, cur) => ({ ...acc, ...cur }),
      {}
    );
    return {};
  },

  computed: {
    activeComponent() {
      return this.$store.getters.activeComponent;
    },

    controlPanelStyle() {
      const style = {};
      if (!this.activeComponent?.id) style.visibility = 'hidden';
      return style;
    },
  },

  methods: {
    // handleClickSVG(id) {
    //   this.$store.commit(SET_ACTIVE_COMPONENT_ID, id);
    // },

    handleClickBack() {
      this.$store.commit(SET_ACTIVE_COMPONENT_ID, this.activeComponent.parent);
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  position: relative;
  display: flex;
  background-color: #f7f9fc;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: visible;
}

.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  font-size: 12px;
  line-height: 40px;
  text-align: center;
  background-color: #ccced7;
  transform: translateX(-100%);
  cursor: pointer;
}

.ear {
  flex: 0 0 30px;

  .active {
    background-color: @color-brand;
  }

  .svg-icon {
    font-size: 20px;
    cursor: pointer;
  }
}

.control-panel {
  flex: auto;
  overflow: auto;
}
</style>
