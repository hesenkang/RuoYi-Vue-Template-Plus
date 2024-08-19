// 保存不同key的定时器id
const DELAYS_KEYS = {};

/**
 * 是否是函数类型
 * @param {*} fnc 函数 / 或可能是一个函数
 * @returns {Boolean} 是 / 否
 */
function isFunction(fnc) {
    return typeof fnc === 'function';
}

/**
 * 是否是对象类型
 * @param {*} obj 对象
 * @returns {Boolean} 是 / 否
 */
function isObject(obj) {
  return obj !== null 
  && typeof obj === 'object' 
  && Object.prototype.toString.call(obj) === '[object Object]' 
  && !Array.isArray(obj)
}
/**
 * 从字符串中提取中文
 * @param {String} str 原字符串
 * @returns {String} 提取的中文字符
 */
function strExtractChain(str) {
    if (!str) {
        throw 'HE.strExtractChain：传入的值为空！'
    }
    const array = str.match(/[\u4e00-\u9fa5]/g);
    if (Array.isArray(array)) {
        return array.join('');
    }
    return '';
}

/**
 * 计算时间加减
 * @param {*} time 时间
 * @param {*} min 加减的分钟
 * @param {*} sec 加减的秒数
 * @returns {String} YYYY-MM-DD HH:MM:SS
 */
function countTime(time, min, sec) {
    let t = new Date(time.replace(/-/g, '/'))
    t.setMinutes(t.getMinutes() + min, t.getSeconds() + sec, 0)
    let d = new Date(t)
    let y = d.getFullYear()
    let m = d.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let da = d.getDate()
    da = da < 10 ? '0' + da : da

    let h = d.getHours()
    h = h < 10 ? '0' + h : h

    let minute = d.getMinutes()
    minute = minute < 10 ? '0' + minute : minute

    let second = d.getSeconds();
    second = second < 10 ? '0' + second : second

    let date = y + '-' + m + '-' + da + ' ' + h + ':' + minute + ':' + second
    return date
}

/**
 * 获取两个时间段的所有日期
 * start  格式为 YYYY:MM:DD
 * end    格式为 YYYY:MM:DD
 * set    间隔 / 基数
 */
function timeRange(start, end, sept) {
    // var start="20170201", end="20170205";  //这两个bai日期的获du取自己搞定
    var list = []
    var y1 = parseInt(start.substr(0, 4))
    var m1 = parseInt(start.substr(5, 2)) - 1
    var d1 = parseInt(start.substr(8, 2))

    var h1 = parseInt(start.substr(11, 2))
    var min1 = parseInt(start.substr(14, 22))
    var s1 = parseInt(start.substr(17, 2))

    var y2 = parseInt(end.substr(0, 4))
    var m2 = parseInt(end.substr(5, 2)) - 1
    var d2 = parseInt(end.substr(8, 2))

    var h2 = parseInt(end.substr(11, 2))
    var min2 = parseInt(end.substr(14, 2))
    var s2 = parseInt(end.substr(17, 2))

    do {
        var d = new Date(y1, m1, d1, h1, min1, s1+=sept)
        var y = d.getFullYear()
        var m = d.getMonth() + 1
        var D = d.getDate()
        var h = d.getHours()
        h = h < 10 ? '0' + h : h
        var minute = d.getMinutes()
        minute = minute < 10 ? '0' + minute : minute
        var second = d.getSeconds()
        second = second < 10 ? '0' + second : second
        var s = y + '-' + (m < 10 ? '0' : '') + m + '-' + (D < 10 ? '0' : '') + D + ' ' + h + ':' + minute + ':' + second//这个s就是要打印zhi的日期字串
        list.push(s)
    } while (d < new Date(y2, m2, d2, h2, min2, s2))

    return list
}

/**
 * 获取两个时间段中间的天数
 * @param {Number} start 格式为 YYYY:MM:DD
 * @param {Number} end 格式为 YYYY:MM:DD
 * @returns {Number} 小于0天默认返回0
 */
function getTimeRangeDaySum(start, end) {
    var startTime = new Date(start);
    var endTime = new Date(end);
    var result = endTime.getTime() - startTime.getTime(); 
    var result = Math.floor(result / (24 * 3600 * 1000));
    return result ? result : 1;
}

/**
 * 获取两个时间段中
 * @param {Number} start 格式为 YYYY:MM:DD
 * @param {Number} end 格式为 YYYY:MM:DD
 * @returns {[]object}
 */
