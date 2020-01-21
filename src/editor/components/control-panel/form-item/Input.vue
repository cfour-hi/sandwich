<template>
  <div class="form-item">
    <div class="form-item__label">{{ label }}</div>
    <el-input v-model="proxyValue" class="form-item__input" v-bind="proxyAttrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'FormItemInput',

  props: {
    value: {
      type: String,
      default: '',
    },

    label: {
      type: String,
      required: true,
    },
  },

  computed: {
    proxyValue: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },

    proxyAttrs() {
      return {
        placeholder: '请输入',
        ...this.$attrs,
      };
    },
  },
};
</script>
