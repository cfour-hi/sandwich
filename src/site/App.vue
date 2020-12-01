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
import { COMPONENT_TYPE, SANDWICH_JSON_DATA } from '@/renderer/constants';
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

  created() {
    const data = window.localStorage.getItem(SANDWICH_JSON_DATA);
    if (data) {
      const { components } = JSON.parse(data);
      if (components) this.components = components;
    }
  },

  mounted() {
    window.addEventListener('message', e => {
      const { components } = e.data;
      if (components) this.components = components;
    });
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
