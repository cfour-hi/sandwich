<template>
  <div class="form-item">
    <div class="form-item__label">{{ label }}</div>
    <el-input
      v-model="$_input_value"
      class="form-item__input"
      v-bind="$attrs"
      placeholder="请输入"
      v-on="$listeners"
    />
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
    $_input_value: {
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
