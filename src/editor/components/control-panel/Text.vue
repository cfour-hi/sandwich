<template>
  <div class="control-panel__input">
    <div class="header">输入框设置</div>

    <div class="form-item">
      <div class="form-item__label">文案</div>
      <el-input v-model="props.text" :rows="3" type="textarea" />
    </div>

    <FormItemInputNumber v-model="style.fontSize" label="文字尺寸" :min="12" />

    <FormItemColorPicker v-model="style.color" label="文字颜色" />

    <div class="form-item">
      <div class="form-item__label">文字样式</div>
      <div class="style-wrap">
        <svg-icon
          v-for="icon in textStyleIcons"
          :key="icon.filename"
          :filename="icon.filename"
          :class="{ active: style[icon.key] === icon.activeVal }"
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
          :class="{ active: style[icon.key] === icon.activeVal }"
          @click.native="handleClickTextStyle(icon)"
        ></svg-icon>
      </div>
    </div>

    <FormItemInputNumber
      v-model="style.letterSpacing"
      label="字间距"
      :min="0"
    />

    <FormItemInputNumber v-model="style.lineHeight" label="行间距" :min="1" />
  </div>
</template>

<script>
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

    const props = JSON.parse(JSON.stringify(this.component.props));
    const style = JSON.parse(JSON.stringify(this.component.style));

    return {
      props,
      style,
    };
  },

  watch: {
    props: {
      deep: true,
      handler: function(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { props: v });
      },
    },

    style: {
      deep: true,
      handler: function(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { style: v });
      },
    },
  },

  methods: {
    handleClickTextStyle({ key, activeVal, defaultVal }) {
      const val = this.style[key];
      this.style[key] = val === activeVal ? defaultVal : activeVal;
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
