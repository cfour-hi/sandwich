<template>
  <div class="control-panel__phone">
    <div class="header">手机设置</div>

    <FormItemInput v-model="props.title" label="标题" />

    <FormItemInput v-model="props.desc" label="描述" />

    <FormItemSwitch v-model="props.required" label="是否必填" />

    <div class="header">按钮设置</div>

    <FormItemColorPicker v-model="buttonStyle.color" label="文字颜色" />

    <FormItemColorPicker
      v-model="buttonStyle.backgroundColor"
      label="背景颜色"
    />
  </div>
</template>

<script>
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import mixinPropsStyle from './mixins/props-style';
import FormItemInput from './form-item/Input.vue';
import FormItemSwitch from './form-item/Switch.vue';
import FormItemColorPicker from './form-item/ColorPicker.vue';

export default {
  name: 'ControlPanelPhone',

  components: {
    FormItemInput,
    FormItemSwitch,
    FormItemColorPicker,
  },

  mixins: [mixinPropsStyle],

  data() {
    return {
      buttonStyle: JSON.parse(JSON.stringify(this.component.buttonStyle)),
    };
  },

  watch: {
    buttonStyle: {
      deep: true,
      handler(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { buttonStyle: v });
      },
    },
  },
};
</script>
