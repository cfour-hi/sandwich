import { QUESTION_TYPE } from '@/renderer/constants';

export const generateDefaultOption = () => ({ label: '选项', checked: false });

export default () => ({
  props: {
    quesType: QUESTION_TYPE.单选题,
    title: '选择题题目',
    desc: '',
    options: [generateDefaultOption(), generateDefaultOption()],
    required: true,
  },
});
