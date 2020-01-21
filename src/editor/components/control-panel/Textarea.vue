<template>
  <div class="control-panel__input">
    <div class="header">输入框设置</div>

    <div class="form-item flex-between">
      <div class="form-item__label">题目类型</div>
      <el-radio-group v-model="form.rows" @change="handleChangeAttrType">
        <el-radio-button :label="1">单行</el-radio-button>
        <el-radio-button :label="3">多行</el-radio-button>
      </el-radio-group>
    </div>

    <FormItemInput v-model="form.title" label="题目" @blur="handleBlurTitle" />

    <FormItemInput v-model="form.desc" label="描述" @blur="handleBlurDesc" />

    <FormItemSwitch v-model="form.required" label="是否必填" @change="handleChangeRequired" />
  </div>
</template>

<script>
import { assign } from '@/common/tool';
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import FormItemInput from './form-item/Input.vue';
import FormItemSwitch from './form-item/Switch.vue';

export default {
  name: 'ControlPanelTextarea',

  components: {
    FormItemInput,
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
          rows: 1,
          title: '',
          desc: '',
          required: false,
        },
        this.component
      ),
    };
  },

  methods: {
    handleChangeAttrType(v) {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { rows: v });
    },

    handleBlurTitle() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { title: this.form.title });
    },

    handleBlurDesc() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, { desc: this.form.desc });
    },

    handleChangeRequired() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        required: this.form.required,
      });
    },
  },
};
</script>
