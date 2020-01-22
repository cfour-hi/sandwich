<template>
  <el-container id="app" direction="vertical">
    <AppHeader @preview="showPreview = true" />

    <el-container>
      <!-- 组件选择面板 -->
      <AppComponentPanel />
      <!-- 主体区域 -->
      <AppMain />
      <!-- 组件控制面板 -->
      <AppControlPanel />
    </el-container>

    <!-- 预览窗口 -->
    <Preview v-if="showPreview" @clickMask="showPreview = false" />
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppComponentPanel from './components/AppComponentPanel.vue';
import AppMain from './components/AppMain.vue';
import AppControlPanel from './components/control-panel/index.vue';
import Preview from './components/Preview.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppComponentPanel,
    AppMain,
    AppControlPanel,
    Preview,
  },

  data() {
    return {
      showPreview: false,
    };
  },
};
</script>

<style src="normalize.css"></style>
<style lang="less" src="./styles/app.less"></style>

<style lang="less" scoped>
#app {
  height: 100%;

  > .el-container {
    flex: 100%;
    overflow: hidden;
  }
}
</style>
