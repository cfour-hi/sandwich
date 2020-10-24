<template>
  <div class="control-panel__input">
    <div class="header">输入框设置</div>

    <div class="form-item flex-between">
      <div class="form-item__label">题目类型</div>
      <el-radio-group v-model="props.rows">
        <el-radio-button :label="1">单行</el-radio-button>
        <el-radio-button :label="3">多行</el-radio-button>
      </el-radio-group>
    </div>

    <FormItemInput v-model="props.title" label="题目" />

    <FormItemInput v-model="props.desc" label="描述" />

    <FormItemSwitch v-model="props.required" label="是否必填" />
  </div>
</template>

<script>
import FormItemInput from './form-item/Input.vue';
import FormItemSwitch from './form-item/Switch.vue';
import mixinPropsStyle from './mixins/props-style';

export default {
  name: 'ControlPanelTextarea',

  components: {
    FormItemInput,
    FormItemSwitch,
  },

  mixins: [mixinPropsStyle],
};
</script>
