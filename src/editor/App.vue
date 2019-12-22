<template>
  <el-container id="app" direction="vertical">
    <AppHeader />

    <el-container>
      <AppComponentBar />
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppComponentBar from './components/AppComponentBar.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
    AppComponentBar,
  },
};
</script>

<style lang="less">
#app {
  height: 100%;

  > .el-container {
    height: 100%;
  }
}
</style>
