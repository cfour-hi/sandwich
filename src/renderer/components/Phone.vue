<template>
  <div class="component__phone">
    <div class="title" :class="{ required: component.props.required }">
      {{ component.props.title }}
      <div class="desc">{{ component.props.desc }}</div>
    </div>

    <input
      type="tel"
      :value="value"
      :placeholder="component.props.placeholder"
      class="input input__phone"
    />

    <div class="code-wrap">
      <input
        type="tel"
        :value="code"
        class="input input__code"
        placeholder="请输入短信验证码"
      />

      <button :style="component.buttonStyle" class="button">发送验证码</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentPhone',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      value: '',
      code: '',
    };
  },
};
</script>

<style lang="less" scoped>
.input {
  box-sizing: border-box;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  line-height: 24px;
  background-color: #f8f8f8;
  outline: 0;
  resize: none;
}

.input__phone {
  width: 100%;
}

.code-wrap {
  height: 40px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .input__code {
    flex: auto;
  }

  .button {
    flex: 0 0 100px;
    height: 40px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    background-color: @color-brand;
  }
}
</style>
