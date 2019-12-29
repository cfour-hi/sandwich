// 生成随机码
export const genRandomCode = () =>
  `${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2)}`;

/**
 * 获取上传图片的宽高值
 * 图片的宽高分为原始宽高和 DOM 元素宽高
 * @param {File} file 图片文件
 * @param {Object} options
 *  @param {String} width 元素 DOM 宽度值
 *  未设置 width 值的情况下，图片原始宽高与 DOM 元素宽高一致
 * @return {Object}
 */
export const getUploadImageWH = async (file, { width } = {}) => {
  const img = document.createElement('img');
  if (width) img.style.width = width;
  const url = window.URL.createObjectURL(file);

  await new Promise(resolve => {
    img.onload = resolve;
    /**
     * 为了获取图片元素宽高
     * 需要插入图片 DOM 元素
     * 并且不能影响页面原本内容
     */
    img.style.position = 'absolute';
    img.style.visibility = 'hidden';
    document.body.prepend(img);
    img.src = url;
  });

  const rect = img.getBoundingClientRect();
  img.remove();

  return {
    url,
    width: rect.width,
    height: rect.height,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
  };
};
