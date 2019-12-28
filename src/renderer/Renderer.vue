<template>
  <div class="renderer">
    <div
      v-for="component in components"
      :key="component.id"
      :class="{ active: activeComponentId === component.id }"
      class="component-wrap"
    >
      <component
        :is="componentTypes[component.type]"
        :component="component"
        :style="{ height: `${component.height}px` }"
        class="component"
      />
      <div
        class="mask"
        @click="$emit('changeActiveComponent', component)"
      ></div>
    </div>
  </div>
</template>

<script>
import { COMPONENT_TYPE } from './constants';
import Picture from './components/Picture.vue';

export default {
  name: 'Renderer',

  props: {
    components: {
      type: Array,
      required: true,
    },

    activeComponentId: {
      type: String,
      default: '',
    },
  },

  data() {
    this.componentTypes = {
      [COMPONENT_TYPE.picture]: Picture,
    };
    return {};
  },
};
</script>

<style lang="less" scoped>
.component-wrap {
  position: relative;

  .mask {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
  }

  &.active {
    .mask {
      border-color: #000;
    }
  }
}
</style>
