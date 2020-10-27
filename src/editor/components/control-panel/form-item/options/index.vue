<template>
  <ul>
    <li
      v-for="(option, index) of options"
      :key="optionsKey[index]"
      class="multiple-option__item"
    >
      <input
        :type="quesType"
        :checked="option.checked"
        class="option-input"
        @click="handleClickInput(index)"
      />

      <InputOptionLabel
        :value="option.label"
        @input="$emit('input-label', index, $event)"
        @blur="$emit('blur-label', index, $event.target.value)"
      />

      <svg-icon filename="delete" @click.native="handleClickDelete(index)" />

      <slot :option="option" :index="index" />
    </li>
  </ul>
</template>

<script>
import { QUESTION_TYPE } from '@/renderer/constants';
import InputOptionLabel from './InputOptionLabel.vue';
import { genRandomCode } from '@/common/tool';

export default {
  name: 'MultipleOption',

  components: {
    InputOptionLabel,
  },

  props: {
    quesType: {
      type: String,
      default: QUESTION_TYPE.单选题,
      validator: v => Object.values(QUESTION_TYPE).includes(v),
    },

    options: {
      type: Array,
      required: true,
    },

    disabledDelete: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      /**
       * 由于选项没有合适的值作为 key
       * 所以由内部维护选项 key
       */
      optionsKey: [],
    };
  },

  watch: {
    /**
     * 不要将 deep 设置为 true
     * 不然选项的任何字段发生改变都会触发 handler
     */
    options: {
      immediate: true,
      handler(val) {
        /**
         * diff 只可能 >= 0
         * 在删除选项的时候 diff === 0
         */
        const diff = val.length - this.optionsKey.length;
        if (diff === 0) return;

        /**
         * 目前仅两种情况 diff > 0
         * 1. immediate
         * 2. 增加选项
         */
        for (let i = 0; i < diff; i += 1) {
          this.optionsKey.push(genRandomCode());
        }
      },
    },
  },

  methods: {
    handleClickInput(index) {
      this.$emit('changeDefault', index);
    },

    handleClickDelete(index) {
      this.optionsKey.splice(index, 1);
      this.$emit('deleteOption', index);
    },
  },
};
</script>

<style lang="less" scoped>
.multiple-option__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .option-input {
    cursor: pointer;
  }

  .input__option-label {
    margin: 0 8px;
  }
}

.svg-delete {
  font-size: 24px;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #f56c6c;
  }
}
</style>
