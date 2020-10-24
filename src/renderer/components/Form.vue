<template>
  <div class="component__form">
    <slot />
    <div class="button-wrap">
      <button class="button" :style="component.buttonStyle">
        {{ component.buttonProps.text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentForm',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.button-wrap {
  padding: 0 16px 16px;
}

.button {
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
</style>
