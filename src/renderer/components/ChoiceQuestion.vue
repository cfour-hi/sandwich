<template>
  <div class="component__choice-question">
    <div class="title" :class="{ required: component.required }">
      {{ component.title }}
      <div class="desc">{{ component.desc }}</div>
    </div>
    <ul class="option-list">
      <li
        v-for="(option, index) in component.options"
        :key="index"
        class="option"
      >
        <input
          :id="`option-${_uid}-${index}`"
          :type="component.quesType"
          :checked="option.checked"
          :name="`question${_uid}`"
          class="option-input"
        />
        <label :for="`option-${_uid}-${index}`">{{ option.label }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ComponentChoiseQuestion',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/renderer/styles/form.less';

.component__choice-question {
  .form-item();

  .option {
    display: flex;
    font-size: 14px;
    line-height: 2;

    &-input {
      margin-top: 7px;
      margin-right: 8px;
      width: 1em;
      height: 1em;

      &[type='checkbox'] {
        margin-top: 6px;
      }
    }
  }
}
</style>
