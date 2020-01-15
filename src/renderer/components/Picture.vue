<template>
  <div class="component__picture">
    <img v-if="component.src.url" :src="component.src.url" class="picture" />
    <svg-icon v-else filename="image" />
  </div>
</template>

<script>
export default {
  name: 'ComponentPicture',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.component__picture {
  background-color: #f2f6fc;
  .flex-center();

  .picture {
    display: block;
    width: 100%;
  }

  .svg-icon {
    font-size: 24px;
    color: #dcdfe6;
  }
}
</style>
