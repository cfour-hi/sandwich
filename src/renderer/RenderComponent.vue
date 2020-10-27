<template>
  <div class="component-wrap">
    <slot name="before-component" />
    <!-- <slot name="before-sub-component2" /> -->

    <component
      :is="_componentRenderConfig[component.type]"
      ref="component"
      :component="component"
      class="component"
    >
      <RenderComponent
        v-for="childComponent in childComponents"
        :key="childComponent.id"
        :components="components"
        :component="childComponent"
      >
        <!-- <template #before-sub-component2>
          <slot name="before-sub-component" :component="childComponent" />
        </template> -->
      </RenderComponent>
    </component>
  </div>
</template>

<script>
import { COMPONENT_TYPE } from './constants';
import Picture from './components/Picture.vue';
import ChoiceQuestion from './components/ChoiceQuestion.vue';
import Textarea from './components/Textarea.vue';
import Text from './components/Text.vue';
import Swiper from './components/Swiper.vue';
import Form from './components/Form.vue';
import Phone from './components/Phone.vue';

export default {
  name: 'RenderComponent',

  props: {
    components: {
      type: Object,
      required: true,
    },

    component: {
      type: Object,
      required: true,
    },

    componentRenderConfig: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    this._componentRenderConfig = {
      [COMPONENT_TYPE.图片]: Picture,
      [COMPONENT_TYPE.选择题]: ChoiceQuestion,
      [COMPONENT_TYPE.输入框]: Textarea,
      [COMPONENT_TYPE.文本]: Text,
      [COMPONENT_TYPE.轮播图]: Swiper,
      [COMPONENT_TYPE.表单]: Form,
      [COMPONENT_TYPE.手机]: Phone,
      ...this.componentRenderConfig,
    };
    return {};
  },

  computed: {
    childComponents() {
      return this.component?.children?.map(id => this.components[id]);
    },
  },
};
</script>

<style lang="less" scoped>
.component-wrap {
  position: relative;

  // + .component-wrap {
  //   .component {
  //     padding-top: 0;
  //   }
  // }

  .component {
    overflow: hidden;
    // font-size: 0; // 避免元素之间的空白会产生不必要的距离
  }
}
</style>
