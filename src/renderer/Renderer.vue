<template>
  <div class="renderer">
    <div
      v-for="(component, index) in components"
      :id="component.id"
      :key="component.id"
      class="component-wrap"
    >
      <slot name="before-component" :component="component" :index="index" />

      <component
        :is="componentTypes[component.type]"
        :component="component"
        class="component"
      />
    </div>
  </div>
</template>

<script>
import { COMPONENT_TYPE } from './constants';
import Picture from './components/Picture.vue';
import ChoiceQuestion from './components/ChoiceQuestion.vue';
import Textarea from './components/Textarea.vue';
import Button from './components/Button.vue';
import Text from './components/Text.vue';

export default {
  name: 'Renderer',

  props: {
    components: {
      type: Array,
      required: true,
    },
  },

  data() {
    this.componentTypes = {
      [COMPONENT_TYPE.picture]: Picture,
      [COMPONENT_TYPE.choiseQuestion]: ChoiceQuestion,
      [COMPONENT_TYPE.textarea]: Textarea,
      [COMPONENT_TYPE.button]: Button,
      [COMPONENT_TYPE.text]: Text,
    };
    return {};
  },
};
</script>

<style lang="less" scoped>
.renderer {
  line-height: 1.5;
}

.component-wrap {
  position: relative;

  .component {
    font-size: 0; // 避免元素之间的空白会产生不必要的距离
  }
}
</style>
