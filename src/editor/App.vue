<template>
  <el-container id="app" direction="vertical">
    <AppHeader />

    <el-container>
      <AppComponentBar />

      <AppMain />
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppComponentBar from './components/AppComponentBar.vue';
import AppMain from './components/AppMain.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppComponentBar,
    AppMain,
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
