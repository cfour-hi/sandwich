<template>
  <div class="component__choice-question">
    <div class="title" :class="{ required: component.props.required }">
      {{ component.props.title }}
    </div>
    <div class="desc">{{ component.props.desc }}</div>

    <ul class="option-list">
      <li v-for="(option, index) in options" :key="index" class="option">
        <input
          :id="`option-${_uid}-${index}`"
          :type="component.props.quesType"
          :name="`question${_uid}`"
          :checked="option.checked"
          class="option-input"
          @change="handleChange(index)"
        />
        <label :for="`option-${_uid}-${index}`" class="label">{{
          option.label
        }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import { QUESTION_TYPE } from '../constants';

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

  watch: {
    'component.props.options': {
      deep: true,
      handler(v) {
        this.options = JSON.parse(JSON.stringify(v));
      },
    },
  },

  methods: {
    getData() {
      return this.options
        .filter(option => option.checked)
        .map(option => option.label);
    },

    handleChange(index) {
      if (this.component.props.quesType === QUESTION_TYPE.单选题) {
        this.options.forEach((o, i) => {
          if (i !== index) o.checked = false;
        });
        this.options[index].checked = true;
      } else {
        this.options[index].checked = !this.options[index].checked;
      }
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

    .label {
      flex: auto;
    }
  }
}
</style>
