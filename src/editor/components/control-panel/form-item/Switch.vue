<template>
  <div class="form-item flex-between">
    <div class="form-item__label">{{ label }}</div>
    <el-switch v-model="proxyValue" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'FormItemSwitch',

  props: {
    value: {
      type: Boolean,
      default: false,
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
  },
};
</script>
