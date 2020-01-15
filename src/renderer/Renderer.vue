<template>
  <div class="renderer">
    <div
      v-for="component in components"
      :id="component.id"
      :key="component.id"
      :class="{ active: activeComponentId === component.id }"
      class="component-wrap"
    >
      <component
        :is="componentTypes[component.type]"
        :component="component"
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
import ChoiceQuestion from './components/ChoiceQuestion.vue';
import Textarea from './components/Textarea.vue';
import Button from './components/Button.vue';

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
      [COMPONENT_TYPE.choiseQuestion]: ChoiceQuestion,
      [COMPONENT_TYPE.textarea]: Textarea,
      [COMPONENT_TYPE.button]: Button,
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

  .mask {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid transparent;

    &:hover::before {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      border: 1px solid #999;
    }

    &:hover::after {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      border: 1px dashed #fff;
    }
  }

  &.active {
    .mask {
      border-color: #409eff;
    }
  }
}
</style>
