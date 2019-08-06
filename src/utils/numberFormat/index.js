// 格式化千分位
export const thousandFormat = (value, fixed) => {
  fixed = fixed !== undefined ? fixed : 2
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    return;
  }
  // 将数字进行千分位格式化
  function toThousands(num) {
    num = (num || 0).toString();
    var parts = num.split('.');
    var bigZeroPart = parts[0];
    var result = '';
    while (bigZeroPart.length > 3) {
      result = ',' + bigZeroPart.slice(-3) + result;
      bigZeroPart = bigZeroPart.slice(0, bigZeroPart.length - 3);
    }
    if (bigZeroPart) {
      result = bigZeroPart + result;
    }
    if (parts.length > 1) {
      result += '.' + parts[1].toString();
    }
    return result;
  }

  value = parseFloat(value).toFixed(fixed);
  value = toThousands(value);
  return value;
}

// 格式化百分比
export const percentFormat = (value,fixed) => {
  fixed = fixed !== undefined ? fixed : 2
  var reg = /\d+(\.\d+)?/;
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    return value;
  }
  if (!reg.test(value)) {
    return value
  }

  function toPercent(num) {
    var result = '';
    result = (parseFloat(num * 100).toFixed(fixed)) + '%';
    return result
  }

  value = toPercent(value);
  return value;
}

// 去除em标签
export const removeMarkers = (str) => {
  let value = str
  value = value.replace(/(<\/em>)|(<em>)/g, '')

  return value
}
