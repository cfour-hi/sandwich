<template>
  <div class="component__choice-question">
    <div class="title" :class="{ required: component.props.required }">
      {{ component.props.title }}
      <div class="desc">{{ component.props.desc }}</div>
    </div>
    <ul class="option-list">
      <li v-for="(option, index) in options" :key="index" class="option">
        <input
          :id="`option-${_uid}-${index}`"
          :checked="option.checked"
          :type="component.props.quesType"
          :name="`question${_uid}`"
          class="option-input"
          @change="option.checked = !option.checked"
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

  data() {
    return {
      options: JSON.parse(JSON.stringify(this.component.props.options)),
    };
  },

  methods: {
    getData() {
      return this.options
        .filter(option => option.checked)
        .map(option => option.label);
    },
  },
};
</script>

<style lang="less" scoped>
.component__choice-question {
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
