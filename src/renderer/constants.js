export const SANDWICH_JSON_DATA = 'SANDWICH_JSON_DATA';

export const FORM_COMPONENT_TYPE = {
  手机: 'phone',
  选择题: 'choise-question',
  输入框: 'textarea',
};

// key 唯一标识 value 配置文件名
export const COMPONENT_TYPE = {
  图片: 'picture',
  文本: 'text',
  轮播图: 'swiper',
  表单: 'form',
  ...FORM_COMPONENT_TYPE,
};

export const QUESTION_TYPE = {
  单选题: 'radio',
  多选题: 'checkbox',
};
