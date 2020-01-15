<template>
  <div class="control-panel__button">
    <div class="header">按钮设置</div>
    <FormItemInput
      v-model="form.text"
      label="按钮文字"
      @blur="handleBlurText"
    />

    <div class="form-item flex-between">
      <div class="form-item__label">文字颜色</div>
      <el-color-picker v-model="form.style.color"></el-color-picker>
    </div>

    <div class="form-item flex-between">
      <div class="form-item__label">背景颜色</div>
      <el-color-picker v-model="form.style.backgroundColor"></el-color-picker>
    </div>

    <div class="form-item flex-between">
      <div class="form-item__label">文字尺寸</div>
      <el-input-number
        v-model="textFontSize"
        controls-position="right"
        :min="12"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
import { assign } from '@/common/tool';
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import FormItemInput from './form-item/Input.vue';

export default {
  name: 'ControlPanelButton',

  components: {
    FormItemInput,
  },

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: assign(
        {
          text: '',
          style: {
            fontSize: '14px',
            color: '#fff',
            backgroundColor: '#409eff',
          },
        },
        this.component
      ),
      textFontSize: 14,
    };
  },

  watch: {
    'form.style': function(v) {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { style: v });
    },

    textFontSize(v) {
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
