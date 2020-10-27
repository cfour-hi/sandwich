<template>
  <div id="app">
    <Renderer
      v-if="components"
      :components="components"
      :component-render-config="componentRenderConfig"
    />
  </div>
</template>

<script>
import { COMPONENT_TYPE } from '@/renderer/constants';
import Renderer from '@/renderer/Renderer';
import FormWrap from './components/Form.vue';

export default {
  name: 'App',

  components: {
    Renderer,
  },

  data() {
    this.componentRenderConfig = {
      [COMPONENT_TYPE.表单]: FormWrap,
    };
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
