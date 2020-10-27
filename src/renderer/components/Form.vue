<template>
  <div class="component__form">
    <slot />
    <button
      class="button"
      :style="component.buttonStyle"
      @click="handleClickButton"
    >
      {{ component.buttonProps.text }}
    </button>
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

  methods: {
    handleClickButton() {
      const result = {};
      this.$children.forEach(({ component, $refs }) => {
        result[component.id] = $refs.component.getData();
      });
      this.$emit('submit', result);
    },
  },
};
</script>

<style lang="less" scoped>
.button {
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
</style>

<style lang="less">
.component__form {
  padding: 16px 24px;

  .component-wrap {
    padding-bottom: 16px;
  }

  .title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 700;

    &.required::before {
      content: '*';
      position: absolute;
      margin-left: -12px;
      color: #f56c6c;
    }
  }

  .desc {
    font-size: 14px;
    color: #999;
    font-weight: 400;
  }

  .button {
    height: 40px;
  }
}
</style>
