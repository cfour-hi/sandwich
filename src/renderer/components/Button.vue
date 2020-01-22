<template>
  <div class="component__button">
    <button class="button" :style="component.style">
      {{ component.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ComponentButton',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.component__button {
  padding: 16px;
}

.button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
</style>
