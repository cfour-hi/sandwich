<template>
  <div class="component__text">
    <div :style="component.style">{{ component.props.text }}</div>
  </div>
</template>

<script>
export default {
  name: 'ComponentText',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.component__text {
  white-space: pre-wrap;
}
</style>
