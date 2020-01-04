import { COMPONENT_TYPE, QUESTION_TYPE } from '@/renderer/constants';

export const generateDefaultOption = () => ({ label: '选项', checked: false });

export default (attrs = {}) => ({
  type: COMPONENT_TYPE.choiseQuestion,
  quesType: QUESTION_TYPE.radio,
  title: '选择题题目',
  desc: '',
  options: [generateDefaultOption(), generateDefaultOption()],
  required: true,
  ...attrs,
});
