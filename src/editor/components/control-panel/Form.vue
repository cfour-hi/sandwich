<template>
  <div class="control-panel__form">
    <div class="header">表单设置</div>

    <Sort
      :list="formItemCompnents"
      :disable-delete="disableDeletes"
      @move="handleMoveFormItem"
      @delete="handleDeleteFormItem"
    >
      <template #item="{ item }">
        <span @click="handleClickFormItem(item)">{{ item.id }}</span>
      </template>
    </Sort>

    <div class="header">按钮设置</div>

    <FormItemInput v-model="buttonProps.text" label="按钮文字" />

    <FormItemColorPicker v-model="buttonStyle.color" label="文字颜色" />

    <FormItemColorPicker
      v-model="buttonStyle.backgroundColor"
      label="背景颜色"
    />

    <FormItemInputNumber
      v-model="buttonStyle.fontSize"
      label="文字尺寸"
      :min="12"
    />
  </div>
</template>

<script>
import {
  SET_ACTIVE_COMPONENT_ID,
  MOVE_COMPONENT,
  UPDATE_ACTIVE_COMPONENT,
} from '@/editor/store/mutation-types';
import Sort from './form-item/Sort.vue';
import { COMPONENT_TYPE } from '@/renderer/constants';
import FormItemInput from './form-item/Input.vue';
import mixinPropsStyle from './mixins/props-style';
import FormItemColorPicker from './form-item/ColorPicker.vue';
import FormItemInputNumber from './form-item/InputNumber.vue';

export default {
  name: 'ControlPanelForm',

  components: {
    Sort,
    FormItemInput,
    FormItemColorPicker,
    FormItemInputNumber,
  },

  mixins: [mixinPropsStyle],

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      buttonProps: JSON.parse(JSON.stringify(this.component.buttonProps)),
      buttonStyle: JSON.parse(JSON.stringify(this.component.buttonStyle)),
    };
  },

  computed: {
    components() {
      return this.$store.state.page.components;
    },

    formItemCompnents() {
      return this.component.children.map(id => this.components[id]);
    },

    disableDeletes() {
      return this.formItemCompnents
        .filter(c => c.type === COMPONENT_TYPE.表单按钮)
        .map(c => c.id);
    },
  },

  watch: {
    buttonProps: {
      deep: true,
      handler(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { buttonProps: v });
      },
    },
    buttonStyle: {
      deep: true,
      handler(v) {
        this.$store.commit(UPDATE_ACTIVE_COMPONENT, { buttonStyle: v });
      },
    },
  },

  methods: {
    handleClickFormItem(component) {
      this.$store.commit(SET_ACTIVE_COMPONENT_ID, component.id);
    },

    handleMoveFormItem(index, dir) {
      this.$store.commit(MOVE_COMPONENT, {
        id: this.formItemCompnents[index].id,
        dir,
      });
    },

    handleDeleteFormItem(index) {
      this.$store.dispatch('deleteComponent', this.formItemCompnents[index].id);
    },
  },
};
</script>
