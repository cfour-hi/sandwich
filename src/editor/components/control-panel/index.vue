<template>
  <el-aside :style="controlPanelStyle">
    <Component
      :is="activeControlPanel"
      v-if="activeControlPanel"
      :component="$store.getters.activeComponent"
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
    activeControlPanel() {
      const { activeComponent } = this.$store.getters;
      if (activeComponent) {
        return componentSetting[activeComponent.type].controlPanel;
      }
      return null;
    },

    controlPanelStyle() {
      const style = {};
      if (!this.activeControlPanel) style.visibility = 'hidden';
      return style;
    },
  },

  methods: {
    handleDeleteComp() {
      this.$store.dispatch('deleteActiveComp');
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  padding: 0 20px;
  background-color: #f7f9fc;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
