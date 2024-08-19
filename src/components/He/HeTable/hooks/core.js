import * as Enums from '../../extends/enums.js'
// 解析函数，接收API返回的数据，返回带有转换后类型的数组
export function parseData(columns, data) {
  const enumColumns= columns.filter(item => item.options)
  const enumMaps = {}
  enumColumns.forEach(item => {
    enumMaps[item.field] = Enums[item.options] || []
  })
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