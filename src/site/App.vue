<template>
  <div id="app">
    <Renderer v-if="components" :components="components" />
  </div>
</template>

<script>
import Renderer from '@/renderer/Renderer';

export default {
  name: 'App',

  components: {
    Renderer,
  },

  data() {
    return {
      components: null,
    };
  },
};
</script>

<style src="normalize.css"></style>
<style lang="less" src="./app.less"></style>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
