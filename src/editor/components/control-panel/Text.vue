<template>
  <div class="control-panel__input">
    <div class="header">输入框设置</div>

    <div class="form-item">
      <div class="form-item__label">文案</div>
      <el-input
        v-model="form.text"
        :rows="3"
        type="textarea"
        @blur="handleBlurText"
      />
    </div>

    <div class="form-item flex-between">
      <div class="form-item__label">文字尺寸</div>
      <el-input-number
        v-model="fontSize"
        controls-position="right"
        :min="12"
      ></el-input-number>
    </div>

    <div class="form-item flex-between">
      <div class="form-item__label">文字颜色</div>
      <el-color-picker v-model="form.style.color"></el-color-picker>
    </div>

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

    <div class="form-item flex-between">
      <div class="form-item__label">字间距</div>
      <el-input-number
        v-model="letterSpacing"
        controls-position="right"
        :min="0"
      ></el-input-number>
    </div>

    <div class="form-item flex-between">
      <div class="form-item__label">行间距</div>
      <el-input-number
        v-model="form.style.lineHeight"
        controls-position="right"
        :min="1"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
import { parseUnitNumber } from '@/common/tool';
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';

export default {
  name: 'ControlPanelText',

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
      color: #409eff;
    }
  }
}
</style>
