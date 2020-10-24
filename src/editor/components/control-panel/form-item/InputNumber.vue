<template>
  <div class="form-item flex-between">
    <div class="form-item__label">{{ label }}</div>
    <el-input-number
      v-model="proxyValue"
      v-bind="proxyAttrs"
      v-on="proxyListeners"
    />
  </div>
</template>

<script>
import { px2n, n2px, toRawType, noop } from '@/common/tool';

export default {
  name: 'FormItemInputNumber',

  props: {
    value: {
      type: [String, Number],
      required: true,
    },

    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    valueType() {
      return toRawType(this.value);
    },

    proxyValue: {
      get() {
        return px2n(this.value);
      },
      set(v) {
        this.$emit('input', this.valueType === 'String' ? n2px(v) : v);
      },
    },

    proxyAttrs() {
      return {
        'controls-position': 'right',
        ...this.$attrs,
      };
    },

    proxyListeners: {
      get() {
        return {
          ...this.$listeners,
          input: noop,
        };
      },
    },
  },
};
</script>
