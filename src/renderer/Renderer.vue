<template>
  <div class="renderer">
    <RenderComponent
      v-for="(component, index) in rootChildComponents"
      :key="component.id"
      :components="components"
      :component="component"
      v-bind="$attrs"
    >
      <template #before-component>
        <slot name="before-component" :component="component" :index="index" />
      </template>

      <!-- <template #before-sub-component="{ component }">
        <slot name="before-sub-component" :component="component" />
      </template> -->
    </RenderComponent>
  </div>
</template>

<script>
import RenderComponent from './RenderComponent.vue';

export default {
  name: 'Renderer',

  components: {
    RenderComponent,
  },

  inheritAttrs: false,

  props: {
    components: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    rootChildComponents() {
      return this.components.root.children.map(id => this.components[id]);
    },
  },
};
</script>

<style lang="less" scoped>
.renderer {
  line-height: 1.5;
}
</style>
