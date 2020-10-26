<template>
  <div class="component__textarea">
    <div class="title" :class="{ required: component.props.required }">
      {{ component.props.title }}
      <div class="desc">{{ component.props.desc }}</div>
    </div>

    <textarea
      :value="value"
      :rows="component.props.rows"
      class="textarea"
      placeholder="请输入"
    />
  </div>
</template>

<script>
export default {
  name: 'ComponentTextarea',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      value: '',
    };
  },
};
</script>

<style lang="less" scoped>
// @import '~@/renderer/styles/form.less';

.component__textarea {
  // .form-item();

  .textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    line-height: 24px;
    background-color: #f8f8f8;
    outline: 0;
    resize: none;
  }
}
</style>
