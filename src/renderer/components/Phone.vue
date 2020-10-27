<template>
  <div class="component__phone">
    <div class="title" :class="{ required: component.props.required }">
      {{ component.props.title }}
    </div>
    <div class="desc">{{ component.props.desc }}</div>

    <input
      v-model="value"
      type="tel"
      :placeholder="component.props.placeholder"
      class="input input__phone"
    />

    <div class="code-wrap">
      <input
        ref="inputCode"
        v-model="code"
        type="tel"
        class="input input__code"
        placeholder="请输入短信验证码"
      />

      <button
        :style="component.buttonStyle"
        :disabled="disableSendCode"
        class="button"
        @click="handleClickSendCode"
      >
        <span v-if="disableSendCode">{{ codeCountdown }}秒</span>
        <span v-else>发送验证码</span>
      </button>
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
    this.timer = null;
    return {
      value: '',
      code: '',
      codeCountdown: 0,
    };
  },

  computed: {
    disableSendCode() {
      return this.codeCountdown > 0;
    },
  },

  methods: {
    getData() {
      return { value: this.value, code: this.code };
    },

    handleClickSendCode() {
      if (this.codeCountdown > 0) return;

      this.$refs.inputCode.focus();

      this.codeCountdown = 60;
      this.timer = setInterval(() => {
        this.codeCountdown -= 1;
        if (this.codeCountdown === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
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
    font-size: 14px;
    cursor: pointer;
    outline: none;
    background-color: @color-brand;

    &:disabled {
      // filter: grayscale(100%);
      background-color: #f8f8f8 !important;
      color: #999 !important;
      cursor: not-allowed;
    }
  }
}
</style>
