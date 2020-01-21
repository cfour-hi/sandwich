<template>
  <div class="form-item flex-between">
    <div class="form-item__label">{{ label }}</div>
    <el-input-number v-model="proxyValue" v-bind="proxyAttrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'FormItemInputNumber',

  props: {
    value: {
      type: Number,
      default: 0,
    },

    label: {
      type: String,
      default: '',
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
        'controls-position': 'right',
        ...this.$attrs,
      };
    },
  },
};
</script>
