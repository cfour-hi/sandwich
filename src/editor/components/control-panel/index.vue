<template>
  <el-aside :style="controlPanelStyle">
    <!-- 这里必须设置 key -->
    <!-- 不然相同类型组件之间的切换 -->
    <!-- 使用的仍是同一个 panel 组件 -->
    <!-- 会导致组件内容不更新的问题 -->
    <Component
      :is="activeControlPanel"
      v-if="activeControlPanel"
      :key="activeComponent.id"
      :component="activeComponent"
      class="control-panel"
    />
  </el-aside>
</template>

<script>
import componentSetting from '@/editor/component-setting';

export default {
  name: 'AppAsideRight',

  data() {
    return {};
  },

  computed: {
    activeComponent() {
      return this.$store.getters.activeComponent;
    },

    activeControlPanel() {
      if (this.activeComponent) {
        return componentSetting[this.activeComponent.type].controlPanel;
      }
      return null;
    },

    controlPanelStyle() {
      const style = {};
      if (!this.activeControlPanel) style.visibility = 'hidden';
      return style;
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  padding: 0 16px;
  background-color: #f7f9fc;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
