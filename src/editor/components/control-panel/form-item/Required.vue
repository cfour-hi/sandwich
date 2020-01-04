<template>
  <div class="form-item flex-between">
    <div class="form-item__label">是否必填</div>
    <el-switch v-model="$_required_value" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'FormItemRequired',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    $_required_value: {
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
