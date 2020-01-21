<template>
  <div class="control-panel__input">
    <div class="header">输入框设置</div>

    <div class="form-item">
      <div class="form-item__label">文案</div>
      <el-input v-model="form.text" :rows="3" type="textarea" @blur="handleBlurText" />
    </div>

    <FormItemInputNumber v-model="fontSize" label="文字尺寸" :min="12" />

    <FormItemColorPicker v-model="form.style.color" label="文字颜色" />

    <div class="form-item">
      <div class="form-item__label">文字样式</div>
      <div class="style-wrap">
        <svg-icon
          v-for="icon in textStyleIcons"
          :key="icon.filename"
          :filename="icon.filename"
          :class="{ active: form.style[icon.key] === icon.activeVal }"
          @click.native="handleClickTextStyle(icon)"
        ></svg-icon>
      </div>
    </div>

    <div class="form-item">
      <div class="form-item__label">对齐方式</div>
      <div class="style-wrap">
        <svg-icon
          v-for="icon in textAlignIcons"
          :key="icon.filename"
          :filename="icon.filename"
          :class="{ active: form.style[icon.key] === icon.activeVal }"
          @click.native="handleClickTextStyle(icon)"
        ></svg-icon>
      </div>
    </div>

    <FormItemInputNumber v-model="letterSpacing" label="字间距" :min="0" />

    <FormItemInputNumber v-model="form.style.lineHeight" label="行间距" :min="1" />
  </div>
</template>

<script>
import { parseUnitNumber } from '@/common/tool';
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import FormItemInputNumber from './form-item/InputNumber.vue';
import FormItemColorPicker from './form-item/ColorPicker.vue';

export default {
  name: 'ControlPanelText',

  components: {
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
    this.textStyleIcons = [
      {
        filename: 'bold',
        key: 'fontWeight',
        activeVal: 'bold',
        defaultVal: 'normal',
      },
      {
        filename: 'italic',
        key: 'fontStyle',
        activeVal: 'italic',
        defaultVal: 'normal',
      },
      {
        filename: 'underline',
        key: 'textDecoration',
        activeVal: 'underline',
        defaultVal: 'none',
      },
      {
        filename: 'strikethrough',
        key: 'textDecoration',
        activeVal: 'line-through',
        defaultVal: 'none',
      },
    ];
    this.textAlignIcons = [
      {
        filename: 'align-left',
        key: 'textAlign',
        activeVal: 'left',
        defaultVal: 'left',
      },
      {
        filename: 'align-center',
        key: 'textAlign',
        activeVal: 'center',
        defaultVal: 'center',
      },
      {
        filename: 'align-right',
        key: 'textAlign',
        activeVal: 'right',
        defaultVal: 'right',
      },
    ];

    const form = JSON.parse(JSON.stringify(this.component));
    const fontSize = parseUnitNumber(form.style.fontSize);
    const letterSpacing = parseUnitNumber(form.style.letterSpacing);

    return {
      form,
      fontSize,
      letterSpacing,
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

    letterSpacing(v) {
      this.form.style.letterSpacing = `${v}px`;
    },
  },

  methods: {
    handleBlurText() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { text: this.form.text });
    },

    handleClickTextStyle({ key, activeVal, defaultVal }) {
      const val = this.form.style[key];
      this.form.style[key] = val === activeVal ? defaultVal : activeVal;
    },
  },
};
</script>

<style lang="less" scoped>
.style-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  border: 1px solid #ddd;
  font-size: 20px;
  border-radius: 4px;
  color: #999;
  background-color: #fff;

  .svg-icon {
    cursor: pointer;

    &.active {
      color: @color-brand;
    }
  }
}
</style>
