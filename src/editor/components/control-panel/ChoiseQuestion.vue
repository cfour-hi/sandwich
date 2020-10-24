<template>
  <div class="control-panel__choise-question">
    <div class="header">选择题设置</div>

    <div class="form-item flex-between">
      <div class="form-item__label">题目类型</div>
      <el-radio-group
        v-model="props.quesType"
        @change="handleChangeQuestionType"
      >
        <el-radio-button label="radio">单选</el-radio-button>
        <el-radio-button label="checkbox">多选</el-radio-button>
      </el-radio-group>
    </div>

    <FormItemInput v-model="props.title" label="题目" />

    <FormItemInput v-model="props.desc" label="描述" />

    <MultipleOption
      :ques-type="props.quesType"
      :options="props.options"
      :disabled-delete="disableDeleteOption"
      @input-label="handleInputOptionLabel"
      @changeDefault="handleChangeOptionDefault"
      @deleteOption="handleDeleteOption"
    ></MultipleOption>

    <el-button
      v-show="!disableAddOption"
      :disabled="disableAddOption"
      class="button__add-option"
      @click="handleAddOption"
    >
      添加选项
      <span class="tips">(最多6项)</span>
    </el-button>

    <FormItemSwitch v-model="props.required" label="是否必填" />
  </div>
</template>

<script>
import { QUESTION_TYPE } from '@/renderer/constants';
import { generateDefaultOption } from '@/renderer/component-factory/config/choise-question';
import MultipleOption from './multiple-option/index.vue';
import FormItemInput from './form-item/Input.vue';
import FormItemSwitch from './form-item/Switch.vue';
import mixinPropsStyle from './mixins/props-style';

const MAX_OPTION_LENGTH = 6;
const MIN_OPTION_LENGTH = 2;

export default {
  name: 'ControlPanelChoiseQuestion',

  components: {
    FormItemInput,
    MultipleOption,
    FormItemSwitch,
  },

  mixins: [mixinPropsStyle],

  computed: {
    disableAddOption() {
      return this.props.options.length >= MAX_OPTION_LENGTH;
    },

    disableDeleteOption() {
      return this.props.options.length <= MIN_OPTION_LENGTH;
    },
  },

  methods: {
    handleChangeQuestionType() {
      this.props.options.forEach(o => (o.checked = false));
    },

    handleInputOptionLabel(index, v) {
      this.props.options[index].label = v;
    },

    handleChangeOptionDefault(index) {
      if (this.props.quesType === QUESTION_TYPE.单选题) {
        // 单选题只能有一个默认选项
        this.props.options.forEach((o, i) => {
          if (i !== index) o.checked = false;
        });
      }
      this.props.options[index].checked = !this.props.options[index].checked;
    },

    handleAddOption() {
      if (this.disableAddOption) return;
      this.props.options.push(generateDefaultOption());
    },

    handleDeleteOption(index) {
      if (this.disableDeleteOption) return;
      this.props.options.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.button__add-option {
  width: 100%;

  .tips {
    color: #999;
  }
}
</style>
