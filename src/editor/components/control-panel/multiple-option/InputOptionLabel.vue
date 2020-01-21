<template>
  <el-input
    v-model="proxyValue"
    class="input__option-label"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'InputOptionLabel',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // 使用代理值是因为上层可能不更新绑定值
      proxyValue: this.value,
    };
  },
};
</script>