function getMonthsAndDays(startDate, endDate) {
  let months = [];
  let currentDate = new Date(startDate);
  let currentEndDate = new Date(endDate);
 
  function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
 
  while (currentDate <= currentEndDate) {
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth(); // 从0开始的月份
    let days = daysInMonth(year, month + 1); // 加1因为getMonth()从0开始
 
    months.push({
      year: year,
      month: month + 1, // 转换回正常的月份表示
      days: days
    });
 
    // 将当前月份增加一个月
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
 
  return months;
}

/**
 * 日期格式化
 * @param {String} time 
 * @param {String} pattern 
 * @returns {String} 日期
 */
function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
      return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else if (typeof time === 'string') {
        time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
}

/**
 * 节流函数
 * @param {String} key 相同key的处理函数视为同一类操作，在指定时间完成时只处理最会一个
 * @param {Function} handler 处理函数
 * @param {Number} milliseconds 延时时间
 */
function throttle(key, handler, milliseconds) {
    if (!key || !['string', 'number'].some(item => typeof key == item)) {
        throw '缺少key';
    }
    if (!isFunction(handler)) {
        return;
    }
    clearTimeout(DELAYS_KEYS[key]);
    let resoveHandler;
    let promise = new Promise(resoved => {
        resoveHandler = resoved;
    });
    DELAYS_KEYS[key] = setTimeout(() => {
        handler();
        resoveHandler();
    }, milliseconds || 300);
    return promise;
}

function getFilterTreeKeys(ref) {
  let keys = []
  const node = ref.root.childNodes[0]
  function getKey(checked, key, children) {
      if (checked) {
          keys.push(key)
      }
      if (!checked && children.length) {
          for (let item of children) {
              getKey(item.checked, item.key, item.childNodes)
          }
      }
      return keys
  }
  return getKey(node.checked, node.key, node.childNodes)
}

function collectSelectedKeysFromTree(ref) {
  // 增加异常处理以确保ref和ref.root是有效的
  if (!ref || !ref.root) {
      throw new Error('Invalid reference');
  }

  const node = ref.root.childNodes[0];
  // 检查根节点的子节点数量
  if (!node || node.childNodes.length === 0) {
      return [];
  }

  const keys = [];
  // 将getKey函数重构为外部函数，并以参数形式传递所需变量
  const getKey = (node, checkedKeys) => {
    if (node.checked) {
        checkedKeys.push(node.key);
    }
    if (!node.checked && node.childNodes.length) {
        // 使用迭代代替递归
        const stack = [...node.childNodes];
        while (stack.length) {
            const currentNode = stack.pop();
            getKey(currentNode, checkedKeys);
            stack.push(...currentNode.childNodes);
        }
    }
  };

  getKey(node, keys);
  return keys;
}

/**
 * 将扁平化的数据集转换为树状结构。
 *
 * @param {Array} data - 包含节点数据的数组。
 * @param {String} [idKey='id'] - 数据中表示唯一标识的字段名称，默认为'id'。
 * @param {String} [parentIdKey='parentId'] - 数据中表示父节点标识的字段名称，默认为'parentId'。
 * @param {String} [childrenKey='children'] - 在输出的树结构中表示子节点的键名，默认为'children'。
 * @returns {Array} - 树状结构数组，每个元素代表一个树节点，包含其子节点（如果有的话）。
 */
function convertToTree(data, idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children') {
  // 使用Map存储数据，以便通过id快速查找节点
  const map = new Map();
  // 用于存储根节点的数组
  const tree = [];

  // 遍历数据，将每个节点及其子节点列表初始化为Map中的条目
  // 将数据转换为Map以快速查找
  data.forEach(item => {
    map.set(item[idKey], {...item, [childrenKey]: []});
  });

  // 再次遍历数据，根据parentId将节点连接成树结构
  // 遍历数据，构建树形结构
  data.forEach(item => {
    const parent = map.get(item[parentIdKey]);
    if (parent) {
      parent[childrenKey].push(map.get(item[idKey]));
    } else {
      tree.push(map.get(item[idKey]));
    }
  });

  // 返回构建好的树结构数组
  return tree;
}

/**
 * 深克隆一个对象或数组
 * @param {Object|Array} obj - 需要克隆的对象或数组
 * @param {WeakMap} hash - 用于存储已经克隆过的对象的映射，避免循环引用
 * @returns {Object|Array} - 克隆后的对象或数组
 */
function deepClone(obj, hash = new WeakMap()) {
  // 如果 obj 为 null 或者 不是对象或数组，则直接返回
  if (obj == null || typeof obj !== 'object') return obj;

  // 如果 obj 是日期或者正则表达式对象，则直接返回一个新的实例
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 如果已经克隆过，则直接返回克隆过的对象
  if (hash.has(obj)) return hash.get(obj);

  // 创建一个新的空对象或者空数组
  const cloneObj = new obj.constructor();

  // 将新创建的对象存储到 hash 中
  hash.set(obj, cloneObj);

  // 遍历对象的所有属性
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) { // 确保只复制自身的属性
          cloneObj[key] = deepClone(obj[key], hash); // 递归调用
      }
  }

  return cloneObj;
}

const HE = {
    deepClone,
    convertToTree,
    collectSelectedKeysFromTree,
    getFilterTreeKeys,
    throttle,
    parseTime,
    getMonthsAndDays,
    getTimeRangeDaySum,
    timeRange,
    countTime,
    strExtractChain,
    isObject,
    isFunction
}

export default HE;