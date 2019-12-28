<template>
  <el-container id="app" direction="vertical">
    <AppHeader />

    <el-container>
      <!-- 组件选择面板 -->
      <AppComponentPanel />
      <!-- 主体区域 -->
      <AppMain />
      <!-- 组件控制面板 -->
      <AppControlPanel />
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppComponentPanel from './components/AppComponentPanel.vue';
import AppMain from './components/AppMain.vue';
import AppControlPanel from './components/control-panel/index.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppComponentPanel,
    AppMain,
    AppControlPanel,
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;

  > .el-container {
    flex: 100%;
    overflow: hidden;
  }
}
</style>
