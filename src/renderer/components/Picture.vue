<template>
  <div class="component-picture">
    <img
      v-if="component.url"
      :src="component.url"
      class="picture"
      @load="handleLoadPicture"
    />
    <svg-icon v-else filename="image" />
  </div>
</template>

<script>
export default {
  name: 'Picture',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleLoadPicture() {
      if (this.$EventBus) {
        // 图片加载完成需要更新图片组件高度值
        this.$EventBus.$emit('loadComponentPicture');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.component-picture {
  background-color: #f2f6fc;
  .flex-center();

  .pictire {
    display: block;
    width: 100%;
  }

  .svg-icon {
    font-size: 24px;
    color: #dcdfe6;
  }
}
</style>
