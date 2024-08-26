
import { isFunction, isObject, isString } from 'element-ui/src/utils/types'
import ElementMaps from '../extends/elementMaps.js'
import * as Enums from '../../extends/enums.js'

const inputMaps = ['el-input', 'el-input-number']

function getRule(item) {
  const { rule, isRequired, type, label } = item
  if (typeof isRequired === 'boolean') {
    const isInput = inputMaps.includes(type)
    return {
      required: true,
      message: `请${ isInput ? '输入' : '选择' }${ label }`,
      trigger: isInput ? 'blur' : 'change'
    }
  } else if (isRequired) {
    return rule
  } else {
    return null
  }
}

// 计算表单项
export function computeFormItem(vm, config, form) {
  const item = { ...config }
  // 计算组件真实对应名称并传入一些默认配置
  const res = ElementMaps[item.type || 'input'] || item.type
  item.type = res.component ? res.component : res
  item.props = Object.assign({}, res.props, item.props)
  
  if (isString(item.options)) {
    const options = Enums[item.options]
    item.options =  options ? options : [] 
  }

  if (item.defaultValue === void 0) {
    item.defaultValue = isFunction(res.defaultValue) ? res.defaultValue(form) : res.defaultValue
  } else if (form[item.field] === null || form[item.field] === void 0) {
    // form[item.field] = item.defaultValue
    vm.$set(form, item.field, item.defaultValue)
  }

  // 处理联动
  item._isShow = isFunction(item.isShow) ? !!item.isShow(form) : typeof item.isShow === 'boolean' ? item.isShow : true

  // 处理校验
  item._rule = getRule(item)

  // 处理禁用
  if (item.disabled) {
    item.props.disabled = isFunction(item.disabled) ? !!item.disabled(form) : typeof item.disabled === 'boolean' ? item.disabled : false
  }

  // 设置内容宽度
  const contentWidth = item.contentWidth
  if (contentWidth) {
    const width = contentWidth.indexOf('px') !== -1 ? contentWidth : `${contentWidth}px`
    item.props.style = { width }
  }

  // 防止表单提交时存在多余的 field
  if (item._isShow === false && item.isIgnore === true) {
    delete form[item.field]
  }

  // 数据错误提示
  if (
    item.options !== void 0 && !Array.isArray(item.options) &&
    item.options !== void 0 && !isObject(item.options)
  ) {
    console.error('计算表单项数据类型错误 > computeFormItem > item.options > []||{}', item.options)
    item.options = []
  }

  return item
}