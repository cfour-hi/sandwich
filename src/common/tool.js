export const noop = () => {};

/**
 * 包装 hasOwnProperty
 * @param {Object} obj
 * @param {String} key
 */
export const hasOP = (obj, key) => hasOwnProperty.call(obj, key);

/**
 * 获取值的原始类型
 * @param {Any} v
 */
export const toRawType = v => toString.call(v).slice(8, -1);

// 生成随机码
export const genRandomCode = () =>
  `${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2)}`;

/**
 * 对象的非扩展赋值
 * 被赋值对象 to 的任意属性，只要赋值对象 from 也有，则从 from 对象赋值给 to 对象
 * 反之，如果 to 对象没有的属性，则 from 对象的属性不会被添加
 * @param {Object} to 被赋值对象
 * @param {Object} from 赋值对象
 */
export const assign = (to, from) => {
  Object.keys(to).forEach(key => {
    if (hasOP(from, key)) {
      to[key] = from[key];
    }
  });
  return to;
};

/**
 * 本地获取图片原始宽高
 * @param {String|Blob} url
 */
export const getImageNaturalWH = async url => {
  let img = document.createElement('img');
  await new Promise(resolve => {
    img.onload = resolve;
    img.src = url;
  });
  const result = {
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
  };
  img = null;
  return result;
};

/**
 * 本地获取图片在指定宽度情况下的等比高度
 * @param {String|Blob} url
 * @param {Number} width
 */
export const getImageHeightOfSpecifialWidth = async (url, width) => {
  let img = document.createElement('img');
  img.style.width = `${width}px`;
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
  img = null;
  return rect.height;
};

/**
 * 将图片转换为 base64 格式
 * @param {String|Blob} url
 * @param {Number} width
 * @param {Number} height
 */
export const convertPicture2Base64 = async (url, width, height) => {
  let img = document.createElement('img');
  await new Promise(resolve => {
    img.onload = resolve;
    img.src = url;
  });

  let canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  context.drawImage(img, 0, 0, width, height);
  const base64 = canvas.toDataURL('image/webp', 0.5);
  img = null;
  canvas = null;
  return base64;
};

/**
 * 解析单位值中的数值
 * @param {String} unit
 */
export const parseUnitNumber = unit => {
  if (toRawType(unit) !== 'String') return 0;
  const n = Number(unit.replace(/px/, ''));
  return isNaN(n) ? 0 : n;
};

export const n2px = n => {
  if (toRawType(n) === 'Number') {
    return `${n}px`;
  }
  return n;
};

export const px2n = px => {
  if (toRawType(px) === 'String') {
    return parseInt(px);
  }
  return px;
};
