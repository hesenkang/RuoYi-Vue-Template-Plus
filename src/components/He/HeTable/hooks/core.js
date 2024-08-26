import { isFunction, isObject, isString } from 'element-ui/src/utils/types'
import * as Enums from '../../extends/enums.js'
import getAsyncEnums from '../../extends/async-enums.js'
// 解析函数，接收API返回的数据，返回带有转换后类型的数组
export async function parseData(columns, data) {
  const enumColumns= columns.filter(item => item.options)
  const enumMaps = {}
  for (const item of enumColumns) {
    if (isString(item.options) && !item.isAsync) {
      enumMaps[item.field] = Enums[item.options] || []
    } else if (isString(item.options) && item.isAsync) {
      try {
        enumMaps[item.field] = await getAsyncEnums(item.options)
      } catch (error) {
        enumMaps[item.field] = []
        console.error(error)
      }
    } else if (Array.isArray(item.options)) {
      enumMaps[item.field] = item.options
    } else {
      enumMaps[item.field] = []
      console.warn(`${item.field}列的options配置有误, 为：${item.options}`)
    }
  }
  return data.map(item => {
    const newItem = { ...item }
    Object.keys(newItem).forEach(key => {
      if (enumMaps[key]) {
        const item = enumMaps[key].find(item => item.value == newItem[key])
        newItem[key] = item ? item.label : newItem[key]
      }
    });
    return newItem;
  });
}