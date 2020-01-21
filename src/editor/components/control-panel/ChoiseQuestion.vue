<template>
  <div class="control-panel__choise-question">
    <div class="header">选择题设置</div>

    <div class="form-item flex-between">
      <div class="form-item__label">题目类型</div>
      <el-radio-group v-model="form.quesType" @change="handleChangeQuestionType">
        <el-radio-button label="radio">单选</el-radio-button>
        <el-radio-button label="checkbox">多选</el-radio-button>
      </el-radio-group>
    </div>

    <FormItemInput v-model="form.title" label="题目" @blur="handleBlurTitle" />

    <FormItemInput v-model="form.desc" label="描述" @blur="handleBlurDesc" />

    <MultipleOption
      :ques-type="form.quesType"
      :options="form.options"
      :disabled-delete="disableDeleteOption"
      @inputLabel="handleInputOptionLabel"
      @blurLabel="handleBlurOptionLabel"
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

    <FormItemSwitch v-model="form.required" label="是否必填" @change="handleChangeRequired" />
  </div>
</template>

<script>
import { assign } from '@/common/tool';
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import { QUESTION_TYPE } from '@/renderer/constants';
import { generateDefaultOption } from '@/renderer/component-factory/config/choise-question';
import MultipleOption from './multiple-option/index.vue';
import FormItemInput from './form-item/Input.vue';
import FormItemSwitch from './form-item/Switch.vue';

const MAX_OPTION_LENGTH = 6;
const MIN_OPTION_LENGTH = 2;

export default {
  name: 'ControlPanelChoiseQuestion',

  components: {
    FormItemInput,
    MultipleOption,
    FormItemSwitch,
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
          quesType: QUESTION_TYPE.radio,
          title: '',
          desc: '',
          options: [],
          required: true,
        },
        JSON.parse(JSON.stringify(this.component))
      ),
    };
  },

  computed: {
    disableAddOption() {
      return this.form.options.length >= MAX_OPTION_LENGTH;
    },

    disableDeleteOption() {
      return this.form.options.length <= MIN_OPTION_LENGTH;
    },
  },

  methods: {
    handleChangeQuestionType(v) {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { quesType: v });
      this.form.options.forEach(o => (o.checked = false));
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        options: this.form.options,
      });
    },

    handleBlurTitle() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { title: this.form.title });
    },

    handleBlurDesc() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { desc: this.form.desc });
    },

    handleInputOptionLabel(index, v) {
      this.form.options[index].label = v;
    },

    handleBlurOptionLabel() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        options: this.form.options,
      });
    },

    handleChangeOptionDefault(index) {
      if (this.form.quesType === QUESTION_TYPE.radio) {
        // 单选题只能有一个默认选项
        this.form.options.forEach((o, i) => {
          if (i !== index) o.checked = false;
        });
      }
      this.form.options[index].checked = !this.form.options[index].checked;
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        options: this.form.options,
      });
    },

    handleAddOption() {
      if (this.disabledAddOption) return;
      this.form.options.push(generateDefaultOption());
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        options: this.form.options,
      });
    },

    handleDeleteOption(index) {
      if (this.disableDeleteOption) return;
      this.form.options.splice(index, 1);
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        options: this.form.options,
      });
    },

    handleChangeRequired() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        required: this.form.required,
      });
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
