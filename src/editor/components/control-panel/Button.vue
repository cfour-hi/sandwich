<template>
  <div class="control-panel__button">
    <div class="header">按钮设置</div>

    <FormItemInput v-model="form.text" label="按钮文字" @blur="handleBlurText" />

    <FormItemColorPicker v-model="form.style.color" label="文字颜色" />

    <FormItemColorPicker v-model="form.style.backgroundColor" label="背景颜色" />

    <FormItemInputNumber v-model="fontSize" label="文字尺寸" :min="12" />
  </div>
</template>

<script>
import { parseUnitNumber } from '@/common/tool';
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import FormItemInput from './form-item/Input.vue';
import FormItemInputNumber from './form-item/InputNumber.vue';
import FormItemColorPicker from './form-item/ColorPicker.vue';

export default {
  name: 'ControlPanelButton',

  components: {
    FormItemInput,
    FormItemInputNumber,
    FormItemColorPicker,
  },

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    const form = JSON.parse(JSON.stringify(this.component));
    const fontSize = parseUnitNumber(form.style.fontSize);
    return {
      form,
      fontSize,
    };
  },

  watch: {
    'form.style': {
      deep: true,
      handler: function(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { style: v });
      },
    },

    fontSize(v) {
      this.form.style.fontSize = `${v}px`;
    },
  },

  methods: {
    handleBlurText() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { text: this.form.text });
    },
  },
};
</script>
